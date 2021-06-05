const express = require("express");
const router = express.Router();

//import express validator
// const { body } = require("express-validator/check");

const { body } = require("express-validator");

// Import the controller
const proyectosController = require("../controllers/proyectosController");
const Proyectos = require("../models/Proyectos");
const tareasController = require("../controllers/tareasController");
const usuariosController = require("../controllers/usuariosController");

module.exports = function () {
  //Route to home
  router.get("/", proyectosController.proyectosHome);
  router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
  router.post(
    "/nuevo-proyecto",
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
  );

  //list proyect
  router.get("/proyectos/:url", proyectosController.proyectoPorUrl);

  //Updating the project
  router.get("/proyecto/editar/:id", proyectosController.fomularioEditar);

  router.post(
    "/nuevo-proyecto/:id",
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
  );

  //Delete project
  router.delete("/proyectos/:url", proyectosController.eliminarProyecto);

  //task
  router.post("/proyectos/:url", tareasController.agregarTarea);

  //update task  
router.patch('/tareas/:id',tareasController.cambiarEstadoTarea)

  //delete task  
  router.delete('/tareas/:id',tareasController.eliminarTarea)
  return router;
};

//Create new account
router.get('/crear-cuenta',usuariosController.formCrearCuenta)

router.post('/crear-cuenta',usuariosController.crearCuenta)