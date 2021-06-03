const Proyectos = require("../models/Proyectos");

exports.proyectosHome = (req, res) => {
  res.render("index", {
    nombrePagina: "Proyectos",
  });
};

exports.formularioProyecto = (req, res) => {
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
  });
};

exports.nuevoProyecto = (req, res) => {
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
    Proyectos.create({ nombre })
      .then(() => console.log("insertado correctamente"))
      .catch((error) => console.log(error));
  }
};
