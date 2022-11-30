const cardsContainer = document.getElementById('cardsContainer');
const final = document.getElementById('final');
const initialLogo = document.getElementById('initialLogo');
let img = undefined;
let imgCard = undefined;
let divCard = undefined;
let continuar = false;

// intersection onbserver de elemento del dom "final" para agregar mas pokemones

function callback(entries, observer) {
    entries.forEach(async function (entry) {
        if (entry.isIntersecting) {
            console.log('intersecta final');
            continuar = true;
            b = a;
            if (continuar === true && a<extraPokemonToShow.length) {
                while (a<b+8 && a<extraPokemonToShow.length) {
                    let poke = extraPokemonToShow[a].pokemon
                    await start(extraSelectedPokemon, poke.url)
                    createCard(extraSelectedPokemon[a], a);
                    await insertCard();
                    fillImg()
                    a++;
                }
            } else {
                continuar = false;
                console.log("termino");
            }
        } else {
            console.log('no intersecta final');
            continuar = false;
        }
    });
}
  
const options2 = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
};
  
const observer3 = new IntersectionObserver(callback, options2);

// intersection observer de imagenes para lazy loading

function intersection(entries, observer){
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            entry.target.src = entry.target.dataset.src
            entry.target.addEventListener('load',function (){
                entry.target.className = 'card-img-top imgCardBg';
            })
            observer.unobserve(entry.target);
        }      
    });
}

const options = {
    root : null,
    rootMargin : '0px',
    threshold : 0,
}

const observer = new IntersectionObserver(intersection, options);

// funciones para recibir pokemones de la pokeapi
let allPokemon = [];
let cardToInsert = '';

async function start(array, url) {
    const response = await fetch(url);
    const data = await response.json();
    array.push(data);
}

// funcion para crear tarjeta de pokemon
let createCard = function(pokemon, i){
    if (pokemon.sprites.other['official-artwork'].front_default == null) {
        pokemon.sprites.other['official-artwork'].front_default = '/images/pokelogo.svg'
    }

    let card = '<div class="card">';

    card += `<img data-src='${pokemon.sprites.other['official-artwork'].front_default}' class='card-img-top mx-auto rotate' id='${i+1}'>`

    card += "<div class='card-body'>"

    card += '<h5 class="card-title p-0">Nombre</h5>'
    card += `<p class="card-text p-0">${pokemon.name}</p>`

    card += '<h5 class="card-title p-0">Numero</h5>'
    card += `<p class="card-text p-0">${pokemon.id}</p>`

    card += '<h5 class="card-title p-0">Tipo</h5>'

    pokemon.types.forEach(element => {
        card += `<p class="card-text p-0">${element.type.name}</p>`
    });

    card += "</div></div>"
    return cardToInsert = card
}

// funcion para insertar tarjeta a cardsContainer
function insertCard(){
    cardsContainer.innerHTML += cardToInsert;
}

// boton filtro todos
// async function fillCardsContainerAllPokemon(){
//     let selectedPokemon = [];
//     await start(allPokemon, 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
//     let allPokemonResults = allPokemon[0].results;
    
//     for(let i=0; i<allPokemonResults.length; i++){
//         let poke = allPokemonResults[i]
//         await start(selectedPokemon, poke.url)
        
//         createCard(selectedPokemon[i]);
//         insertCard()
//     }
// }

// let btnAllPokemon = document.getElementById('allPokemon');
// btnAllPokemon.addEventListener('click', function (){
//     fillCardsContainerAllPokemon();
// })

// funcion busqueda por tipo pokemon
let a = 0;
let extraPokemonToShow = undefined;
let extraSelectedPokemon = undefined;
async function fillCardsContainerTypePokemon(typePokemonArray,typeNumber){
    let selectedPokemon = [];
    let typePokemonResults = undefined;
    await start(typePokemonArray, `https://pokeapi.co/api/v2/type/${typeNumber}`);
    typePokemonResults = typePokemonArray[0].pokemon;
    let i = 0;
    extraPokemonToShow = typePokemonResults;
    extraSelectedPokemon = selectedPokemon;

    while (i<12) {
        let poke = typePokemonResults[i].pokemon
        await start(selectedPokemon, poke.url)
        createCard(selectedPokemon[i], i);
        insertCard();
        i++;
    }
    a=12;
}

// funcion busqueda por pokemon (numero o nombre)
async function fillCardsContainerPokemonSearched(pokemonName){
    let selectedPokemon = [];
    await start2(selectedPokemon,`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    let searchedPokemon = selectedPokemon[0];
    createCard(searchedPokemon, 1)
    insertCard();
}

// funcion lazy loading imagenes

function fillImg(){
    img = cardsContainer.querySelectorAll('img');
    img.forEach(i => {observer.observe(i);})
}

// funcion para limpiar cardsContainer
function clearCardsContainer() {
    initialLogo.style.display = 'none';
    bodyPokedex.style.display = 'block';
    bodyPokedex.style.alignItems = 'undefined';
    final.style.display = "none";
    cardsContainer.innerHTML = '';
}

// funciones para botones de filtro por tipo

observer3.observe(final);
let b = undefined;

async function filterBtn(numberType){
    let Pokemon = [];
    clearCardsContainer();
    await fillCardsContainerTypePokemon(Pokemon, numberType);
    final.style.display = "block";
    fillImg();
}

// funcion fetch busqueda por nombre
// let allPokemon = [];
// let cardToInsert = '';

async function start2(array, url) {
    const fetchPokemon = await fetch(url);
    console.log(fetchPokemon);
    let data = undefined;
    if(fetchPokemon.ok === true){
        data = await fetchPokemon.json()
        console.log(data);
    } else {
        data = {
            sprites: { other: {'official-artwork': {front_default : null}}},
            name : "Not found",
            id : 0,
            types : [type = {slot:1,type:{name:"Not found"}}],
        }
    };
    array.push(data);
    
}

// formulario busqueda por nombre
let inputNameForm = document.getElementById('inputNameForm');
btnNameSearch.addEventListener('click',async function(e){
    e.preventDefault();
    clearCardsContainer();
    await fillCardsContainerPokemonSearched(inputNameForm.value.toLowerCase());
    fillImg();
})

// formulario busqueda por numero
let inputNumberForm = document.getElementById('inputNumberForm');
inputNumberForm.addEventListener("input", (e) => {
    let value = e.target.value;
    e.target.value = value.replace(/[^0-9\d]/g, "");
    if (inputNumberForm.value>905) {
        inputNumberForm.value = '905'
    }
  });

btnNumberSearch.addEventListener('click',async function(e){
    e.preventDefault();
    clearCardsContainer();
    let pokeNumber = parseInt(inputNumberForm.value)
    await fillCardsContainerPokemonSearched(`${pokeNumber}`);
    fillImg();
})

// boton filtro normal
let btnNormalPokemon = document.getElementById('normalPokemon');
btnNormalPokemon.addEventListener('click',async function (){
    await filterBtn(1)
})

// boton filtro fighting
let btnFightingPokemon = document.getElementById('fightingPokemon');
btnFightingPokemon.addEventListener('click',() => {filterBtn(2)})

// boton filtro flying
let btnFlyingPokemon = document.getElementById('flyingPokemon');
btnFlyingPokemon.addEventListener('click',() => {filterBtn(3)})

// boton filtro poison
let btnPoisonPokemon = document.getElementById('poisonPokemon');
btnPoisonPokemon.addEventListener('click', () => {filterBtn(4)})

// boton filtro ground
let btnGroundPokemon = document.getElementById('groundPokemon');
btnGroundPokemon.addEventListener('click', () => {filterBtn(5)})

// boton filtro rock
let btnRockPokemon = document.getElementById('rockPokemon');
btnRockPokemon.addEventListener('click', () => {filterBtn(6)})

// boton filtro bug
let btnBugPokemon = document.getElementById('bugPokemon');
btnBugPokemon.addEventListener('click', () => {filterBtn(7)})

// boton filtro ghost
let btnGhostPokemon = document.getElementById('ghostPokemon');
btnGhostPokemon.addEventListener('click', () => {filterBtn(8)})

// boton filtro steel
let btnSteelPokemon = document.getElementById('steelPokemon');
btnSteelPokemon.addEventListener('click', () => {filterBtn(9)})

// boton filtro fire
let btnFirePokemon = document.getElementById('firePokemon');
btnFirePokemon.addEventListener('click', () => {filterBtn(10)})

// boton filtro water
let btnWaterPokemon = document.getElementById('waterPokemon');
btnWaterPokemon.addEventListener('click', () => {filterBtn(11)})

// boton filtro grass
let btnGrassPokemon = document.getElementById('grassPokemon');
btnGrassPokemon.addEventListener('click', () => {filterBtn(12)})

// boton filtro electric
let btnElectricPokemon = document.getElementById('electricPokemon');
btnElectricPokemon.addEventListener('click', () => {filterBtn(13)})

// boton filtro psychic
let btnPsychicPokemon = document.getElementById('psychicPokemon');
btnPsychicPokemon.addEventListener('click', () => {filterBtn(14)})

// boton filtro ice
let btnIcePokemon = document.getElementById('icePokemon');
btnIcePokemon.addEventListener('click', () => {filterBtn(15)})

// boton filtro dragon
let btnDragonPokemon = document.getElementById('dragonPokemon');
btnDragonPokemon.addEventListener('click', () => {filterBtn(16)})

// boton filtro dark
let btnDarkPokemon = document.getElementById('darkPokemon');
btnDarkPokemon.addEventListener('click', () => {filterBtn(17)})

// boton filtro fairyPokemon
let btnFairyPokemon = document.getElementById('fairyPokemon');
btnFairyPokemon.addEventListener('click', () => {filterBtn(18)})

