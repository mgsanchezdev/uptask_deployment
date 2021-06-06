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
const authController = require("../controllers/authController");

module.exports = function () {
  //Route to home
  router.get(
    "/",
    authController.usuarioAutenticado,
    proyectosController.proyectosHome
  );
  router.get(
    "/nuevo-proyecto",
    authController.usuarioAutenticado,
    proyectosController.formularioProyecto
  );
  router.post(
    "/nuevo-proyecto",
    authController.usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
  );

  //list proyect
  router.get(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    proyectosController.proyectoPorUrl
  );

  //Updating the project
  router.get(
    "/proyecto/editar/:id",
    authController.usuarioAutenticado,
    proyectosController.fomularioEditar
  );

  router.post(
    "/nuevo-proyecto/:id",
    authController.usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
  );

  //Delete project
  router.delete(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    proyectosController.eliminarProyecto
  );

  //task
  router.post(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    tareasController.agregarTarea
  );

  //update task
  router.patch(
    "/tareas/:id",
    authController.usuarioAutenticado,
    tareasController.cambiarEstadoTarea
  );

  //delete task
  router.delete(
    "/tareas/:id",
    authController.usuarioAutenticado,
    tareasController.eliminarTarea
  );

  //Create new account
  router.get("/crear-cuenta", usuariosController.formCrearCuenta);

  router.post("/crear-cuenta", usuariosController.crearCuenta);

  //log in
  router.get("/iniciar-sesion", usuariosController.formIniciarSesion);
  router.post("/iniciar-sesion", authController.autenticarUsuario);

  //logout
  router.get("/cerrar-sesion", authController.cerrarSesion);

  //reset password
  router.get("/reestablecer", usuariosController.formRestablecerPassword);
  router.post("/reestablecer", authController.enviarToken);

  router.get("/reestablecer/:token", authController.resetPassword);

  return router;
};
