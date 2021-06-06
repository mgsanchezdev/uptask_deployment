const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const Sequelize = require("sequelize");
const Op = Sequelize.Op; //Se utiliza para poner condiciones de mayor o iguale nelfindone
const crypto = require("crypto");
const bcrypt = require("bcrypt-nodejs");
const enviarEmail = require("../handler/email");

// autenticar el usuario
exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

//function to know whether the user is logged in or not
exports.usuarioAutenticado = (req, res, next) => {
  //If the user is authenticated, go ahead.
  if (req.isAuthenticated()) {
    return next();
  }

  //if not authenticated redirect to the form
  return res.redirect("/iniciar-sesion");
};

//Funcion para cerrar sesion
exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/iniciar-sesion"); //Al cerar sesion nos lleva a login
  });
};

//Genera un token si el usuario es valido

exports.enviarToken = async (req, res) => {
  //verificar que el usuario existe
  const { email } = req.body;
  const usuario = await Usuarios.findOne({
    where: {
      email,
    },
  });

  //Si no existe el usuario
  if (!usuario) {
    req.flash("error", "No existe esa cuenta");
    res.redirect("/reestablecer");
  }

  //usuario existe

  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expiracion = Date.now() + 3600000; /* durante un hora dura el token*/

  //Guardar en la base de datos
  await usuario.save();

  //url de reset
  const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;

  //Enviar el correo con el token
  await enviarEmail.enviar({
    usuario,
    subject: "Password Reset",
    resetUrl,
    archivo: "reestablecer-passsword",
  });

  //Terminar la ejecucion
  req.flash("correcto", " Se envio un mensaje a tu correo");
  res.redirect("iniciar-sesion");
};

exports.validarToken = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
    },
  });

  //if the user is not found
  if (!usuario) {
    req.flash("error", "No válido ");
    res.redirect("/reestablecer");
  }

  //form to generate the password
  res.render("resetpassword", {
    nombrePagina: "Reestablecer contraseña",
  });
};

//Change the password to a new one
exports.actualizarPassword = async (req, res) => {
  //Verify valid token but also expiration date
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiracion: {
        [Op.gte]: Date.now(),
      },
    },
  });

  console.log("actualziar password usuario controller", usuario);
  //If the user exists
  if (!usuario) {
    req.flash("error", "No valido");
    require.redirect("/reestablecer");
  }

  //hashear new passwod
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expiracion = null;

  //save new pssword
  await usuario.save();
  req.flash("correcto", "Tu password se ha modificado correctamente");
  res.redirect("/iniciar-sesion");
};
