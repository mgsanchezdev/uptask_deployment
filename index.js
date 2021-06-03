const express = require("express");
const routes = require("./routes");
const path = require("path");
//Create an express app
const app = express();

//Where to load static files
app.use(express.static("public"));

//Enable pug
app.set("view engine", "pug");

//Add to view folder
app.set("views", path.join(__dirname, "./views"));

app.use("/", routes());

app.listen(3000);
