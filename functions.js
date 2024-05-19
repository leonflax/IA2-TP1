function preload() {
  // Carga las imágenes antes de iniciar el programa
  textura = loadImage("img/textures/canvas_texture.jpg"); // Textura de fondo
  texturaFigura = loadImage("img/textures/figura_texture.jpg"); // Textura de figura
  imgPaleta = loadImage("img/sonia1.jpg"); // Imagen de referencia para la paleta de colores
}

function windowResized() {
  resizeCanvas(windowHeight / 1.5, windowHeight); // Ajusta el tamaño del lienzo cuando se redimensiona la ventana
}

function mouseClicked() {
  if (indiceFiguras < maxFiguras) { // Verifica si el número de figuras es menor al máximo permitido
    if (figuraActual) {
      // Si hay una figura en crecimiento, la fija
      fijarFiguraActual();
    } else {
      // Si no hay una figura en crecimiento, crea una nueva
      let posY = random(-height / 2 + 90, height / 2 - 90); // Posición Y aleatoria dentro de los márgenes
      let rotacion = Math.round(random()); // Rotación aleatoria (0 o 1)
      let colorFigura = []; // Array para almacenar los colores de la figura
      let cantFiguras = int(random(6) + 3); // Número aleatorio de subfiguras (entre 3 y 8)
      
      // Genera los colores para la figura
      for (let i = 0; i < cantFiguras; i++) {
        colorFigura.push(paleta.darColor());
      }

      // Crea una nueva figura en estado creciente
      figuraActual = new Figura(posY, radInicial, rotacion, colorFigura, cantFiguras);
      figuraActual.estado = 'creciente';
    }
  }
}

function fijarFiguraActual() {
  figuraActual.estado = 'fijo'; // Cambia el estado de la figura a 'fijo'
  figuras.push(figuraActual); // Añade la figura actual al array de figuras fijas
  figuraActual = null; // Resetea la figura actual
  indiceFiguras++; // Incrementa el contador de figuras
}

// Desactiva el clic derecho
function rightClick() {
  document.oncontextmenu = function () {
    return false;
  };
}
