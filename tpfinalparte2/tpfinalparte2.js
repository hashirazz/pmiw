let juego;

function setup() {
  createCanvas(800, 400);
  juego = new Juego();
}

function draw() {
  background(30);
  stroke(0);
  juego.actualizar();
  juego.dibujar();
}

function mousePressed() {
  juego.clickEn(mouseX, mouseY);
}
