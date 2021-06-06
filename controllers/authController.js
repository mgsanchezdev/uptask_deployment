const passport = require("passport");
const Usuarios = require("../models/Usuarios");

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
    res.render("reestablecer", {
      nombrePagina: "Restablecer tu contraseña",
      mensajes: req.flash(),
    });
  }
};
