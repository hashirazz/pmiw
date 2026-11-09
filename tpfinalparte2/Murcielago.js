class Murcielago {
  constructor() {
    this.vida = 1;
    this.daño = 1;
    this.posX = random(0, 800);
    this.posY = -20;
    this.velocidad = random(1,2);
    this.diametro = 30;
    this.radioColision = 30;
  }

 mover(personaje) {
  let dx = personaje.posX - this.posX;
  let dy = personaje.posY - this.posY;
  let d = dist(0, 0, dx, dy);   // distancia total hasta el personaje

  if (d > 0) {
    this.posX += (dx / d) * this.velocidad; //desde el origen de m hasta ela dist total
    this.posY += (dy / d) * this.velocidad;
  }
}

  tocado(x, y) {
    let distancia = dist(x, y, this.posX, this.posY);
    return distancia < this.radioColision; //retorna lo de esa comparacion
  }

  dibujar() {
    if (this.vida > 0) {
      fill(90, 40, 120);
      ellipse(this.posX, this.posY, this.diametro);
    }
  }
}
