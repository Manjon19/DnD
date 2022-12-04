// https://www.dnd5eapi.co/api/ -->Api generica
const classesAPI = "https://www.dnd5eapi.co/api/classes";
const featuresAPI = "https://www.dnd5eapi.co/api/features";
const monstersAPI = "https://www.dnd5eapi.co/api/monsters";
const spellsAPI = "https://www.dnd5eapi.co/api/spells";


//Obtener elementos html
const selectClasses = document.getElementById("clases");
const selectFeatures = document.getElementById("caracteristicas");
const selectMonsters = document.getElementById("monsters");
const selectSpells = document.getElementById("spells");
const main = document.getElementsByTagName("main");
const seccion = document.createElement("section");
//Comprobar si existe una ficha o no y si es así mostrar por pantalla
if(localStorage.getItem("ficha")!=null) {
    mostrarFicha()
}
//Funcion que realiza el mostrado de la ficha en pantalla
function mostrarFicha() {
    let fichaLocal=JSON.parse(localStorage.getItem("ficha"));
    seccion.innerHTML=` <h2>Tu ficha:</h2><br>
                        <p><span style="font-weight:bold">Clase: </span>${fichaLocal.clase}</p><br>
                        <p><span style="font-weight:bold">Dado de golpe: </span>${fichaLocal.dadoGolpe}</p><br>
                        <p><span style="font-weight:bold">Habilidad: </span>${fichaLocal.skill}</p><br>
                        <p><span style="font-weight:bold">Competencia: </span>${fichaLocal.competencia}</p><br>
                        <ul style="font-weight:bold">Triadas de salvación:
                            <li>${fichaLocal.TS1}</li>
                            <li>${fichaLocal.TS2}</li>
                        </ul>
                        <br>
                        <p><span style="font-weight:bold">Equipo de inicio: </span>${fichaLocal.equipo}</p><br>
                        <button id="delFicha" onclick="borrarFicha()">Borrar ficha</button>
                        `
    main[0].append(seccion);
}
//funcion que hace el borrado de la ficha tanto en pantalla como en el storage
function borrarFicha() {
    localStorage.removeItem('ficha');
    alert("Has borrado tu ficha");
    seccion.innerHTML="";
}
//Llenar todos los selects con getters
getClasses();
getFeatures();
getMonsters();
getSpells();
//array que usare para introducir los datos de la llamada
let arrayFicha = [];

//Cambio en el select de clases
selectClasses.addEventListener("change", async (e) => {
  if (e.currentTarget.value != "clases") {
    await cambio(classesAPI, e.currentTarget.value, "clases");
    let btn = document.getElementById("addFicha");
    //Evento al boton de crear que llama a la funcion crearStorage
    btn.addEventListener("click",crearStorage);
  } else {
    if(localStorage.getItem("ficha")!=null) {
        mostrarFicha()
    }
  }
});

//Evento cambio en features
selectFeatures.addEventListener("change", (e) => {
  if (e.currentTarget.value != "caracteristicas") {
    cambio(featuresAPI, e.currentTarget.value, "caracteristicas");
  }
});

//Evento cambio en monsters
selectMonsters.addEventListener("change", (e) => {
  if (e.currentTarget.value != "monstruos") {
    cambio(monstersAPI, e.currentTarget.value, "monstruos");
  }
});

//Evento cambio en spells
selectSpells.addEventListener("change", (e) => {
  if (e.currentTarget.value != "conjuros") {
    cambio(spellsAPI, e.currentTarget.value, "conjuros");
  }
});

//llamada a la api generica
async function cambio(API, value, name) {
  await fetch(API + "/" + value)
    .then((response) => response.json())
    .then((data) => {
      arrayFicha = data;
      seccion.innerHTML = fichas(name, data);
      main[0].append(seccion);
    });
}

//Funciones get que hacen llamada a la API especifica y llamada al metodo fill
async function getClasses() {
    await fetch(classesAPI)
      .then((response) => response.json())
      .then((data) => fill(data, selectClasses));
  }
  async function getFeatures() {
    await fetch(featuresAPI)
      .then((response) => response.json())
      .then((data) => fill(data, selectFeatures));
  }
  async function getMonsters() {
    await fetch(monstersAPI)
      .then((response) => response.json())
      .then((data) => fill(data, selectMonsters));
  }
  async function getSpells() {
    await fetch(spellsAPI)
      .then((response) => response.json())
      .then((data) => fill(data, selectSpells));
  }
  //Función que rellena los selects con los datos de la llamada a la API
  function fill(data, select) {
    let selecciona = document.createElement("option");
    selecciona.value = select.name;
    selecciona.textContent = select.name.toUpperCase();
    select.appendChild(selecciona);
    for (let index = 0; index < data.count; index++) {
      let opcion = document.createElement("option");
      opcion.value = data.results[index].index;
      opcion.textContent = data.results[index].name;
      select.appendChild(opcion);
    }
  }
//Funcion que crea la ficha y la guarda en el localStorage
function crearStorage(){
    let fichaClase = {
        clase: arrayFicha.name ,
        dadoGolpe: arrayFicha.hit_die
     };
     let skills = document.getElementsByName("skill");
     skills.forEach((habilidad) => {
       if (habilidad.checked) {
         fichaClase.skill= habilidad.value ;
       }
     });
     let compes = document.getElementsByName("competencia");
     compes.forEach((compe) => {
       if (compe.checked) {
         fichaClase.competencia= compe.value ;
       }
     });
     fichaClase.TS1= arrayFicha.saving_throws[0].name;
     fichaClase.TS2= arrayFicha.saving_throws[1].name;
     let equipos = document.getElementsByName("equipo");
     equipos.forEach((equipo) => {
       if (equipo.checked) {
         fichaClase.equipo= equipo.value;
       }
     });

     localStorage.setItem("ficha", JSON.stringify(fichaClase));
     seccion.remove()
     mostrarFicha()
}

//funcion que muestra la informacion dependiendo del select cambiado
function fichas(name, data) {
  let html = "";
  switch (name) {
    //si el cambio es en el select de clases se podrá crear una ficha y se guardara en el storage.
    case "clases":
      html += ` <h3>Selecciona las opciones para poder crear tu personaje.</h3>
                <p><span style='font-weight:bold'>Clase: </span>${data.name} </p>
                    <p><span style='font-weight:bold'>Dado de golpe: </span>${data.hit_die}</p>
                     <p style="font-weight:bold">Elige tu favorita:</p><div>`;
      data.proficiency_choices[0].from.options.forEach((proficiency) => {
        html += `<input type="radio" id="${proficiency.item.name}" name="skill" value="${proficiency.item.name}">
               <label for="${proficiency.item.name}">${proficiency.item.name}</label><br>`;
      });
      html += "</div>";
      html += `<p style="font-weight:bold">Armas  y armaduras con competencia:</p>
            <div>`;
      data.proficiencies.forEach((competencia, index) => {
        if (index <= data.proficiencies.length - 3) {
          html += `<input type="radio" id="${competencia.name}" name="competencia" value="${competencia.name}">
                <label for="${competencia.name}">${competencia.name}</label><br>`;
        }
      });
      html += "</div><div>";
      html += "<p style='font-weight:bold'>Tiradas de salvación:</p> <ul>";
      data.saving_throws.forEach((saving) => {
        html += `<li>${saving.name}</li>`;
      });
      html += "</ul> </div>";
      html += "<p style='font-weight:bold'>Equipo de inicio:</p> <div>";
      data.starting_equipment.forEach((start) => {
        html += `<input type="radio" id="${start.equipment.name}" name="equipo" value="${start.equipment.name}">
               <label for="${start.equipment.name}">${start.equipment.name}</label><br>`;
      });
      html += "</div> <button id='addFicha'>Guardar ficha</button>";
      
      break;

    default:
      break;
  }
  return html;
}

