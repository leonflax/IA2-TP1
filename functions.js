function preload() {
  textura = loadImage("img/textures/canvas_texture.jpg"); // Textura de fondo
  texturaFigura = loadImage("img/textures/figura_texture.jpg"); // Textura de figura
  imgPaleta = loadImage("img/soniasaturado.jpg"); // Referencia de paleta (Cambiar para otra paleta)
}

function windowResized() {
  resizeCanvas(windowHeight / 1.5, windowHeight); // Tamaño de lienzo responsive
}

function mouseClicked() {
  if (indiceFiguras < maxFiguras) {
    if (figuraActual) {
      // Si hay una figura en crecimiento, la fijamos
      fijarFiguraActual();
    } else {
      // Si no hay una figura en crecimiento, creamos una nueva
      let posY = random(-height / 2 + 90, height / 2 - 90); // no superan margen del lienzo
      let radInicial = 30; // radio inicial
      let rotacion = Math.round(random());
      let colorFigura = [];
      let cantFiguras = int(random(6) + 3);
      for (let i = 0; i < cantFiguras; i++) {
        colorFigura.push(paleta.darColor());
      }

      figuraActual = new Figura(posY, radInicial, rotacion, colorFigura, cantFiguras); // Crea una nueva figura
      figuraActual.estado = 'creciente';
    }
  }
}

// Desactiva el click derecho
function rightClick() {
  document.oncontextmenu = function () {
    return false;
  };
}