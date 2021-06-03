const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const helpers = require("./helpers");

//Create the connection to the database
const db = require("./config/db");

//import the model
require("./models/Proyectos");

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

//Add to view folder
app.set("views", path.join(__dirname, "./views"));

//Pass vardump to the application
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  next();
});

//Enable bodyparset for reading form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes());

app.listen(3000);
