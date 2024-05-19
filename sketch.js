let textura;
let texturaFigura;
let figuras = [];
let indiceFiguras = 0;
let maxFiguras = 30; // cantidad max de figuras
let figuraActual = null; // figura actual
let imgPaleta;
let paleta;
let radInicial = 30;
let radMax = 350;

function setup() {
  createCanvas(windowHeight / 1.5, windowHeight, WEBGL);
  paleta = new Paleta(imgPaleta);
}

function draw() {
  background(200);
  noStroke();

  push();
  tint(255, 100); // color de lienzo
  image(textura, -width, -height, width * 2, height * 2); // imagen lienzo
  pop();

  // Mostrar todas las figuras en el array
  for (let i = 0; i < figuras.length; i++) {
    figuras[i].show();
  }

  // Mostrar la figura actual en proceso de crecimiento
  if (figuraActual) {
    figuraActual.show();
    if (figuraActual.radio >= radMax) {
      fijarFiguraActual();
    }
  }
}

function fijarFiguraActual() {
  figuraActual.estado = 'fijo';
  figuras.push(figuraActual);
  figuraActual = null;
  indiceFiguras++;
}

rightClick(); // Desactiva el click derecho
