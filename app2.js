let joystickContainer = document.getElementById('joystickContainer');
let bodyPokedex = document.getElementById('bodyPokedex');
let sphere = document.querySelector('img.sphere');
let typesBox = document.querySelector('div.typesBox');
let filters = document.querySelector('div.filters');
let moreTypesContainer = document.querySelector('div.moreTypesContainer');
let purpleBG = document.querySelector('img.purpleBG');
let greenBG = document.querySelector('img.greenBG');
let btnMoreTypes = document.getElementById('btnMoreTypes');
let btnLessTypes = document.getElementById('btnLessTypes');
let btnNumber = document.getElementById('btnNumber');
let btnName = document.getElementById('btnName');
let numberForm = document.getElementById('numberForm');
let nameForm = document.getElementById('nameForm');
let btnNumberSearch = document.getElementById('btnNumberSearch');
let btnNameSearch = document.getElementById('btnNameSearch');
let viewHeight = undefined;
let viewWidth = undefined;
let initialHeight = 687 ;
let html = document.querySelector("html");

setMediaQueries(window.innerHeight);

window.addEventListener('orientationchange', function(){
    location.reload();
})

function originalSizes() {
    html.style = '';
    joystickContainer.style='';
    bodyPokedex.style = '';
    sphere.style = '';
    typesBox.style = '';
    filters.style = '';
    numberForm.style = '';
    nameForm.style = '';
    btnNumber.style = '';
    btnName.style = '';
    moreTypesContainer.style = '';
    purpleBG.style = '';
    greenBG.style = '';
}

function setMediaQueries(value) {

    let scale = value/initialHeight;
    html.style = `font-size: ${scale}px;`;

    let firstBkPoint = parseInt(781 * scale);
    let secondBkPoint = parseInt(534 * scale);

if (window.matchMedia(`(max-width: ${firstBkPoint}px)`).matches === true) { 
    console.log('entro al firstBkPoint');
    joystickContainer.style.height = "192.36em";
    bodyPokedex.style.height = "405.33em";
    sphere.style.marginLeft = '22%';
} else {console.log('no entro al first bk point');};

if (window.matchMedia(`(max-width: ${secondBkPoint}px)`).matches === true) { 
    console.log('entro al secondBkPoint');
    joystickContainer.style.height = "137.4em";
    
    bodyPokedex.style.height = "460.29em";
    sphere.style.marginLeft = '10%';

    typesBox.style.width = "100%";
    typesBox.style.height = '54.96em';
    typesBox.style.overflow = "hidden";

    filters.style.width = "100%";
    filters.style.flexDirection = "row";
    filters.style.justifyContent = "center";
    filters.style.height = '41.22em';
    filters.style.padding = '0em';

    numberForm.style.marginTop = '0em';
    nameForm.style.marginTop = '0em';

    btnNumber.style.width = '100%';
    btnName.style.width = '100%';

    moreTypesContainer.style.display = 'flex';

    purpleBG.style.display = 'none';

    greenBG.style.display = 'none';

    btnName.style.marginRight = '4px';
}else{console.log('no entro al secondBkPoint');}
}

// Botones para expandir y reducir la caja de tipos (solo disponibles en la segunda media querie)
btnMoreTypes.addEventListener('click', function(){
    btnMoreTypes.style.display = 'none';
    btnLessTypes.style.display = 'block';

    joystickContainer.style.position = 'fixed';
    joystickContainer.style.bottom = '0px';
    joystickContainer.style.height = 'auto';

    typesBox.style.height = 'auto';
})

btnLessTypes.addEventListener('click', function(){
    btnMoreTypes.style.display = 'block';
    btnLessTypes.style.display = 'none';

    joystickContainer.style.position = 'relative';
    joystickContainer.style.bottom = 'none';
    joystickContainer.style.height = '137.4em';

    typesBox.style.height = '54.96em';
})

// botones para busqueda por nombre o numero

btnNumber.addEventListener('click', function(){
    nameForm.style.display = 'none';
    numberForm.style.display = 'flex';
})

btnName.addEventListener('click', function(){
    numberForm.style.display = 'none';
    nameForm.style.display = 'flex';
})