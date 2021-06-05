const passport = require("passport");
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
