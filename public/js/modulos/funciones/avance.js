import Swal from "sweetalert2";

export const actualizarAvance = () => {
  //Select existing tasks
  const tareas = document.querySelectorAll("li.tarea");
  if (tareas.length) {
    //Select completed tasks
    const tareasCompletas = document.querySelectorAll("i.completo");

    //Calculate progress
    const avance = Math.round((tareasCompletas.length / tareas.length) * 100);
    //show the progress
    const porcentaje = document.querySelector("#porcentaje");
    porcentaje.style.width = avance + "%";
    if (avance === 100) {
      Swal.fire(
        "Compleste el proyecto",
        "Felicidades hasta terminado tus tareas",
        "success"
      );
    }
  }
};
