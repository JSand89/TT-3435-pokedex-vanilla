//Variables
const pokemonList = document.getElementById("pokemonList");
const pokemonDetail = document.getElementById("pokemonDetail");
const pokemonInfo = document.getElementById("pokemonInfo");
const backBtn = document.getElementById("backBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
let query ="";
//Función que consulta la api de pokeapi
async function fetchPokemonData(pokemonId) {
    let endpoint="https://pokeapi.co/api/v2/pokemon/"+pokemonId;
    const response = await fetch(endpoint);
    const pokemon = await response.json();
    return pokemon;
}
//Función que muestra la info del Pokemon
function displayPokemon(pokemon){
    const pokemonCard = document.createElement("div");//creando el elemento
    pokemonCard.classList.add("pokemonCard")//Agregando una clase
    //Bloque de codigo que me busca los tipos
    let pokemonTypes = "";
    for(let i=0;i<pokemon.types.length;i++){
        // console.log(pokemon.types[i])
        pokemonTypes = pokemonTypes + pokemon.types[i].type.name +" ";
    }
    //creamos el contenido de la tarjeta
    pokemonCard.innerHTML = `
    <h3 class="name">${pokemon.name}</h3>
    <h2 class="idNumber">${pokemon.id}</h2>
    <img src=${pokemon.sprites.front_shiny} alt="${pokemon.name}">
    <h3>Tipos del pokemon</h3>
    <p>${pokemonTypes}</p>
    `
    //agregamos la funcionalidad de click para llamar la vista específica
    pokemonCard.addEventListener("click",()=>{
        showPokemonDetail(pokemon)
    })
    pokemonList.appendChild(pokemonCard);
}
function showPokemonDetail(pokemon){
    pokemonList.style.display ="none";
    pokemonDetail.style.display ="block";
    console.log(pokemon.stats[0].stat.name) // verificando que la información llega 
    let pokemonStats = "";
    for(let i=0;i<pokemon.stats.length;i++){
        pokemonStats = pokemonStats 
        + `<li>${pokemon.stats[i].stat.name}
        :${pokemon.stats[i].base_stat} </li>`
    }
    let pokemonTypes = "";
    for(let i=0;i<pokemon.types.length;i++){
        // console.log(pokemon.types[i])
        pokemonTypes = pokemonTypes + pokemon.types[i].type.name +" ";
    }
    pokemonInfo.innerHTML =`
    <h2>Detalle de pokemon</h2>
    <h3 class="name">${pokemon.name}</h3>
    <h2 class="idNumber">${pokemon.id}</h2>
    <img src=${pokemon.sprites.front_shiny} alt="${pokemon.name}">
    <h3>Tipos del pokemon</h3>
    ${pokemonTypes}
    <h3>Pokemon Stats</h3>
    <ul>
    ${pokemonStats}
    </ul>
    `
}
backBtn.addEventListener("click",()=>{
    pokemonDetail.style.display = "none"
    pokemonList.style.display = "block"
})
searchInput.addEventListener("input",(e)=>{
    query = e.target.value;
})
async function searchPokemon(){
    try {
        const pokemon = await fetchPokemonData(query);
        showPokemonDetail(pokemon)
    } catch (error) {
        alert("Pokemon no encontrado, intentalo de nuevo con otro nombre o ID")
    }
}
searchBtn.addEventListener("click",()=>searchPokemon())
async function loadPokedex() {
    for (let i=1;i<2;i++){
        const pokemon = await fetchPokemonData(i);
        displayPokemon(pokemon);  
    }    
}
loadPokedex()