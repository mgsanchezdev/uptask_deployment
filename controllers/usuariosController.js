const Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear cuenta en UpTask",
  });
};

exports.crearCuenta = (req, res) => {
  //Read the data
  const { email, password } = req.body;
  //Create user
  Usuarios.create({
    email,
    password,
  }).then(() => {
    res.redirect("/inicar-sesion");
  });
};
