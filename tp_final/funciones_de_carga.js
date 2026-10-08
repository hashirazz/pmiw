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
}

// que pantalla es, a dónde lleva cada botón y dónde está cada zona
function definirPantalla(numero, listaDestinos, listaZonas) {
  destinos[numero] = listaDestinos;
  zonas[numero] = listaZonas;
}

function cargarIntroduccion() { //pantallas de 0 a 3
  definirPantalla(0, [1], [
    [210, 115, 380, 40]                                  
  ]);

  definirPantalla(1, [2], [
    [661, 118, 779, 122, 780, 345, 664, 303]             
  ]);

  definirPantalla(2, [3], [
    [251, 302, 436, 354, 398, 446, 243, 390]             
  ]);

  definirPantalla(3, [4, 14, 10], [
    [229, 234, 331, 239, 335, 355, 214, 379],            
    [448, 261, 512, 265, 514, 351, 451, 360],            
    [514, 263, 618, 249, 626, 371, 516, 355]             
  ]);
}

function cargarRutaJungla() { // pantallas de 4 a 7
  definirPantalla(4, [5], [
    [733, 126, 67, 197]                                 
  ]);

  definirPantalla(5, [6], [
    [476, 292, 200, 72, "elipse"]                        
  ]);

  definirPantalla(6, [7, 8], [
    [530, 0, 562, 0, 559, 314, 531, 314],               
    [161, 169, 274, 241, 270, 330, 181, 419]             
  ]);

  definirPantalla(7, [9], [
    [643, 212, 127, 64, "elipse"]                     
  ]);
}

function cargarRutaCueva() { // pantallas de 10 a 13

  definirPantalla(10, [11, 12], [
    [32, 51, 140, 48, 142, 117, 35, 123],                
    [409, 95, 520, 81, 524, 129, 413, 145]               
  ]);

  definirPantalla(11, [8], [
    [326, 300, 282, 182, "elipse"]                     
  ]);

  definirPantalla(12, [13], [
    [490, 191, 82, 82, "elipse"]                         
  ]);

  definirPantalla(13, [9], [
    [594, 216, 211, 177, "elipse"]                  
  ]);
}

function cargarRutaRio() { //pantallas de 14 a 23
  definirPantalla(14, [15], [
    [241, 126, 319, 131, 334, 288, 236, 288]           
  ]);

  definirPantalla(15, [16], [
    [330, 68, 388, 70, 394, 160, 322, 160]               
  ]);

  definirPantalla(16, [17, 19], [
    [349, 330, 449, 222, 586, 184, 416, 354],            
    [191, 0, 24, 184]                                    
  ]);

  definirPantalla(17, [18], [
    [719, 103, 36, 32]                                 
  ]);

  definirPantalla(18, [8], [
    [404, 311, 662, 306, 636, 416, 404, 402]             
  ]);

  definirPantalla(19, [20], [
    [113, 114, 34, 34]                           
  ]);

  definirPantalla(20, [21, 22], [
    [144, 201, 124, 172, "elipse"],                    
    [629, 172, 170, 159, "elipse"]                     
  ]);


  definirPantalla(21, [9], [
    [7, 297, 163, 323, 292, 385, 19, 392]                
  ]);

  definirPantalla(22, [23], [
    [663, 196, 79, 38]                                  
  ]);

  definirPantalla(23, [24], [
    [354, 191, 144, 124, "elipse"]                       
  ]);
}
