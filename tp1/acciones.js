
// LOBO
// maquina de estados
// espera quieto (idle) y si el fantasma lo persigue, huye corriendo de vuelta

function actualizarLobo() {
  if (estadoLobo == "entra") {
    let i = obtenerFrameActual(lobo_corre.length, 7, inicioFrameLobo);
    dibujarMirandoDerecha(lobo_corre[i], loboX, loboY, anchoLobo, altoLobo);

    loboX += 3;
    if (loboX >= loboMetaX) {
      estadoLobo = "idle1";
      inicioFrameLobo = frameCount; 
      tiempoInicioLoboIdle = millis();
    }
  }
  else if (estadoLobo == "idle1") {
    let i = obtenerFrameActual(lobo_idle.length, 8, inicioFrameLobo);
    dibujarMirandoDerecha(lobo_idle[i], loboX, loboY, anchoLobo, altoLobo);

    if (estadoFan == "persigue") {
      estadoLobo = "huye";
      inicioFrameLobo = frameCount; 
    }
  }
  else if (estadoLobo == "huye") {
    let i = obtenerFrameActual(lobo_corre.length, 5, inicioFrameLobo);
    image(lobo_corre[i], loboX, loboY, anchoLobo, altoLobo);

    loboX -= 4;
    if (loboX < -150) {
      estadoLobo = "listo";
    }
  }
}

function dibujarMirandoDerecha(img, x, y, ancho, alto) {
  push();
  translate(x + ancho, y);
  scale(-1, 1);
  image(img, 0, 0, ancho, alto);
  pop();
}

// FANTASMA
// maquina de estados del fantasma
// espera a que el lobo este quieto, entra desde la derecha, lo persigue, se queda un momento en idle (neutral) y a lo ultimo desaparece

function actualizarFan() {
  if (estadoFan == "espera" && estadoLobo == "idle1" && millis() - tiempoInicioLoboIdle > 1500) {
    estadoFan = "entra";
    inicioFrameFan = frameCount; 
  }

  if (estadoFan == "entra") {
    let i = obtenerFrameActual(fan_entra.length, 7, inicioFrameFan);
    image(fan_entra[i], fanX, fanY, anchoFan, altoFan);

    fanX -= 2;
    if (fanX <= fanMetaX) {
      estadoFan = "persigue";
      inicioFrameFan = frameCount; 
    }
  }
  else if (estadoFan == "persigue") {
    let i = obtenerFrameActual(fan_acoso.length, 6, inicioFrameFan);
    image(fan_acoso[i], fanX, fanY, anchoFan, altoFan);

    fanX -= 3;
    if (fanX <= 300) {
      estadoFan = "idle2";
      inicioFrameFan = frameCount; 
      tiempoInicioFanIdle = millis();
    }
  }
  else if (estadoFan == "idle2") {
    let i = obtenerFrameActual(fan_neutral.length, 10, inicioFrameFan);
    image(fan_neutral[i], fanX, fanY, anchoFan, altoFan);

    if (millis() - tiempoInicioFanIdle > 2000) {
      estadoFan = "sale";
      inicioFrameFan = frameCount;
    }
  }
  else if (estadoFan == "sale") {
    let i = obtenerFrameActual(fan_sale.length, 8, inicioFrameFan);
    image(fan_sale[i], fanX, fanY, anchoFan, altoFan);

    if (i == fan_sale.length - 1) {
      estadoFan = "listo";
    }
  }
}
