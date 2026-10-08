// "pantallas"

function mostrarPantalla(numero) { //dibuja la imagen, el botón "Reiniciar" y cambia el cursor
  image(imagenes[numero], 0, 0, width, height);

  if (MOSTRAR_ZONAS) {
    dibujarContornos(numero);
  }

  if (hayBotonReiniciar(numero)) {
    dibujarBotonReiniciar();
  }

  if (mouseSobreAlgunBoton(numero)) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}
// ESTO ESTA DE MAS (? Pregunta: dejar contornos o solo dejar que el cursor se active arriba de la zona
function dibujarContornos(numero) { // dibuja el borde rojo de las zonas (solo para ubicarlas)
  if (!zonas[numero]) return;

  noFill();
  stroke(255, 0, 0);
  for (let j = 0; j < zonas[numero].length; j++) {
    dibujarZona(zonas[numero][j]);
  }
}

// tipos de zona para el boton
function dibujarZona(zona) { // dibuja una zona como elipse, rectángulo o cuad
  if (zona.length === 5) {
    ellipse(zona[0], zona[1], zona[2], zona[3]);
  } else if (zona.length === 4) {
    rect(zona[0], zona[1], zona[2], zona[3]);
  } else {
    quad(zona[0], zona[1], zona[2], zona[3], zona[4], zona[5], zona[6], zona[7]);
  }
}

function dibujarBotonReiniciar() { //boton "Reiniciar" que se pone rojo al pasar el mouse
  let [x, y, w, h] = BOTON_REINICIAR;
  let encima = mouseSobreZona(BOTON_REINICIAR);

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
  text("Reiniciar", x + w / 2, y + h / 2);
}

function irAPantalla(numero) { // cambia a la pantalla indicada
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

// si no estas con el mouse sobre el boton no avanzas 
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

// marca si el mouse está sobre un botón de la pantalla 
function mouseSobreAlgunBoton(numero) {
  if (hayBotonReiniciar(numero) && mouseSobreZona(BOTON_REINICIAR)) {
    return true;
  }
  return zonaBajoElMouse(numero) !== -1;
}

// marca si el mouse está dentro de una zona, según su formato
function mouseSobreZona(zona) {
  if (zona.length === 5) return mouseSobreElipse(zona[0], zona[1], zona[2], zona[3]);
  if (zona.length === 4) return mouseSobreRect(zona[0], zona[1], zona[2], zona[3]);
  return mouseSobreQuad(zona);
}

function mouseSobreRect(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function mouseSobreElipse(cx, cy, w, h) {
  let dx = (mouseX - cx) / (w / 2);
  let dy = (mouseY - cy) / (h / 2);
  return dx * dx + dy * dy <= 1;
}

// dice si el mouse está dentro de un cuadrilátero inclinado
function mouseSobreQuad(puntos) {
  let hayPositivo = false;
  let hayNegativo = false;

  for (let k = 0; k < 4; k++) {
    let ax = puntos[k * 2];
    let ay = puntos[k * 2 + 1];
    let bx = puntos[((k + 1) % 4) * 2];
    let by = puntos[((k + 1) % 4) * 2 + 1];
    let cruz = (bx - ax) * (mouseY - ay) - (by - ay) * (mouseX - ax);

    if (cruz > 0) hayPositivo = true;
    if (cruz < 0) hayNegativo = true;
  }

  // Si el mouse quedó de un lado en unos bordes y del otro en otros, está afuera
  if (hayPositivo && hayNegativo) {
    return false;
  }
  return true;
}
