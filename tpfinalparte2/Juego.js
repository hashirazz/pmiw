class Juego {
  constructor() {
    this.personaje = new Personaje();
    this.piedras = [];
    this.murcielagos = [];
    this.agregarMurcielagos(8);
    this.cantidadMurcielagos = 8;
    this.muertos = 0;
    this.estado = "inicio";   // "inicio", "jugando", "gano" o "perdio"
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
// establece las pautas para ganar o perder (y frena la musica al terminar)
  revisarFinal() {
    if (this.personaje.estaVivo === false) {
      this.estado = "perdio";
      musica.stop();
    } else if (this.muertos >= 50) {
      this.estado = "gano";
      musica.stop();
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

  // en la pantalla de inicio revisa el boton JUGAR; jugando mata al primer murcielago vivo que se clickea, asi no matas dos de un solo click
  clickEn(x, y) {
    if (this.estado === "inicio") {
      if (x > 300 && x < 500 && y > 300 && y < 360) {
        this.estado = "jugando";
        iniciarSonido();
      }
      return;
    }

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
    if (this.estado === "inicio") {
      this.dibujarPantallaInicio();
    } else if (this.personaje.estaVivo === false) {
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

  dibujarPantallaInicio() {
    imageMode(CORNER);
    image(imgFondo, 0, 0, 800, 400);

    // bloque de instrucciones
    fill(0, 180);
    noStroke();
    rect(100, 40, 600, 230, 15);

    fill(255);
    textAlign(CENTER);
    textSize(28);
    text("CONTROLES", 400, 85);

    textSize(18);
    text("Derecha: D     Izquierda: A     Salto: ESPACIO", 400, 130);
    text("Tu objetivo es matar 50 murciélagos antes de morir,", 400, 180);
    text("utilizando el click para disparar.", 400, 210);

    // boton jugar
    let encima = mouseX > 300 && mouseX < 500 && mouseY > 300 && mouseY < 360;
    fill(encima ? color(220, 60, 60) : color(160, 30, 30));
    rect(300, 300, 200, 60, 10);

    fill(255);
    textSize(26);
    text("JUGAR", 400, 340);

    textAlign(LEFT);
  }

  dibujarPantallaVictoria() {
    imageMode(CORNER);
    image(imgVictoria, 0, 0, 800, 400);
    this.dibujarCreditos();
  }

  dibujarPantallaMuerte() {
    imageMode(CORNER);
    image(imgDerrota, 0, 0, 800, 400);
    this.dibujarCreditos();
  }

  // creditos (se usan en victoria y derrota)
  dibujarCreditos() {
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(20);
    text("Créditos", 400, 325);
    textSize(16);
    text("Fiorella Brangeri - Legajo: 125528/0", 400, 355);
    text("Santino Carrillo - Legajo: 127527/7", 400, 380);
    textAlign(LEFT);
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
