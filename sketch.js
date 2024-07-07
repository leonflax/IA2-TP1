let textura; // textura de fondo
let texturaFigura; // textura de las figuras
let figuras = []; // Array que almacena todas las figuras fijas
let indiceFiguras = 0; // Contador del número de figuras creadas
let maxFiguras = 300; // Cantidad máxima de figuras permitidas
let figuraActual = null; // Referencia a la figura que está en crecimiento
let imgPaleta; // Imagen para la paleta de colores
let paleta; // Objeto de la clase Paleta
let radInicial = 80; // Radio inicial de las figuras
let radMax = 800; // Radio máximo de las figuras
let posicionesY = []; // Array para almacenar las posiciones Y ocupadas
let imgFigura = []; //Array de imagenes figuras
const model_url =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";

let mic;
let pitch;
let audioContext;
let umbral_sonido = 0.03;
let antesHabiaSonido; // Esta variable puede no ser necesaria si antesHabiaSonido se inicializa dentro de la función draw()
let estado = "escucha";
let monitoreo = true;

let pitchFrequency = 0; // almacena la frecuencia del pitch

let bgGraphics; // pGraphics para la textura de fondo
let figurasGraphics; // pGraphics para las figuras fijas


function setup() {
  createCanvas(windowHeight / 1.5, windowHeight, WEBGL); // Crea el lienzo
  paleta = new Paleta(imgPaleta); // Inicializa la paleta de colores

  // Inicializa pGraphics para la textura de fondo
  bgGraphics = createGraphics(windowHeight / 1.5, windowHeight);
  bgGraphics.image(textura, 0, 0, bgGraphics.width, bgGraphics.height);

  // Inicializa pGraphics para las figuras fijas
  figurasGraphics = createGraphics(windowHeight / 1.5, windowHeight);

  // Inicializa la escucha de sonido
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  userStartAudio();

  gestorAmp = new GestorSenial(0.05, 0.1);
  gestorPitch = new GestorSenial(40, 50);
}

function draw() {
  background(220, 200, 180);
  noStroke();
  /* console.log(estado);
  console.log(indiceFiguras); */

  // Dibujar la textura de fondo desde bgGraphics
  image(bgGraphics, -width / 2, -height / 2);

  // Dibujar las figuras fijas desde figurasGraphics
  image(figurasGraphics, -width / 2, -height / 2);


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
      figuraActual.estado = "creciente";
      // Actualizar la posición Y según el pitch actualizado
      let targetY = map(
        pitchFrequency,
        70,
        250,
        height / 2 - 100,
        -height / 2 + 100
      );

      // Actualiza la posición Y según el pitch actualizado (constrain para que no se salga del lienzo)
      figuraActual.y = constrain(targetY, -height / 2 + 100, height / 2 - 100);
      //figuraActual.y += (targetY - figuraActual.y) * 0.2; // Factor de suavizado

    } else {
      figuraActual.estado = "fijo";
      fijarFiguraActual();
    }
    // Si la figura actual alcanza el radio máximo, se fija según el tipo de figura
    if (
      figuraActual &&
      figuraActual.radio >= radMax
    ) {
      fijarFiguraActual();
    }
  }

  if (monitoreo) {

    gestorAmp.dibujar(0, 0);
    gestorPitch.dibujar(0, 100);
  }
  //console.log(vol);
  antesHabiaSonido = haySonido;
}
