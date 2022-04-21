//agrego un escucha de tipo submit al form
document.getElementById("formTareas").addEventListener("submit", guardarTarea);

function guardarTarea(e) {
  e.preventDefault(); //cancela el comportamiento por defecto de refrescar la pág
  let title = document.getElementById("title").value; //linea 28
  let descrip = document.getElementById("description").value; //linea 31
  const tarea = {
    title, // es lo mismo que poner title:title
    descrip,
  };
  if (localStorage.getItem("tareas")) {
    // si esta en el localStorage, entonces los obtengo, actualizo y vuelvo a guardarTarea
    let tasks = JSON.parse(localStorage.getItem("tareas"));
    tasks.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tasks));
  } else {
    // si en el localStorage no esta guardado aún...creo en array y lo guardo
    let tasks = [];
    tasks.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tasks));
  }
  mostrarTareas();
  document.getElementById("formTareas").reset();
}

function mostrarTareas() {
  let tareas = JSON.parse(localStorage.getItem("tareas"));
  let tareasEnHtml = document.getElementById("tareas"); // linea 40
  tareasEnHtml.innerHTML = ""; //lo limpiamos en caso de que haya datos
  tareas.forEach((e) => {
    tareasEnHtml.innerHTML += `<div class = "card mb-4">
                                <div class = "card-body">
                                  <p>${e.title} - ${e.descrip}</p>
                                  <a class = "btn btn-danger" onclick="eliminarTareas('${e.title}')">Eliminar</a>
                                </div>
                              </div>`;
  });
}

function eliminarTareas(title) {
  let tareas = JSON.parse(localStorage.getItem("tareas"));
  tareas.map((e) => {
    if (e.title == title) {
      tareas.splice(e.index, 1); //elimino el que me mandan por param
    }
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarTareas();
}
