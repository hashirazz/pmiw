class Personaje {
  constructor() {
    this.estaVivo = true;
    this.cantidadVida = 5;
    this.daño = 1;
    this.posX = 400;
    this.posY = 370;
    this.suelo = 370;
    this.velocidad = 5;
    this.velocidadY = 0;
    this.gravedad = 0.6; // controla los sprites en el salto 
    this.radio = 15;
    this.mirandoIzquierda = false;
    this.tiempoDaño = 0;
    this.indiceCorrer = 0;
    this.contadorFrames = 0;
    this.ancho = 50;
    this.alto = 50;
  }

  mover() {
    if (this.estaVivo === true) {
      // controles 
      if (keyIsDown(65)) {
        this.posX -= this.velocidad;
        this.mirandoIzquierda = true;
      }
      if (keyIsDown(68)) {
        this.posX += this.velocidad;
        this.mirandoIzquierda = false;
      }

      // salto solo si está en el suelo
      if (keyIsDown(32) && this.posY === this.suelo) {
        this.velocidadY = -12;
      }

      // gravedad y limitaciones de pantalla
      this.posY += this.velocidadY;
      this.velocidadY += this.gravedad;
      if (this.posY >= this.suelo) {
        this.posY = this.suelo;
        this.velocidadY = 0;
      }

      if (this.posX < 15) {
        this.posX = 15;
      }
      if (this.posX > 785) {
        this.posX = 785;
      }

      this.actualizarAnimacion();
    }
  }

  actualizarAnimacion() {
    // correr: cambia de sprite cada 4 frames, solo si aprieta A o D
    if (keyIsDown(65) || keyIsDown(68)) {
      this.contadorFrames++;
      if (this.contadorFrames >= 4) {
        this.contadorFrames = 0;
        this.indiceCorrer++;
        if (this.indiceCorrer >= 6) {
          this.indiceCorrer = 0;
        }
      }
    }

    // duracion de sprite de daño 
    if (this.tiempoDaño > 0) {
      this.tiempoDaño--;
    }
  }

  recibirDaño(cantidad) {
    this.cantidadVida -= cantidad;
    this.tiempoDaño = 20;

    if (this.cantidadVida < 0) {
      this.cantidadVida = 0;
    }
    if (this.cantidadVida === 0) {
      this.estaVivo = false;
    }
  }
       // sprites 
  dibujar() {
    if (this.estaVivo === true) {
      let imagen = imgNeutral;

      if (this.tiempoDaño > 0) {
        imagen = imgDano;
      } else if (this.posY < this.suelo) {
        // control de los sprites en el salto segun cuanto salto
        if (this.velocidadY < -6) {
          imagen = imgSalta[0];
        } else if (this.velocidadY < 0) {
          imagen = imgSalta[1];
        } else if (this.velocidadY < 6) {
          imagen = imgSalta[2];
        } else {
          imagen = imgSalta[3];
        }
      } else if (keyIsDown(65) || keyIsDown(68)) {
        imagen = imgCorre[this.indiceCorrer];
      }

      push(); //esto es para que se pueda girar el sprite cambiando el eje 
      translate(this.posX, this.posY);
      if (this.mirandoIzquierda === true) {
        scale(-1, 1);
      }
      image(imagen, -this.ancho / 2, -this.alto / 2, this.ancho, this.alto);
      pop();
    }
  }
}
