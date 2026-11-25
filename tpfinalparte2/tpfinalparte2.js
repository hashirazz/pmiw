//https://youtu.be/Is5A1ayqAvg

let juego;

let imgNeutral;
let imgDano;
let imgPiedra;
let imgFondo;
let imgVictoria;
let imgDerrota;
let imgSalta = [];
let imgCorre = [];
let imgMurc = [];
let musica;

let ruta = "data/";

// carga de sprites
function preload() {
  imgNeutral = loadImage(ruta + "neutral.png");
  imgDano = loadImage(ruta + "pj_danio.png");
  imgPiedra = loadImage(ruta + "piedra.png");
  imgFondo = loadImage(ruta + "fondo.png");
  imgVictoria = loadImage(ruta + "victoria.png");
  imgDerrota = loadImage(ruta + "derrota.png");

  for (let i = 1; i <= 4; i++) {
    imgSalta.push(loadImage(ruta + "pj_salta" + i + ".png"));
  }
  for (let i = 1; i <= 6; i++) {
    imgCorre.push(loadImage(ruta + "pj_corre" + i + ".png"));
  }
  for (let i = 1; i <= 8; i++) {
    imgMurc.push(loadImage(ruta + "murc" + i + ".png"));
  }
}

function setup() {
  createCanvas(800, 400);
  musica = createAudio(ruta + "soundtrack.mp3");
  musica.hide();
  juego = new Juego();
}

function draw() {
  background(30);
  juego.actualizar();
  juego.dibujar();
}

// suena una sola vez, sin loop (se llama desde un click, asi el navegador lo permite)
function iniciarSonido() {
  musica.stop();
  musica.play();
}

function mousePressed() {
  juego.clickEn(mouseX, mouseY);
}

//reiniciar el juego
function keyPressed() {
  if (key === "r" || key === "R") {
    juego = new Juego();
    juego.estado = "jugando";   // saltea la pantalla de instrucciones
    iniciarSonido();
  }
}
