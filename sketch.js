let textura;
let texturaFigura;
let figuras = [];
let indiceFiguras = 0;
let maxFiguras = 30; // cantidad max de figuras
let cantFiguras = 0;
let bandera = false; //detecta mouse
let figuraActual = null; // figura actual
let imgPaleta;
let paleta;
let radInicial = 30;
let radMax = 200;

function setup() {
  createCanvas(windowHeight / 1.5, windowHeight, WEBGL);
  paleta = new Paleta(imgPaleta);
  Figura.estado = "inicial"; // Estado inicial por defecto
}

function draw() {
  background(200);
  noStroke();

  push();
  //blendMode(MULTIPLY); //modo de fusion lienzo y figuras
  tint(255, 100); // color de lienzo
  image(textura, -width, -height, width * 2, height * 2); //imagen lienzo
  pop();

  for (let i = 0; i < figuras.length; i++) {
    //leer array
    figuras[i].show(); //mostrar las figuras
  }
  if (figuraActual) {
    figuraActual.show(); // mostrar figura actual en proceso
  }

  push();

  pop();
}

rightClick(); // Desactiva el click derecho
