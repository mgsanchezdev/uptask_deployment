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
    res.render("crearCuenta", {
      errores: error.errors,
      nombrePagina: "Crear cuenta en UpTask",
    });
  }
};
