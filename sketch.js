let textura; // Variable para la textura de fondo
let texturaFigura; // Variable para la textura de las figuras
let figuras = []; // Array que almacena todas las figuras fijas
let indiceFiguras = Figura.count; // Contador del número de figuras creadas
let maxFiguras = 40; // Cantidad máxima de figuras permitidas
let figuraActual = null; // Referencia a la figura que está en crecimiento
let imgPaleta; // Imagen para la paleta de colores
let paleta; // Objeto de la clase Paleta
let radInicial = 30; // Radio inicial de las figuras
let radMax = 500; // Radio máximo de las figuras

function setup() {
  createCanvas(windowHeight / 1.5, windowHeight, WEBGL); // Crea el lienzo
  paleta = new Paleta(imgPaleta); // Inicializa la paleta de colores
}

function draw() {
  background(220, 200, 180);
  noStroke();

  // Dibujar textura de fondo con transparencia
  push();
  tint(255, 150); // Transparencia del lienzo
  image(textura, -width / 2, -height / 2, width, height); // Imagen de fondo
  pop();

  // Mostrar todas las figuras fijas del array
  for (let i = 0; i < figuras.length; i++) {
    figuras[i].show();
  }

  // Mostrar la figura actual en proceso de crecimiento
  if (figuraActual) {
    figuraActual.show();
    // Si la figura actual alcanza el radio máximo, se fija
    if (figuraActual.radio >= radMax) {
      fijarFiguraActual();
    }
  }
}

rightClick(); // Desactiva el click derecho
