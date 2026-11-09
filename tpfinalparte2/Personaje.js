class Personaje {
  constructor() {
    this.vida = 5;
    this.daño = 1;
    this.posX = 400;
    this.posY = 370;
    this.suelo = 370;     
    this.velocidad = 5;
    this.velocidadY = 0;   // velocidad de salto
    this.gravedad = 0.6;
    this.radio = 15;       // para los choques
  }

  mover() {
    if (keyIsDown(65)) { // A
      this.posX -= this.velocidad;
    }
    if (keyIsDown(68)) { //D
      this.posX += this.velocidad;
    }

    if (keyIsDown(32) && this.posY === this.suelo) { // salta solo si está en el piso
      this.velocidadY = -12;
     }

    // gravedad
    this.posY += this.velocidadY; 
    this.velocidadY += this.gravedad;

    // cuando cae se frena en el suelo, no se pasa
    if (this.posY >= this.suelo) {
      this.posY = this.suelo;
      this.velocidadY = 0;
    }

    // que no salga de la pantalla
    if (this.posX < 15) {
      this.posX = 15;
    }
    if (this.posX > 785) {
      this.posX = 785;
    }
  }

  recibirDaño(cantidad) {
    this.vida -= cantidad;
    if (this.vida < 0) {
      this.vida = 0;
    }
  }

  dibujar() {
    fill(255, 200, 0);
    rect(this.posX - 15, this.posY - 15, 30, 30);
  }
}
