const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//Refer to the model where we are going to authenticate
const Usuario = require("../models/Usuarios");

//Local Strgery - Login con credencias propias ( usarui y password)

passport.use(
  new LocalStrategy(
    //Por default passport espera un usario y password
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const usuario = await Usuario.find({
          where: { email: email },
        });
        //El usuario existe pero password incorrecto
        if (!usuario.verificarPassword(passport)) {
          return done(null, false, {
            message: "Password incorrecto",
          });
        }
        //El email exite y password correcto
        return done(null, usuario);
      } catch (error) {
        //Ese usuario no existe
        return done(null, false, {
          message: "Esa cuenta no existe",
        });
      }
    }
  )
);

//Serialziar el usuario
passport.serializeUser((usuario, callback) => {
  callback(null, usuario);
});

//Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
  callback(null, usuario);
});

//Exportar
module.exports = passport;
