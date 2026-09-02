


// calcula que frame toca mostrar según el tiempo que pasó, la velocidad y hace que la animación vuelva a empezar sola cuando llega al final 
// (la animacion de cada accion, no la animacion en general)
// le agregue que reste el inicio asi cuando lo reinicio arranca desde el frame 0
function obtenerFrameActual(cantidadFrames, velocidad, inicio) {
  let indice = floor((frameCount - inicio) / velocidad) % cantidadFrames;
  return indice;
}

// REINICIO 
function keyPressed() {
  if (key == 'r') {
    loboX = -100;
    estadoLobo = "entra";
    inicioFrameLobo = frameCount; 

    fanX = 950;
    estadoFan = "espera";
    inicioFrameFan = frameCount; 
  }
}
