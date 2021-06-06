const Usuarios = require("../models/Usuarios");
const enviarEmail = require("../handler/email");

exports.formCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear cuenta en UpTask",
  });
};

exports.formIniciarSesion = (req, res) => {
  const { error } = res.locals.mensajes;
  res.render("iniciarSesion", {
    nombrePagina: "Iniciar Sesión en UpTask",
    error,
  });
};

exports.crearCuenta = async (req, res) => {
  //Read the data
  const { email, password } = req.body;

  try {
    //Create user
    await Usuarios.create({
      email,
      password,
    });

    //Crear un url de confirmar
    //url de reset
    const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

    //Crear el obejto de usuario
    const usuario = {
      email,
    };
    //Enviar email

    //Enviar el correo con el token
    await enviarEmail.enviar({
      usuario,
      subject: "Confirma tu cuenta Uptask",
      resetUrl,
      archivo: "confirmar-cuenta",
    });

    //Redigir al usuario
    req.flash("correcto", "Enviamos un correo, confirma tu cuenta");
    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash(
      "error",
      error.errors.map((error) => error.message)
    );
    res.render("crearCuenta", {
      mensajes: req.flash(),
      nombrePagina: "Crear cuenta en UpTask",
      email,
      password,
    });
  }
};

exports.formRestablecerPassword = (req, res) => {
  res.render("reestablecer", {
    nombrePagina: "Reestablecer tu contraseña",
  });
};
