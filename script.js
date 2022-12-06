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
const seccion = document.getElementById("section");
const btnAside = document.getElementById("aside");
const aside = document.getElementById("buscador");
const radiosAside = document.getElementsByName("busca");
const btnBuscar = document.getElementById("btnBuscar");
const inputBuscar = document.getElementById("buscar");
const comentarios = document.getElementById("coment");
const btnComent = document.getElementById("btnComent");
const divPublis = document.getElementById("publicados");
let coments = [];

let contador = 0;
comentar();
function comentar() {
  if (
    localStorage.getItem("comentarios") != null &&
    JSON.parse(localStorage.getItem("comentarios")).length > 0
  ) {
    JSON.parse(localStorage.getItem("comentarios")).forEach(c=>{
      let divComent = document.createElement("div");

      let publish = document.createElement("span");
      publish.id = c.index;
      publish.innerHTML = c.comentario
      divComent.append(publish);
      let btnEliminar=document.createElement("button");
      btnEliminar.value=c.index;
      btnEliminar.name="eliminar";
      btnEliminar.innerText="X";
      divComent.append(btnEliminar);
      divPublis.append(divComent);
      contador++;
    })
    
  } else {
    divPublis.innerHTML = "";
  }
}
btnComent.addEventListener("click", () => {
  if (comentarios.value == "") {
    alert("No se puede publicar un mensaje vacío");
  } else {
    coments.push({index:contador,comentario:comentarios.value});
    localStorage.setItem("comentarios", JSON.stringify(coments));
    let divComent = document.createElement("div");
    let published = document.createElement("span");
    published.id = contador;
    published.innerText = comentarios.value;
    divComent.append(published);

    let publicarBtn = document.createElement("button");
    publicarBtn.value = contador;
    publicarBtn.innerHTML = "X";
    publicarBtn.name="eliminar"
    
    divComent.append(publicarBtn);
    divPublis.append(divComent);
    comentarios.value = "";
    contador++;
  }
});

document.addEventListener("click", (e) => {
  if (e.target.name == "eliminar") {
    deleteComent(e.target.value);
    e.target.remove();
  }
});

function deleteComent(contador) {
  
  let com = document.getElementById(contador);
  let arrayComents = [];
  JSON.parse(localStorage.getItem("comentarios")).forEach((c) => {
    if (c.index != contador) {
      console.log("hola2");
      arrayComents.push(c);
      console.log("hola3");
    }else{
      console.log("hola4")
    }
  });
  localStorage.setItem("comentarios", JSON.stringify(arrayComents));
  comentar()
}
//Mostrar el buscador
btnAside.addEventListener("click", () => {
  aside.classList.toggle("activa");
});
//buscar pulsando enter y clicando en el boton buscar
inputBuscar.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    let check = false;
    radiosAside.forEach(async (radio) => {
      if (radio.checked) {
        check = true;
        switch (radio.value) {
          case "clases":
            await cambio(classesAPI, inputBuscar.value, "clases");
            let btn = document.getElementById("addFicha");
            btn.addEventListener("click", crearStorage);
            break;
          case "caracteristicas":
            await cambio(featuresAPI, inputBuscar.value, "caracteristicas");
            break;
          case "monstruos":
            await cambio(monstersAPI, inputBuscar.value, "monstruos");
            break;
          case "conjuros":
            await cambio(spellsAPI, inputBuscar.value, "conjuros");
            break;
          default:
            break;
        }
      }
    });
    if (!check) {
      alert("No se ha encontrado la busqueda");
    } else {
      aside.classList.toggle("activa");
    }
  }
});
btnBuscar.addEventListener("click", () => {
  let check = false;
  radiosAside.forEach(async (radio) => {
    if (radio.checked) {
      check = true;
      switch (radio.value) {
        case "clases":
          await cambio(classesAPI, inputBuscar.value, "clases");
          let btn = document.getElementById("addFicha");
          btn.addEventListener("click", crearStorage);
          break;
        case "caracteristicas":
          await cambio(featuresAPI, inputBuscar.value, "caracteristicas");
          break;
        case "monstruos":
          await cambio(monstersAPI, inputBuscar.value, "monstruos");
          break;
        case "conjuros":
          await cambio(spellsAPI, inputBuscar.value, "conjuros");
          break;
        default:
          break;
      }
    }
  });
  if (!check) {
    alert("No se ha encontrado la busqueda");
  } else {
    aside.classList.toggle("activa");
  }
});
//Comprobar si existe una ficha o no y si es así mostrar por pantalla
if (localStorage.getItem("ficha") != null) {
  mostrarFicha();
}
//Funcion que realiza el mostrado de la ficha en pantalla
function mostrarFicha() {
  let fichaLocal = JSON.parse(localStorage.getItem("ficha"));
  seccion.innerHTML = ` <h2>Tu ficha:</h2><br>
                        <p><span style="font-weight:bold">Clase: ${fichaLocal.clase}</p><br>
                        <p><span style="font-weight:bold">Dado de golpe: ${fichaLocal.dadoGolpe}</p><br>
                        <p><span style="font-weight:bold">Habilidad: ${fichaLocal.skill}</p><br>
                        <p><span style="font-weight:bold">Competencia: ${fichaLocal.competencia}</p><br>
                        <ul style="font-weight:bold">Triadas de salvación:
                            <li>${fichaLocal.TS1}</li>
                            <li>${fichaLocal.TS2}</li>
                        </ul>
                        <br>
                        <p><span style="font-weight:bold">Equipo de inicio: ${fichaLocal.equipo}</p><br>
                        <button id="delFicha" onclick="borrarFicha()">Borrar ficha</button>
                        `;
}
//funcion que hace el borrado de la ficha tanto en pantalla como en el storage
function borrarFicha() {
  localStorage.removeItem("ficha");
  alert("Has borrado tu ficha");
  seccion.innerHTML = "";
}
//Llenar todos los selects con getters
getClasses();
getFeatures();
getMonsters();
getSpells();
//array para introducir los datos de la llamada
let arrayFicha = [];

//Cambio en el select de clases
selectClasses.addEventListener("change", async (e) => {
  if (e.currentTarget.value != "clases") {
    await cambio(classesAPI, e.currentTarget.value, "clases");
    let btn = document.getElementById("addFicha");
    //Evento al boton de crear que llama a la funcion crearStorage
    btn.addEventListener("click", crearStorage);
  } else {
    if (localStorage.getItem("ficha") != null) {
      mostrarFicha();
    } else {
      seccion.innerHTML = "";
    }
  }
});

//Evento cambio en features
selectFeatures.addEventListener("change", (e) => {
  if (e.currentTarget.value != "caracteristicas") {
    cambio(featuresAPI, e.currentTarget.value, "caracteristicas");
  } else {
    if (localStorage.getItem("ficha") != null) {
      mostrarFicha();
    } else {
      seccion.innerHTML = "";
    }
  }
});

//Evento cambio en monsters
selectMonsters.addEventListener("change", (e) => {
  if (e.currentTarget.value != "monstruos") {
    cambio(monstersAPI, e.currentTarget.value, "monstruos");
  } else {
    if (localStorage.getItem("ficha") != null) {
      mostrarFicha();
    } else {
      seccion.innerHTML = "";
    }
  }
});

//Evento cambio en spells
selectSpells.addEventListener("change", (e) => {
  if (e.currentTarget.value != "conjuros") {
    cambio(spellsAPI, e.currentTarget.value, "conjuros");
  } else {
    seccion.innerHTML = "";
  }
});

//llamada a la api generica
async function cambio(API, value, name) {
  try {
    await fetch(API + "/" + value)
      .then((response) => response.json())
      .then((data) => {
        arrayFicha = data;
        seccion.innerHTML = fichas(name, data);
      });
  } catch (error) {
    alert("No se ha encontrado lo que buscaba");
  }
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
function crearStorage() {
  let fichaClase = {
    clase: arrayFicha.name,
    dadoGolpe: arrayFicha.hit_die,
  };
  let skills = document.getElementsByName("skill");
  skills.forEach((habilidad) => {
    if (habilidad.checked) {
      fichaClase.skill = habilidad.value;
    }
  });
  let compes = document.getElementsByName("competencia");
  compes.forEach((compe) => {
    if (compe.checked) {
      fichaClase.competencia = compe.value;
    }
  });
  fichaClase.TS1 = arrayFicha.saving_throws[0].name;
  fichaClase.TS2 = arrayFicha.saving_throws[1].name;
  let equipos = document.getElementsByName("equipo");
  equipos.forEach((equipo) => {
    if (equipo.checked) {
      fichaClase.equipo = equipo.value;
    }
  });

  localStorage.setItem("ficha", JSON.stringify(fichaClase));
  mostrarFicha();
}

//funcion que muestra la informacion dependiendo del select cambiado
function fichas(name, data) {
  let html = "";
  switch (name) {
    //si el cambio es en el select de clases se podrá crear una ficha y se guardara en el storage.
    case "clases":
      html += ` <h3>Selecciona las opciones para poder crear tu personaje.</h3>
                <p><b>Clase:</b> ${data.name} </p>
                    <p><b>Dado de golpe:</b> ${data.hit_die}</p>
                     <p><b>Elige tu favorita:</b></p><div>`;
      data.proficiency_choices[0].from.options.forEach((proficiency) => {
        html += `<input type="radio" id="${proficiency.item.name}" name="skill" value="${proficiency.item.name}">
               <label for="${proficiency.item.name}">${proficiency.item.name}</label><br>`;
      });
      html += "</div>";
      html += `<p><b>Armas  y armaduras con competencia:</b></p>
            <div>`;
      data.proficiencies.forEach((competencia, index) => {
        if (index <= data.proficiencies.length - 3) {
          html += `<input type="radio" id="${competencia.name}" name="competencia" value="${competencia.name}">
                <label for="${competencia.name}">${competencia.name}</label><br>`;
        }
      });
      html += "</div><div>";
      html += "<p><b>Tiradas de salvación:</b></p> <ul>";
      data.saving_throws.forEach((saving) => {
        html += `<li>${saving.name}</li>`;
      });
      html += "</ul> </div>";
      html += "<p><b>Equipo de inicio:</b></p> <div>";
      data.starting_equipment.forEach((start) => {
        html += `<input type="radio" id="${start.equipment.name}" name="equipo" value="${start.equipment.name}">
               <label for="${start.equipment.name}">${start.equipment.name}</label><br>`;
      });
      html += "</div> <button id='addFicha'>Guardar ficha</button>";

      break;
    case "caracteristicas":
      html = `<h3>Características</h3><br>
            <p><b>Nombre:</b> ${data.name}</p><br>
            <p><b>Clase:</b> ${data.class.name}</p><br>
            <p><b>Nivel:</b> ${data.level}</p><br>
            <p><b>Requisitos:</b> ${data.prerequisites}</p><br>
            <span><b>Descripción: </b>${data.desc[0]}</span>
            `;
      break;
    case "monstruos":
      html = `<h3>Monstruos</h3><br>`;
      if (data.image != undefined) {
        html += `<img width="200px" heigth="200px" src="https://www.dnd5eapi.co${data.image}"><br>`;
      }

      html += `
        <p><b>Nombre:</b> ${data.name}</p><br>
        <p><b>Tamaño:</b> ${data.size}</p><br>
        <p><b>Tipo:</b> ${data.type}</p><br>
        <p><b>Alineamiento:</b> ${data.alignment}</p><br>
        <p><b>Armadura:</b> ${data.armor_class}</p><br>
        <p><b>Puntos de golpe:</b> ${data.hit_points}</p><br>
        <p><b>Dados de golpe:</b> ${data.hit_dice}</p><br>
        <p><b>Características</b></p><br>
        <p><b>Fuerza:</b> ${data.strength}</p><br>
        <p><b>Destreza:</b> ${data.dexterity}</p><br>
        <p><b>Constitución:</b> ${data.constitution}</p><br>
        <p><b>Inteligencia:</b> ${data.intelligence}</p><br>
        <p><b>Sabiduría:</b> ${data.wisdom}</p><br>
        <p><b>Carisma:</b> ${data.charisma}</p><br>`;
      if (
        data.damage_vulnerabilities != undefined &&
        data.damage_vulnerabilities != ""
      ) {
        html += `<p><b>Vulnerabilidades:</b> ${data.damage_vulnerabilities}</p><br>`;
      } else {
        html += `<p><b>Vulnerabilidades:</b> No existen</p><br>`;
      }
      if (data.resistances != undefined && data.resistances != "") {
        html += `<p><b>Resistencias:</b> ${data.resistances}</p><br>`;
      } else {
        html += `<p><b>Resistencias:</b> No existen</p><br>`;
      }
      if (data.immunities != undefined && data.resistances != "") {
        html += `<p><b>Inmunidades:</b> ${data.immunities}</p><br>`;
      } else {
        html += `<p><b>Inmunidades:</b> No existen</p><br>`;
      }

      html += `<p><b>Lenguajes:</b> ${data.languages}</p><br>
        <p><b>Nivel de desafío:</b> ${data.challenge_rating}</p><br>
        <p><b>Experiencia:</b> ${data.xp}</p><br>
        `;
      break;

    case "conjuros":
      html = `
          <h3>Conjuros</h3><br>
          <p><b>Nombre:</b> ${data.name}</p><br>
          <span><b>Descripción: </b>${data.desc[0]}</span><br>`;
      if (data.higher_level != undefined) {
        html += `
            <p><b>Nivel máximo:</b> ${data.higher_level}</p><br>`;
      } else {
        html += `<p><b>Nivel máximo:</b> Truco</p><br>`;
      }
      `
          <p><b>Rango:</b> ${data.range}</p><br>
          <p><b>Material:</b> ${data.material}</p><br>
        `;
      if (data.ritual == true) {
        html += `<p><b>Ritual:</b> Yes</p><br>`;
      } else {
        html += `<p><b>Ritual:</b> No</p><br>`;
      }
      html += `<p><b>Duración:</b> ${data.duration}</p><br>`;
      if (data.concentration == true) {
        html += `<p><b>Concentración:</b> Yes</p><br>`;
      } else {
        html += `<p><b>Concentración:</b> No</p><br>`;
      }
      html += `
        <p><b>Nivel:</b> ${data.level}</p><br>
        <p><b>Tipo de ataque:</b> ${data.attack_type}</p><br>
        <p><b>Tipo de daño:</b> ${data.damage.damage_type.name}</p><br>
        <p><b>Escuela:</b> ${data.school.name}</p><br>
        `;
      break;
    default:
      break;
  }
  return html;
}
