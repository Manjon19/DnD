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
const main = document.getElementsByTagName("main");
const seccion=document.createElement("section");
//Llenar todos los selects con getters
getClasses();
getFeatures()
getMonsters()
getSpells()

//Funciones get que hacen llamada a la API especifica y llamada al metodo fill
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
//Función que rellena los selects con los datos de la llamada a la API
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
selectClasses.addEventListener("change",(e)=>{
    console.log(e.currentTarget.value)
    if (e.currentTarget.value!="clases") {
        cambio(classesAPI,e.currentTarget.value,"clases")
    }
    
})
selectFeatures.addEventListener("change",(e)=>{
    console.log(e.currentTarget.value)
    if (e.currentTarget.value!="caracteristicas") {
        cambio(featuresAPI,e.currentTarget.value,"caracteristicas")
    }
    
})
selectMonsters.addEventListener("change",(e)=>{
    console.log(e.currentTarget.value)
    if (e.currentTarget.value!="monstruos") {
        cambio(monstersAPI,e.currentTarget.value,"monstruos")
    }
    
})
selectSpells.addEventListener("change",(e)=>{
    console.log(e.currentTarget.value)
    if (e.currentTarget.value!="conjuros") {
        cambio(spellsAPI,e.currentTarget.value,"conjuros")
    }
    
})
async function cambio(API,value,name){
    await fetch(API+"/"+value).then(response=>response.json()).then(data=>{
        console.log(name)
        fichas(name,data)
    main[0].append(seccion)
    })
    
}

function fichas(name,data) {
    let html="";
    switch (name) {
        case "clases":
            html+=`<p>Clase: ${data.name} </p>
                    <p>Dado de golpe: ${data.hit_die}</p>
                    <div> <p>Elige tus favoritas para guardarlas:</p>`;
            data.proficiency_choices[0].from.options.forEach(proficiency => {
               html+=`<button name="skill">${proficiency.item.name}</button>`
            });
            html+="</div>";
            html+=`<p>Armas  y armaduras con competencia:</p>
                    <ul>`;
            data.proficiencies.forEach(competencia=>{
                html+=`<li>${competencia.name}</li>`;
            })
            html+="</ul>";
            html+="<p>Tiradas de salvación:</p> <ul>";
            data.saving_throws.forEach(saving=>{
                html+=`<li>${saving.name}</li>`;
            })
            html+="</ul>";
            html+="<p>Equipo de inicio:</p> <ul>";
            data.starting_equipment.forEach(start=>{
                html+=`<li>${start.equipment.name}</li>`;
            })
            html+="</ul> </div>";
            console.log(html);
            break;
    
        default:
            break;
    }
    return html;
}