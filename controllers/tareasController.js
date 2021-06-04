const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.agregarTarea = async (req, res,next) => {
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
const resultado = await Tareas.create({tarea,estado,proyectoId})

if(!resultado){
    return nnext()
}

//Redirect
res.redirect(`/proyectos/${req.params.url}`);

};
