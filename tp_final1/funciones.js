//pantallas, animacion, reinicio y creditos 
function mostrarPantalla(numero) {
  if (numero === PANTALLA_CREDITOS) {
    dibujarCreditos();
  } else {
    image(imagenes[numero], 0, 0, width, height);
  }

  if (numero === 0) {
    dibujarAnimacionesInicio();
  }

  if (hayBotonReiniciar(numero)) {
    dibujarBoton(BOTON_REINICIAR, "Reiniciar");
  }

  if (hayBotonCreditos(numero)) {
    dibujarBoton(BOTON_CREDITOS, "Créditos");
  }
// cursor 
  if (mouseSobreAlgunBoton(numero)) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

// pantalla de créditos: fondo negro con los nombres
function dibujarCreditos() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(26);
  text("Hecho por: Fiorella Brangeri y Santino Carrillo\nObra por: David Crane", 50, 0, width - 100, height);
}

// dibuja un botón con texto; se pone rojo al pasar el mouse
function dibujarBoton(zona, texto) {
  let [x, y, w, h] = zona;
  let encima = mouseSobreZona(zona);

  noStroke();
  if (encima) {
    fill(200, 40, 40, 220);
  } else {
    fill(0, 0, 0, 170);
  }
  rect(x, y, w, h, 8);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(texto, x + w / 2, y + h / 2);
}

function irAPantalla(numero) { 
  pantallaActual = numero;
}

// reinicias desde el principio
function reiniciar() {
  irAPantalla(0);
}

// el botón de reinicio esta en todas las pantallas menos la 0 
function hayBotonReiniciar(numero) {
  return numero !== 0;
}

// guarda las zonas de cada pantalla y detecta si el mouse esta sobre alguna 
function zonaBajoElMouse(numero) {
  let zonasPantalla = zonas[numero];
  if (!zonasPantalla) return -1; 

  for (let j = 0; j < zonasPantalla.length; j++) {
    if (mouseSobreZona(zonasPantalla[j])) {
      return j;
    }
  }
  return -1;
}

// detecta si el mouse está sobre algún botón de la pantalla 
function mouseSobreAlgunBoton(numero) {
  if (hayBotonReiniciar(numero) && mouseSobreZona(BOTON_REINICIAR)) {
    return true;
  }
  return zonaBajoElMouse(numero) !== -1;
}

// marca si el mouse está dentro de una zona, según su formato
function mouseSobreZona(zona) {
  if (zona.length === 5) return mouseSobreElipse(zona[0], zona[1], zona[2], zona[3]);
  return mouseSobreRect(zona[0], zona[1], zona[2], zona[3]);
}

// detecta si estas sobre un rect
function mouseSobreRect(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

// detecta si estas sobre una ellipse 
function mouseSobreElipse(cx, cy, w, h) {
  let dx = (mouseX - cx) / (w / 2);
  let dy = (mouseY - cy) / (h / 2);
  return dx * dx + dy * dy <= 1;
}

// establece las pantallas donde hay boton de credito
function hayBotonCreditos(numero) {
  return numero === 0 || numero === 8 || numero === 9 || numero === 24;
}

//animación
function dibujarAnimacion(sprites, x, y, alto) {
  let indice = floor(frameCount / VELOCIDAD_ANIMACION) % sprites.length;
  let sprite = sprites[indice];
  
  // mantiene la proporción
  let ancho = alto * sprite.width / sprite.height; 
  image(sprite, x - ancho / 2, y - alto, ancho, alto);
}

// ubicacion de las animaciones 
function dibujarAnimacionesInicio() {
  dibujarAnimacion(antorcha, 60, 205, 105);   
  dibujarAnimacion(hombre, 206, 339, 125);    
  dibujarAnimacion(liana, 697, 185, 160);    
}

// arranca la música en bucle al hacer click 
function iniciarSonido() {
  if (sonido && sonido.elt.paused) {
    sonido.loop();
  }
}
