let pantallaActual = 0; 
const TOTAL_PANTALLAS = 25;

let imagenes = [];
let destinos = []; // a que pantalla lleva cada zona
let zonas = [];    // zona clickeable del boton

const MOSTRAR_ZONAS = false;

// Botón de reinicio
const BOTON_REINICIAR = [690, 10, 100, 32];

function preload() {
  cargarImagenes();
}

function setup() {
  createCanvas(800, 450);
  cargarHistoria();
}

function draw() {
  mostrarPantalla(pantallaActual);
}

function mousePressed() {
  if (hayBotonReiniciar(pantallaActual) && mouseSobreZona(BOTON_REINICIAR)) {
    reiniciar();
    return;
  }

  let j = zonaBajoElMouse(pantallaActual);
  if (j !== -1) {
    irAPantalla(destinos[pantallaActual][j]);
  }
}
