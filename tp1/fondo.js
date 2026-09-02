// dibuja el cielo fijo y las 3 capas del parallax
// el fondo solo se mueve mientras el lobo está corriendo (entra o huye)
function dibujarFondo() {
  image(fondo, 0, 0, 800, 600);
  dibujarCapaMovil(arbolesFondo, desplazArbolesFondo);
  dibujarCapaMovil(arbolesCerca, desplazArbolesCerca);
  dibujarCapaMovil(piso, desplazPiso);

  if (estadoLobo == "entra" || estadoLobo == "huye") {
    desplazArbolesFondo -= velArbolesFondo;
    desplazArbolesCerca -= velArbolesCerca;
    desplazPiso -= velPiso;
  }
}


// dibuja una capa larga escalada al alto del canvas 
// usé una imagen larga y ademas se repite para que no hayan cortes todo el rato
function dibujarCapaMovil(img, desplaz) {
  let escala = 600 / img.height;
  let anchoEscalado = img.width * escala;
  let x = desplaz % anchoEscalado;
  image(img, x, 0, anchoEscalado, 600);
  image(img, x + anchoEscalado, 0, anchoEscalado, 600);
}
