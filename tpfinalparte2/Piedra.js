class Piedra {
  constructor() {
    this.daño = 2;
    this.diametro = 30;
    this.posY = 370; 
    this.activa = true;

    //izquierda o por la derecha
    let lado = floor(random(0,2)); //0 o 1
    if (lado === 0) {
      this.posX = -20;
      this.velocidad = 3;
    } else {
      this.posX = 820;
      this.velocidad = -3;
    }
  }

  mover() {
    if (this.activa) {
      this.posX += this.velocidad;
      if (this.posX < -40 || this.posX > 840) { //se fuee
        this.activa = false;
      }
    }
  }

  dibujar() {
    if (this.activa) {
      fill(120);
      ellipse(this.posX, this.posY, this.diametro);
    }
  }
}
