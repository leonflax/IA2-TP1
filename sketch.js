let textura; // textura de fondo
let texturaFigura; // textura de las figuras
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
let antesHabiaSonido; // Esta variable puede no ser necesaria si antesHabiaSonido se inicializa dentro de la función draw()
let estado = "escucha";

let pitchFrequency = 0; // almacena la frecuencia del pitch

function setup() {
  createCanvas(windowHeight / 1.5, windowHeight, WEBGL); // Crea el lienzo
  paleta = new Paleta(imgPaleta); // Inicializa la paleta de colores

  // Inicializa la escucha de sonido
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
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

  // Capturar la intensidad (volumen) del sonido
  let vol = mic.getLevel();
  // Pasar el volumen al gestor
  gestorAmp.actualizar(vol); 

  // Determinar si hay sonido según el umbral
  let haySonido = gestorAmp.filtrada > umbral_sonido;

  let empezoElSonido = haySonido && !antesHabiaSonido;
  // let terminoElSonido = !haySonido && antesHabiaSonido;

  if (empezoElSonido && indiceFiguras < maxFiguras) {
    // Si empieza el sonido y aún no se ha alcanzado el máximo de figuras
    crearNuevaFigura();
  }

  // Mostrar todas las figuras fijas del array
  for (let i = 0; i < figuras.length; i++) {
    figuras[i].show();
  }

  // Mostrar y actualizar la figura actual en proceso de crecimiento
  if (figuraActual) {
    figuraActual.show();
    if (haySonido) {
      figuraActual.estado = 'creciente';
      // Actualizar la posición Y según el pitch actualizado
      let targetY = map(pitchFrequency, 70, 250, height / 2 - 100, -height / 2 + 100);
      figuraActual.y += (targetY - figuraActual.y) * 0.2; // Factor de suavizado

    } else {
      figuraActual.estado = 'fijo';
      fijarFiguraActual();
    }
    // Si la figura actual alcanza el radio máximo, se fija según el tipo de figura
    if (figuraActual && figuraActual.tipo === 'circulo' && figuraActual.radio >= radMaxCirculo) {
      fijarFiguraActual();
    } else if (figuraActual && figuraActual.tipo === 'semicirculo' && figuraActual.radio >= radMaxSemi) {
      fijarFiguraActual();
    }
  } 

  antesHabiaSonido = haySonido;
}
