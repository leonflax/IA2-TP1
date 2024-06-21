let textura; // Variable para la textura de fondo
let texturaFigura; // Variable para la textura de las figuras
let figuras = []; // Array que almacena todas las figuras fijas
let indiceFiguras = 0; // Contador del número de figuras creadas
let maxFiguras = 30; // Cantidad máxima de figuras permitidas
let figuraActual = null; // Referencia a la figura que está en crecimiento
let imgPaleta; // Imagen para la paleta de colores
let paleta; // Objeto de la clase Paleta
let radInicial = 30; // Radio inicial de las figuras
let radMaxCirculo = 600; // Radio máximo de las figuras
let radMaxSemi = 1000; // Radio máximo de las figuras
let posicionesY = []; // Array para almacenar las posiciones Y ocupadas

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let mic;
let pitch;
let audioContext;
let umbral_sonido = 0.03;
let antesHabiaSonido;
let estado = "escucha";

function setup() {
  createCanvas(windowHeight / 1.5, windowHeight, WEBGL); // Crea el lienzo
  paleta = new Paleta(imgPaleta); // Inicializa la paleta de colores

  //inicializo la escucha de sonido
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  //acá le pido que llame a startPitch
  mic.start(startPitch);

  userStartAudio();

  gestorAmp = new GestorSenial(0.05, 0.5);
  gestorPitch = new GestorSenial(40, 80);

}

function draw() {
  background(220, 200, 180);
  noStroke();

  // Dibujar textura de fondo con transparencia
  push();
  tint(255, 150); // Transparencia del lienzo
  image(textura, -width / 2, -height / 2, width, height); // Imagen de fondo
  pop();

  //acá capturo la intesidad(volumen) del sonido
  let vol = mic.getLevel();
  //la paso al gestor
  gestorAmp.actualizar(vol);

  //si la intensidad supera un umbral, entonces ha sonido
  let haySonido = gestorAmp.filtrada > umbral_sonido;

  let empezoElSonido = haySonido && !antesHabiaSonido;
  let terminoElSonido = !haySonido && antesHabiaSonido;

  if (empezoElSonido) {
    marcaInicial = millis();
  }

  if (estado === "escucha") {

    if (haySonido) {
      if (millis() > marcaInicial + duracionSonidosCortos) {
        estado = "largo";
        xActual = random(width);
        yActual = random(height);
        actualizarColor(random(0, 1));
        diam = 20;
      }
    }
    if (terminoElSonido) {
      if (millis() < marcaInicial + duracionSonidosCortos) {
        estado = "corto";
      }
    }

  } else if (estado === "largo") {
    imagenFrente.clear();
    imagenFrente.push();
    actualizarColor(gestorPitch.filtrada);
    imagenFrente.fill(colorActual);
    imagenFrente.ellipse(xActual, yActual, diam, diam);
    diam += 3;
    imagenFrente.pop();

    if (terminoElSonido) {
      imagenFondo.imageMode(CORNER);
      imagenFondo.image(imagenFrente, 0, 0);
      estado = "escucha";
    }
  } else if (estado === "corto") {
    dibujarBanda();
    estado = "escucha";
  }

  // Mostrar todas las figuras fijas del array
  for (let i = 0; i < figuras.length; i++) {
    figuras[i].show();
  }

  // Mostrar la figura actual en proceso de crecimiento
  if (figuraActual) {
    figuraActual.show();
    // Si la figura actual alcanza el radio máximo, se fija segun el tipo de figura
    if (figuraActual.tipo === 'circulo') {
      if (figuraActual.radio >= radMaxCirculo) {
        fijarFiguraActual();
      }
    } else if (figuraActual.tipo === 'semicirculo') {
      if (figuraActual.radio >= radMaxSemi) {
        fijarFiguraActual();
      }
    }
  }

  antesHabiaSonido = haySonido;
}

rightClick(); // Desactiva el click derecho