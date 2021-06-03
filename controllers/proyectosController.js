const Proyectos = require("../models/Proyectos");

exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("index", {
    nombrePagina: "Proyectos",
    proyectos,
  });
};

exports.formularioProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
    proyectos
  });
};

exports.nuevoProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  //We are going to send to the console what the user types

  //validate that we have something in the field
  const { nombre } = req.body;
  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un Nombre al Proyecto" });
  }

  // si hay errores
  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos
    });
  } else {
    //No errors, you have to insert in the database

    const proyecto = await Proyectos.create({ nombre });
    res.redirect("/");
  }
};

exports.proyectoPorUrl = async (req, res, next) => {
  const proyectos = await Proyectos.findAll();

  const proyecto = await Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });
  if (!proyecto) return next();
  //render at sight
  res.render("tareas", {
    nombrePagina: "Tareas del Proyecto",
    proyecto,
    proyectos
  });
};
