import axios from "axios";
import Swal from "sweetalert2";

const tareas = document.querySelector(".listado-pendientes");

if (tareas) {
  tareas.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;
      //Request a /tareas/id
      const url = `${location.origin}/tareas/${idTarea}`;
      axios.patch(url, { idTarea }).then(function (respuesta) {
        if (respuesta.status === 200) {
          icono.classList.toggle("completo");
        }
      });
    }

    if (e.target.classList.contains("fa-trash")) {
      const tareaHTML = e.target.parentElement.parentElement; //Esto nos trae el html de la tarea
      const idTarea = tareaHTML.dataset.tarea;
      Swal.fire({
        title: "Deseas borrar este Tarea?",
        text: "Una tarea eliminada no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "No,Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          //send the delete by means of axios
          const url = `${location.origin}/tareas/${idTarea}`;
          axios.delete(url, { params: { idTarea } }).then(function (respuesta) {
            if (respuesta.status === 200) {
              //Delete node
              tareaHTML.parentElement.removeChild(tareaHTML); //te vas un nivel arriba en el html
              //optional
              Swal.fire(
                  'Tarea eliminada',
                  respuesta.data,
                  'success'
              )
            }
          });
        }
      });
    }
  });
}

export default tareas;
