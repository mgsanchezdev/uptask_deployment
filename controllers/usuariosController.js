const Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear cuenta en UpTask",
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
    res.redirect("/inicar-sesion");
  } catch (error) {
    req.flash(
      "error",
      error.errors.map((error) => error.message)
    );
    res.render("crearCuenta", {
      errores: req.flash(),
      nombrePagina: "Crear cuenta en UpTask",
    });
  }
};
