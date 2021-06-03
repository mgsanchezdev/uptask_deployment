const express = require("express");
const router = express.Router();

// Import the controller
const proyectosController = require("../controllers/proyectosController");

module.exports = function () {
  //Route to home
  router.get("/", proyectosController.proyectosHome);
  router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
  router.post("/nuevo-proyecto", proyectosController.nuevoProyecto);
  return router;
};
