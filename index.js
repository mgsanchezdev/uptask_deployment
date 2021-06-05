const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const helpers = require("./helpers");
const flash = require("connect-flash");
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

//Enable bodyparset for reading form data
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(expressValidator());

//Where to load static files
app.use(express.static("public"));

//Enable pug
app.set("view engine", "pug");

//Add to view folder
app.set("views", path.join(__dirname, "./views"));

//Add flash
app.use(flash());

//Pass vardump to the application
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  next();
});

app.use("/", routes());

app.listen(3000);
