// https://www.dnd5eapi.co/api/ -->Api generica
const classesAPI="https://www.dnd5eapi.co/api/classes";
const featuresAPI="https://www.dnd5eapi.co/api/features";
const monstersAPI="https://www.dnd5eapi.co/api/monsters";
const spellsAPI="https://www.dnd5eapi.co/api/spells";

//Obtener elementos html
const selectClasses=document.getElementById("clases");
const selectFeatures=document.getElementById("caracteristicas");
getClasses();
async function getClasses(){
    await fetch(classesAPI)
    .then(response=>response.json())
    .then(data=>console.log(data))
}

function fill(data) {

    for (let index = 0; index < data.count; index++) {
        
        
    }
}