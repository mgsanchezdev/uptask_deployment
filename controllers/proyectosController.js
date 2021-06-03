const Proyectos = require("../models/Proyectos");

exports.proyectosHome = async(req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("index", {
    nombrePagina: "Proyectos",
    proyectos
  });
};

exports.formularioProyecto = (req, res) => {
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
  });
};

exports.nuevoProyecto = async (req, res) => {
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
    });
  } else {
    //No errors, you have to insert in the database

    const proyecto = await Proyectos.create({ nombre });
    res.redirect("/");
  }
};
