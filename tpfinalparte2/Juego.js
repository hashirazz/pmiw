class Juego {
  constructor() {
    this.personaje = new Personaje();
    this.piedras = [];
    this.murcielagos = [];
    this.agregarMurcielagos(8);
    this.cantidadMurcielagos = 8;
    this.muertos = 0;          //los que matamos
    this.estado = "jugando";   // jugando, gano, perdio
  }

  agregarMurcielagos(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.murcielagos.push(new Murcielago());
    }
  }

  agregarPiedra() {
    this.piedras.push(new Piedra());
  }

  contarMurcielagosVivos() {
    let cantidad = 0;
    for (let i = 0; i < this.murcielagos.length; i++) {
      if (this.murcielagos[i].vida > 0) {
        cantidad++;
      }
    }
    return cantidad;
  }

  actualizar() {
    if (this.estado !== "jugando") {//perdiste
      return;
    }

    this.personaje.mover();

    for (let i = 0; i < this.murcielagos.length; i++) { // este for hace que cada murcielago vivo se mueva hacia el personaje
      if (this.murcielagos[i].vida > 0) {
        this.murcielagos[i].mover(this.personaje);
      }
    }
    for (let i = 0; i < this.piedras.length; i++) {
      this.piedras[i].mover();
    }

    this.revisarChoques();
    this.controlarOleadas();
    this.revisarFinal();
  }

  // si tocan al personaje le sacan vida
  revisarChoques() {
    for (let i = 0; i < this.murcielagos.length; i++) {
      let m = this.murcielagos[i]; //apodo
      if (m.vida > 0) {
        let distancia = dist(m.posX, m.posY, this.personaje.posX, this.personaje.posY);
        if (distancia < 25) { //hitbox
          this.personaje.recibirDaño(m.daño);
          m.vida = 0; // el murciélago desaparece al pegarte
        }
      }
    }

    for (let i = 0; i < this.piedras.length; i++) { // lo mismo todo pero con la piedra
      let p = this.piedras[i];
      if (p.activa) {
        let distancia = dist(p.posX, p.posY, this.personaje.posX, this.personaje.posY);
        if (distancia < 30) { 
          this.personaje.recibirDaño(p.daño);
          p.activa = false; 
        }
      }
    }
  }

  revisarFinal() {
    if (this.personaje.vida <= 0) {
      this.estado = "perdio";
    } else if (this.muertos >= 50) {
      this.estado = "gano";
    }
  }

  controlarOleadas() {
    let cantidadActual = this.contarMurcielagosVivos();

    if (cantidadActual !== this.cantidadMurcielagos) {
      if (cantidadActual === 7) {
        this.agregarPiedra();
      }
      if (cantidadActual === 2) {
        this.agregarPiedra();
        this.agregarMurcielagos(8); //la oleada seria, cuando matas a un murcielago, se agrega una piedra, luego,
                                    //cuando quedan 2 murcielagos vivos, aparece otra piedra y 8 murcielagos.
      }
    }
    this.cantidadMurcielagos = this.contarMurcielagosVivos();
  }

  // mata al primer murciélago vivo que sea tocado por el click para que no matemos a mas de un click
  clickEn(x, y) {
    if (this.estado !== "jugando") {
      return;
    }
    for (let i = 0; i < this.murcielagos.length; i++) {
      if (this.murcielagos[i].vida > 0 && this.murcielagos[i].tocado(x, y)) {
        this.murcielagos[i].vida = 0;
        this.muertos++;
        break; //corta el ciclooo, solo el for, el return es el de la funcion directamente
      }
    }
  }

  dibujar() {
    this.dibujarPersonaje();
    this.dibujarMurcielagos();
    this.dibujarPiedras();
    this.dibujarTextos();
  }

  dibujarPersonaje() {
    this.personaje.dibujar();
  }

  dibujarMurcielagos() {
    for (let i = 0; i < this.murcielagos.length; i++) {
      this.murcielagos[i].dibujar();
    }
  }

  dibujarPiedras() {
    for (let i = 0; i < this.piedras.length; i++) {
      this.piedras[i].dibujar();
    }
  }

  dibujarTextos() {
    fill(255);
    noStroke();
    textSize(20);

    textAlign(LEFT);
    text("Vida: " + this.personaje.vida, 15, 30);

    textAlign(RIGHT);
    text("Murciélagos: " + this.muertos + " / 50", 785, 30);

    // mensaje final
    textAlign(CENTER);
    textSize(40);
    if (this.estado === "gano") {
      text("¡GANASTE!", 400, 200);
    }
    if (this.estado === "perdio") {
      text("PERDISTE", 400, 200);
    }
    textAlign(LEFT);
  }
}
