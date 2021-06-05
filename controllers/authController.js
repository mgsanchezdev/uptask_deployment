const passport = require("passport");
// autenticar el usuario
exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: 'Ambos campos son obligatorios'
});
