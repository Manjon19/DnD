// https://www.dnd5eapi.co/api/ -->Api generica
const classesAPI="https://www.dnd5eapi.co/api/classes";
const featuresAPI="https://www.dnd5eapi.co/api/features";
const monstersAPI="https://www.dnd5eapi.co/api/monsters";
const spellsAPI="https://www.dnd5eapi.co/api/spells";

//Obtener elementos html
const selectClasses=document.getElementById("clases");
const selectFeatures=document.getElementById("caracteristicas");
const selectMonsters=document.getElementById("monsters");
const selectSpells=document.getElementById("spells");
getClasses();
getFeatures()
getMonsters()
getSpells()
async function getClasses(){
    await fetch(classesAPI)
    .then(response=>response.json())
    .then(data=>fill(data,selectClasses))
}
async function getFeatures(){
    await fetch(featuresAPI)
    .then(response=>response.json())
    .then(data=>fill(data,selectFeatures))
}
async function getMonsters(){
    await fetch(monstersAPI)
    .then(response=>response.json())
    .then(data=>fill(data,selectMonsters))
}
async function getSpells(){
    await fetch(spellsAPI)
    .then(response=>response.json())
    .then(data=>fill(data,selectSpells))
}
function fill(data,select) {
    let selecciona=document.createElement("option");
    selecciona.value=select.name;
    selecciona.textContent=select.name.toUpperCase();
    select.appendChild(selecciona);
    for (let index = 0; index < data.count; index++) {
        let opcion=document.createElement("option");
        opcion.value=data.results[index].index;
        opcion.textContent=data.results[index].name;
        select.appendChild(opcion);
    }
}