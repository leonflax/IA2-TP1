function preload() {
  // Carga las imágenes antes de iniciar el programa
  textura = loadImage("img/textures/canvas_texture.jpg"); // Textura de fondo
  // texturaFigura = loadImage("img/textures/textura2.jpeg"); // Textura de figura
  imgPaleta = loadImage("img/sonia3.jpeg"); // Imagen de referencia para la paleta de colores

  //asigno la imagen al array
  imgFigura[0] = loadImage("img/figura0.png");
  imgFigura[1] = loadImage("img/figura1.png");
  imgFigura[2] = loadImage("img/figura2.png");
  imgFigura[3] = loadImage("img/figura3.png");
  imgFigura[4] = loadImage("img/figura4.png");
  imgFigura[5] = loadImage("img/figura5.png");
  imgFigura[6] = loadImage("img/figura6.png");
  imgFigura[7] = loadImage("img/figura7.png");
  imgFigura[8] = loadImage("img/figura8.png");
  imgFigura[9] = loadImage("img/figura9.png");
  imgFigura[10] = loadImage("img/figura10.png");
  imgFigura[11] = loadImage("img/figura11.png");
  imgFigura[12] = loadImage("img/figura12.png");
}

function windowResized() {
  resizeCanvas(windowHeight / 1.5, windowHeight); // Ajusta el tamaño del lienzo cuando se redimensiona la ventana
}

function crearNuevaFigura() {
  let rotacion = Math.round(random()); // Determina la rotación aleatoria de la figura
  let colorFigura = [];
  let cantFiguras = int(random(6) + 3); // Determina la cantidad aleatoria de figuras
  let posX;

  // Determina la posición inicial X de la nueva figura
  for (let i = 0; i < cantFiguras; i++) {

  if (indiceFiguras <5) {
    colorFigura.push(paleta.darColor((50, 300)));
    radInicial = 300;
  }else{
    radInicial = 100;
    colorFigura.push(paleta.darColor());
  }
  
}
  /* if (indiceFiguras % 2 === 0) {
      posX = random(width / 2 + 100, width - 100); // Posición a la derecha de la mitad del lienzo
    } else {
      posX = random(-width / 2 + 100, -100); // Posición a la izquierda de la mitad del lienzo
    }
  } else {
    posX = random(-width / 2 + 100, width / 2 - 100); // Posición en el centro del lienzo
  } */

  // Genera colores para la figura, eligiendo de la paleta
  r = floor(random(0, imgFigura.length)); // asigna imagen aleatoria del array

  figuraActual = new Figura(
    posX,
    0,
    radInicial,
    rotacion,
    colorFigura, cantFiguras,
    imgFigura[r]
  ); // Crea la nueva figura en la posición inicial

  figuraActual.estado = "creciente"; // La figura comienza en estado creciente
  posicionesY.push(0); // Registra la posición inicial Y de la figura
}

function fijarFiguraActual() {
  if (figuraActual) {
    figuraActual.estado = "fijo"; // Fija la figura actual en su posición final
    figuras.push(figuraActual); // Agrega la figura al array de figuras fijas
    figuraActual = null; // Reinicia la figura actual para permitir la creación de una nueva figura
    indiceFiguras++; // Incrementa el contador de figuras creadas
    posicionesY = []; // Reinicia el array de posiciones Y ocupadas
  }
}

// Función para desactivar el clic derecho
function rightClick() {
  document.oncontextmenu = function () {
    return false;
  };
}

// Inicia la detección de pitch de audio
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

// Callback cuando se ha cargado el modelo de detección de pitch
function modelLoaded() {
  getPitch(); // Comienza a obtener el pitch de manera continua
}

let pitchSmooth = 0;

// Obtiene el pitch continuamente y lo suaviza para mejor resultado visual
function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      pitchFrequency = frequency; // Actualiza la frecuencia del pitch

      // Suaviza la frecuencia del pitch
      pitchSmooth += (pitchFrequency - pitchSmooth) * 0.2; // Ajusta el factor de suavizado (0.2)

      let midiNum = freqToMidi(pitchSmooth); // Convierte la frecuencia a número MIDI
      gestorPitch.actualizar(midiNum); // Actualiza el gestor de señal de pitch
    }
    getPitch(); // Llama recursivamente para seguir obteniendo el pitch
  });
}
