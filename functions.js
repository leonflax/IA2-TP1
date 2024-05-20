function preload() {
  // Carga las imágenes antes de iniciar el programa
  textura = loadImage("img/textures/canvas_texture.jpg"); // Textura de fondo
  texturaFigura = loadImage("img/textures/textura2.jpeg"); // Textura de figura
  imgPaleta = loadImage("img/saturado.jpg"); // Imagen de referencia para la paleta de colores
}

function windowResized() {
  resizeCanvas(windowHeight / 1.5, windowHeight); // Ajusta el tamaño del lienzo cuando se redimensiona la ventana
}

function mouseClicked() {
  if (indiceFiguras < maxFiguras) { // Verifica si el número de figuras es menor al máximo permitido
    if (figuraActual) {
      fijarFiguraActual();
    } else {
      let posY = random(-height / 2 + 90, height / 2 - 90);
      let rotacion = Math.round(random());
      let colorFigura = [];
      let cantFiguras = int(random(6) + 3);
//si la posicion de x es centrada o no segun la cantidad de figuras
      let posX;
      if (indiceFiguras > 5) {
        if (indiceFiguras % 2 === 0) {
          posX = random(width / 2 + 100, width - 100);
        } else {
          posX = random(-width / 2 + 100, -100);
        }
      } else {
        posX = random(-width / 2 + 100, width / 2 - 100);
      }
// color de figura 
      for (let i = 0; i < cantFiguras; i++) {
        if (indiceFiguras < 10) {
          colorFigura.push(color(random(50, 300)));
        } else {
          colorFigura.push(paleta.darColor());
        }
      }

      figuraActual = new Figura(posX, posY, radInicial, rotacion, colorFigura, cantFiguras);
      figuraActual.estado = 'creciente';
      // Agrega la posición Y al array de posiciones ocupadas
      posicionesY.push(posY);
    }
  }
}

function fijarFiguraActual() {
  figuraActual.estado = 'fijo';
  figuras.push(figuraActual);
  figuraActual = null;
  indiceFiguras++;
  // Borra las posiciones Y ocupadas cuando se fija una figura
  posicionesY = [];
}

// Desactiva el clic derecho
function rightClick() {
  document.oncontextmenu = function () {
    return false;
  };
}