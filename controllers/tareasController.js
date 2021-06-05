const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.agregarTarea = async (req, res, next) => {
  //we obtain the current project
  const proyecto = await Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });
  //read input value
  const { tarea } = req.body;

  //zero incompleteness and project id
  const estado = 0;
  const proyectoId = proyecto.id;

  //Insert in the  DB
  const resultado = await Tareas.create({ tarea, estado, proyectoId });

  if (!resultado) {
    return nnext();
  }

  //Redirect
  res.redirect(`/proyectos/${req.params.url}`);
};

exports.cambiarEstadoTarea = async (req, res, next) => {
  const { id } = req.params;
  const tarea = await Tareas.findOne({
    where: {
      id: id,
    },
  });
  //cange state
  let estado = 0;
  if (tarea.estado === estado) {
    estado = 1;
  }
  tarea.estado = estado;
  const resultado = await tarea.save();

  if (!resultado) return next();
  res.status(200).send("Actualziado");
};

exports.eliminarTarea = async (req, res) => {

  const { id } = req.params;

  // Eliminar la tarea
  const resultado = await Tareas.destroy({where : { id  }});

  if(!resultado) return next();

  res.status(200).send('Tarea Eliminada Correctamente');
}