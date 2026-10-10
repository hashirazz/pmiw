function cargarImagenes() { 
  for (let i = 0; i < TOTAL_PANTALLAS; i++) {
    imagenes[i] = loadImage("data/pantalla" + i + ".png");
  }
}

function cargarHistoria() { 
  cargarIntroduccion();
  cargarRutaJungla();
  cargarRutaCueva();
  cargarRutaRio();
  cargarFinales();
}

// que pantalla es, a dónde lleva cada botón y dónde está cada zona
function definirPantalla(numero, listaDestinos, listaZonas) {
  destinos[numero] = listaDestinos;
  zonas[numero] = listaZonas;
}

function cargarIntroduccion() { //pantallas de 0 a 3
  definirPantalla(0, [1, PANTALLA_CREDITOS], [
    [210, 115, 380, 40],                  // "EMPEZAR AVENTURA"
    BOTON_CREDITOS
  ]);

  definirPantalla(1, [2], [
    [661, 118, 119, 227]                  // puerta
  ]);

  definirPantalla(2, [3], [
    [243, 302, 193, 144]                  // pergamino
  ]);

  definirPantalla(3, [4, 14, 10], [
    [214, 234, 121, 145],                 // la jungla
    [448, 261, 66, 99],                   // el rio
    [514, 249, 112, 122]                  // la cueva
  ]);
}

function cargarRutaJungla() { // pantallas de 4 a 7
  definirPantalla(4, [5], [
    [733, 126, 67, 197]                   // derecha de la pantalla
  ]);

  definirPantalla(5, [6], [
    [476, 292, 200, 72, "elipse"]         // escorpion
  ]);

  definirPantalla(6, [7, 8], [
    [530, 0, 32, 314],                    // liana
    [161, 169, 113, 250]                  // vacio
  ]);

  definirPantalla(7, [9], [
    [643, 212, 127, 64, "elipse"]         // borde del acantilado
  ]);
}

function cargarRutaCueva() { // pantallas de 10 a 13

  definirPantalla(10, [11, 12], [
    [32, 48, 110, 75],                    // cartel tunel principal
    [409, 81, 115, 64]                    // cartel bifurcacion
  ]);

  definirPantalla(11, [8], [
    [326, 300, 282, 182, "elipse"]        // harry
  ]);

  definirPantalla(12, [13], [
    [490, 191, 82, 82, "elipse"]          // fondo del tunel
  ]);

  definirPantalla(13, [9], [
    [594, 216, 211, 177, "elipse"]        // fogata
  ]);
}

function cargarRutaRio() { //pantallas de 14 a 23
  definirPantalla(14, [15], [
    [236, 126, 98, 162]                   // cascada
  ]);

  definirPantalla(15, [16], [
    [322, 68, 72, 92]                     // cueva
  ]);

  definirPantalla(16, [17, 19], [
    [349, 184, 237, 170],                 // camino de madera
    [191, 0, 24, 184]                     // cadena
  ]);

  definirPantalla(17, [18], [
    [719, 103, 36, 32]                    // cofre
  ]);

  definirPantalla(18, [8], [
    [404, 306, 258, 110]                  // jaula
  ]);

  definirPantalla(19, [20], [
    [113, 114, 34, 34]                    // pergamino
  ]);

  definirPantalla(20, [21, 22], [
    [144, 201, 124, 172, "elipse"],       // cueva
    [629, 172, 170, 159, "elipse"]        // rayo
  ]);

  definirPantalla(21, [9], [
    [7, 297, 285, 95]                     // cama
  ]);

  definirPantalla(22, [23], [
    [663, 196, 79, 38]                    // refugio
  ]);

  definirPantalla(23, [24], [
    [354, 191, 144, 124, "elipse"]        // cuchillo y jaguar
  ]);
}
//finales con su boton de credito
function cargarFinales() { 
  definirPantalla(8, [PANTALLA_CREDITOS], [BOTON_CREDITOS]);
  definirPantalla(9, [PANTALLA_CREDITOS], [BOTON_CREDITOS]);
  definirPantalla(24, [PANTALLA_CREDITOS], [BOTON_CREDITOS]);
}

//animacion
function cargarSprites() {
  for (let i = 1; i <= TOTAL_SPRITES; i++) {
    antorcha[i - 1] = loadImage("data/antorcha_" + i + ".png");
    hombre[i - 1] = loadImage("data/hombre_" + i + ".png");
    liana[i - 1] = loadImage("data/liana_" + i + ".png");
  }
}
//musica 
function cargarSonido() {
  sonido = createAudio("data/sonido.mp3");
  sonido.hide(); 
}
