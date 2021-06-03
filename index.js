const express = require("express");
const routes = require("./routes");

//Create an express app
const app = express();

app.use("/", routes());

app.listen(3000);
