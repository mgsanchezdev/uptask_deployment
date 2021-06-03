const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");

//Create an express app
const app = express();

//Where to load static files
app.use(express.static("public"));

//Enable pug
app.set("view engine", "pug");

//Add to view folder
app.set("views", path.join(__dirname, "./views"));

//Enable bodyparset for reading form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes());

app.listen(3000);
