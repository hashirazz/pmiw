// Video explicativo Fiorell Brangeri: https://youtu.be/A9CKh-LTvA0


let pantallaActual = 0;//pantalla de inicio con animacion
const TOTAL_PANTALLAS = 25;//numero total de pantallas

const TOTAL_SPRITES = 8;// cantidad de sprites de cada animación
const VELOCIDAD_ANIMACION = 8;// cada cuántos frames cambia de sprite 

// sprites 
let antorcha = []; 
let hombre = [];
let liana = [];

//muscia mp3 
let sonido;

let imagenes = []; 
let destinos = []; // a que pantalla lleva cada zona
let zonas = [];    // zona clickeable de la pantalla 

// boton de reinicio
const BOTON_REINICIAR = [690, 10, 100, 32];

// boton de creditos
const PANTALLA_CREDITOS = 25; 
const BOTON_CREDITOS = [10, 408, 100, 32]; 

//preload de img y sprites 
function preload() {
  cargarImagenes();
  cargarSprites();

}

function setup() {
  createCanvas(800, 450);
  cargarHistoria();
  cargarSonido();
}

function draw() {
  mostrarPantalla(pantallaActual);
}
// inicio del sonido y reinicio
function mousePressed() {
  iniciarSonido();
  
  if (hayBotonReiniciar(pantallaActual) && mouseSobreZona(BOTON_REINICIAR)) {
    reiniciar();
    return;
  }
//movimiento de pantalla en pantalla 
  let j = zonaBajoElMouse(pantallaActual);
  if (j !== -1) {
    irAPantalla(destinos[pantallaActual][j]);
  }
}
