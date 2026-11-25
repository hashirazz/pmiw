class Piedra {
  constructor() {
    this.daño = 2;
    this.diametro = 36;               // tamaño de la piedra (ancho = alto)
    this.radio = this.diametro / 2;   // radio real del círculo
    this.posY = 400 - this.radio;     // apoyada justo en el piso
    this.activa = true;
    this.angulo = 0;
    this.escala = 0.5;   // se dibuja la piedra  al 20% del tamaño del png
    this.velocidad = 3; 
    // sale por la izquierda o por la derecha al azar
    let lado = floor(random(2));
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

      // gira 
      this.angulo += this.velocidad / this.radio; 
      // limites de la pantalla 
      if (this.posX < -40 || this.posX > 840) {
        this.activa = false;
      }
    }
  }

  dibujar() {
    if (this.activa) {
      let ancho = imgPiedra.width * this.escala;
      let alto = imgPiedra.height * this.escala;

      push();
      translate(this.posX, this.posY);
      rotate(this.angulo);
      image(imgPiedra, -ancho / 2, -alto / 2, ancho, alto);
      pop();
    }
  }
}
