// ACLARACIONES

// FONDO: está construido por 4 capas:
// 1: fondo, está detras de todo
// 2: arboles_fondo
// 3: arboles_cerca
// 4: piso, está delante de todo

// PERSONAJES: fantasma y lobo esqueleto, sus imagenes son .png
// Fantasma tiene:
// neutral
// aparicion
// deshaparicion
// acoso

// Lobo esqueleto tiene: 
// correr
// neutral
// 

// FONDO
let fondo, arbolesFondo, arbolesCerca, piso;
let desplazArbolesFondo = 0, desplazArbolesCerca = 0, desplazPiso = 0;
let velArbolesFondo = 0.5, velArbolesCerca = 2, velPiso = 4;

// LOBO
let lobo_idle = [];
let lobo_corre = [];
let loboX = -100;
let loboY = 450;
let loboMetaX = 350;
let estadoLobo = "entra";
let tiempoInicioLoboIdle = 0;
let anchoLobo = 150, altoLobo = 110;

let inicioFrameLobo = 0;

// FANTASMA
let fan_entra = [];
let fan_neutral = [];
let fan_acoso = [];
let fan_sale = [];
let fanX = 780;         
let fanMetaX = 700;     
let fanY = 300;
let estadoFan = "espera";
let tiempoInicioFanIdle = 0;
let anchoFan = 120, altoFan = 150;

let inicioFrameFan = 0;

function preload() {
  cargarRecursos();
}

function setup() {
  createCanvas(800, 600);
  noSmooth();
}

function draw() {
  
  dibujarFondo();
  actualizarLobo();
  actualizarFan();
}
