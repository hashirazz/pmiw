function cargarRecursos() {
  fondo = loadImage("data/fondo.png");
  arbolesFondo = loadImage("data/arboles_fondo_largo.png");
  arbolesCerca = loadImage("data/arboles_cerca_largo.png");
  piso = loadImage("data/piso_largo.png");

  for (let i = 1; i <= 11; i++) lobo_idle[i - 1] = loadImage("data/lobo_" + i + ".png");
  for (let i = 1; i <= 5; i++) lobo_corre[i - 1] = loadImage("data/lobo_corre_" + i + ".png");
  for (let i = 1; i <= 6; i++) fan_entra[i - 1] = loadImage("data/fan_entra_" + i + ".png");
  for (let i = 1; i <= 7; i++) fan_neutral[i - 1] = loadImage("data/fan_neutral_" + i + ".png");
  for (let i = 1; i <= 4; i++) fan_acoso[i - 1] = loadImage("data/fan_acoso_" + i + ".png");
  for (let i = 1; i <= 7; i++) fan_sale[i - 1] = loadImage("data/fan_sale_" + i + ".png");
  
  }
