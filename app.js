//Priero debo capturar el evento submit, Con el escucha "addEventListener"
document.getElementById("formTareas").addEventListener("submit", guardarTarea);
function guardarTarea(e) {
  e.preventDefault(); //cancela el comportamiento por defecto de refrescar la pág
  let title = document.getElementById("title").value;
  let descrip = document.getElementById("description").value;
  const tarea = {
    title, // es lo mismo que poner title:title
    descrip,
  };
  if (localStorage.getItem("tareas") === null) {
    // si en la variable tarea del localStorage no hay nada...creo
    let tasks = [];
    tasks.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tasks)); //JSON es un método del navegador que permite convertir Obj a String
  } else {
    // si ya hay tareas, entonces los obtengo, actualizo y vuelvo a guardarTarea
    let tasks = JSON.parse(localStorage.getItem("tareas")); // obtengo las tareas que estan guardadas en el localStorage, las paso a Objeto otra vez
    tasks.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tasks)); //paso mi array a string y lo vuelvo a guardar en el localStorage
  }
  obtenerTareas();
  document.getElementById("formTareas").reset();
}

function obtenerTareas() {
  let tareas = JSON.parse(localStorage.getItem("tareas"));
  let tareasEnHtml = document.getElementById("tareas");
  tareasEnHtml.innerHTML = ""; //lo limpiamos en caso de que haya datos
  console.log(tareas);
  tareas.forEach((e) => {
    console.log(e);
    tareasEnHtml.innerHTML += `<div class = "card mb-4">
    <div class = "card-body">
    <p>${e.title} - ${e.descrip}</p>
    <a class = "btn btn-danger" onclick="eliminarTareas('${e.title}')">Eliminar</a>
    </div>
    </div>`;
  });
}

function eliminarTareas(title) {
  let tareas = JSON.parse(localStorage.getItem("tareas")); //obtuve
  tareas.map((e) => {
    if (e.title == title) {
      console.log(e.descrip);
      tareas.splice(e.index, 1); //elimino el que me mandan por param
    }
    console.log(e);
  });
  localStorage.setItem("tareas", JSON.stringify(tareas)); //vuelvo  guardar el el local
  obtenerTareas();
}
