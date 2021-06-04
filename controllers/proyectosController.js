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
    proyectos,
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
      proyectos,
    });
  } else {
    //No errors, you have to insert in the database

    await Proyectos.create({ nombre });
    res.redirect("/");
  }
};

exports.proyectoPorUrl = async (req, res, next) => {
  const proyectosPromise = Proyectos.findAll();

  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);
  if (!proyecto) return next();
  //render at sight
  res.render("tareas", {
    nombrePagina: "Tareas del Proyecto",
    proyecto,
    proyectos,
  });
};

exports.fomularioEditar = async (req, res) => {
  const proyectosPromise = Proyectos.findAll();

  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);
  res.render("nuevoProyecto", {
    nombrePagina: "Editar Proyecto",
    proyectos,
    proyecto,
  });
};

exports.actualizarProyecto = async (req, res) => {
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
      proyectos,
    });
  } else {
    //No errors, you have to insert in the database

    await Proyectos.update(
      { nombre: nombre },
      { where: { id: req.params.id } }
    );
    res.redirect("/");
  }
};

exports.eliminarProyecto = async (req, res, next) => {
  // console.log("query",req.query)
  // console.log("params",req.params)
  const { urlProyecto } = req.query;
  const resultado = await Proyectos.destroy({
    where: {
      url: urlProyecto,
    },
  });
  res.send("Proyecto Eliminado Correntamente ");
};
