const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const helpers = require("./helpers");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");
// const expressValidator = require("express-validator");

//Create the connection to the database
const db = require("./config/db");

//import the model
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");

db.sync()
  .then(() => {
    console.log("Conetado al servidor");
  })
  .catch((error) => console.log(error));
//Create an express app
const app = express();

//Where to load static files
app.use(express.static("public"));

//Enable pug
app.set("view engine", "pug");
//Pass vardump to the application

//Enable bodyparset for reading form data
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(expressValidator());

//Add to view folder
app.set("views", path.join(__dirname, "./views"));

//Add flash
app.use(flash());

app.use(cookieParser());
//Sessiones nos permite navegar entre diferentes paginas sin volvernos a autenticar
app.use(
  session({
    secret: "supersecreto",
    resave: false,
    saveUninitialized: false, //Si queres que alguin se autentique en el sistema matenga la seccion viva aunque no este haciendo nada
  })
);

app.use(passport.initialize()); //Arranca una instancia de passport

app.use(passport.session()); //Importante que este despues de session

app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  res.locals.usuario =
    {
      ...req.user,
    } || null;
  next();
});

app.use("/", routes());

app.listen(3000);

