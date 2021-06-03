const express = require("express");
const router = express.Router();

//import express validator
const { body } = require("express-validator/check");

// Import the controller
const proyectosController = require("../controllers/proyectosController");

module.exports = function () {
  //Route to home
  router.get("/", proyectosController.proyectosHome);
  router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
  router.post(
    "/nuevo-proyecto",
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
  );
  return router;
};
