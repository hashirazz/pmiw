class Juego {
  constructor() {
    this.personaje = new Personaje();
    this.piedras = [];
    this.murcielagos = [];
    this.agregarMurcielagos(8);
    this.cantidadMurcielagos = 8;
    this.muertos = 0;
    this.estado = "jugando";   // "jugando", "gano" o "perdio"
  }
// dibuja piedras y murcielagos 
  agregarMurcielagos(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.murcielagos.push(new Murcielago());
    }
  }

  agregarPiedra() {
    this.piedras.push(new Piedra());
  }
// cuenta cada murcielago y devuelve la cantidad 
  contarMurcielagosVivos() {
    let cantidad = 0;
    for (let i = 0; i < this.murcielagos.length; i++) {
      if (this.murcielagos[i].vida > 0) {
        cantidad++;
      }
    }
    return cantidad;
  }
// si esta jugando, los murcielagos y las piedras se mueven 
  actualizar() {
    
    if (this.estado === "jugando") {
      this.personaje.mover();

      for (let i = 0; i < this.murcielagos.length; i++) {
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
  }

  // si un murciélago o una piedra tocan al personaje, le sacan vida y desaparecen 
  revisarChoques() {
    for (let i = 0; i < this.murcielagos.length; i++) {
      let m = this.murcielagos[i]; 
      if (m.vida > 0) {
        let distancia = dist(m.posX, m.posY, this.personaje.posX, this.personaje.posY);
        if (distancia < 25) {
          this.personaje.recibirDaño(m.daño);
          m.vida = 0;
        }
      }
    }

    for (let i = 0; i < this.piedras.length; i++) {
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
// establece las pautas para ganar o perder 
  revisarFinal() {
    if (this.personaje.estaVivo === false) {
      this.estado = "perdio";
    } else if (this.muertos >= 50) {
      this.estado = "gano";
    }
  }
// controla las oleadas de piedras y de murcielagos 
  controlarOleadas() {
    let cantidadActual = this.contarMurcielagosVivos();

    if (cantidadActual !== this.cantidadMurcielagos) {
      if (cantidadActual === 7) {
        this.agregarPiedra();
      }
      if (cantidadActual === 2) {
        this.agregarPiedra();
        this.agregarMurcielagos(8);
      }
    }
    this.cantidadMurcielagos = this.contarMurcielagosVivos();
  }

  // mata al primer murcielago vivo que se clickea, asi no matas dos de un solo click
  clickEn(x, y) {
    if (this.estado === "jugando") {
      let yaMato = false;

      for (let i = 0; i < this.murcielagos.length; i++) {
        if (yaMato === false && this.murcielagos[i].vida > 0 && this.murcielagos[i].tocado(x, y)) {
          this.murcielagos[i].vida = 0;
          this.muertos++;
          yaMato = true;
        }
      }
    }
  }
// estados del juego y dibuja todo 
  dibujar() {                                     
    if (this.personaje.estaVivo === false) {
      this.dibujarPantallaMuerte();
    } else if (this.estado === "gano") {
      this.dibujarPantallaVictoria();
    } else {
      this.dibujarFondo();
      this.dibujarPersonaje();
      this.dibujarMurcielagos();
      this.dibujarPiedras();
      this.dibujarTextos();
    }
  }
// pantallas y fondo 
  dibujarFondo() {
    imageMode(CORNER);
    image(imgFondo, 0, 0, 800, 400);
  }

  dibujarPantallaVictoria() {
    imageMode(CORNER);
    image(imgVictoria, 0, 0, 800, 400);
  }

  dibujarPantallaMuerte() {
    imageMode(CORNER);
    image(imgDerrota, 0, 0, 800, 400);
  }
// dibuja las entidades 
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
    text("Vida: " + this.personaje.cantidadVida, 15, 30);

    textAlign(RIGHT);
    text("Murciélagos: " + this.muertos + " / 50", 785, 30);

    textAlign(LEFT);
  }
}
