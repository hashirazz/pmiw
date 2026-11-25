class Murcielago {
  constructor() {
    this.vida = 1;
    this.daño = 1;
    this.posX = random(0, 800);
    this.posY = -20;
    this.velocidad = 1.5;
    this.diametro = 30;
    this.radioColision = 35;
    this.ancho = 40;
    this.alto = 40;
    this.indiceImagen = 0;          // que sprite (0 a 7) le toca
    this.contadorFrames = 0;        // cuenta frames para cambiar de sprite
    this.imagen = imgMurc[0];       // el sprite que se muestra ahora
  }

  mover(personaje) {
    let dx = personaje.posX - this.posX;
    let dy = personaje.posY - this.posY;
    let dtotal = dist(this.posX, this.posY, personaje.posX, personaje.posY);

    if (dtotal > 0) {
      this.posX += (dx / dtotal) * this.velocidad;
      this.posY += (dy / dtotal) * this.velocidad;
    }

                                     // cambia de sprite cada 4 frames
    this.contadorFrames++;
    if (this.contadorFrames >= 4) {
      this.contadorFrames = 0;
      this.indiceImagen++;
      if (this.indiceImagen >= 8) {
        this.indiceImagen = 0;
      }
    }

    this.imagen = imgMurc[this.indiceImagen];
  }
  // hitbox
  tocado(x, y) {
    let distancia = dist(x, y, this.posX, this.posY);
    return distancia < this.radioColision;
  }

  dibujar() {
    if (this.vida > 0) {
      image(this.imagen, this.posX, this.posY, this.ancho, this.alto);
    }
  }
}
