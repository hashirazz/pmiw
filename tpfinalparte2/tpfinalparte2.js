
//https://www.youtube.com/watch?v=C3gGPplj8Nk
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
  juego = new Juego();
}

function draw() {
  background(30);
  juego.actualizar();
  juego.dibujar();
}


function mousePressed() {
  juego.clickEn(mouseX, mouseY);
}

//reiniciar el juego
function keyPressed() {
  if (key === "r" || key === "R") {
    juego = new Juego();
  }
}
