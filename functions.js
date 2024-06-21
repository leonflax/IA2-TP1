function preload() {
  // Carga las imágenes antes de iniciar el programa
  textura = loadImage("img/textures/canvas_texture.jpg"); // Textura de fondo
  texturaFigura = loadImage("img/textures/textura2.jpeg"); // Textura de figura
  imgPaleta = loadImage("img/saturado.jpg"); // Imagen de referencia para la paleta de colores
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
  if (indiceFiguras > 5) {
    if (indiceFiguras % 2 === 0) {
      posX = random(width / 2 + 100, width - 100); // Posición a la derecha de la mitad del lienzo
    } else {
      posX = random(-width / 2 + 100, -100); // Posición a la izquierda de la mitad del lienzo
    }
  } else {
    posX = random(-width / 2 + 100, width / 2 - 100); // Posición en el centro del lienzo
  }

  // Genera colores para la figura, eligiendo de la paleta si ya se han creado muchas figuras
  for (let i = 0; i < cantFiguras; i++) {
    if (indiceFiguras < 5) {
      colorFigura.push(color(random(50, 300))); // Colores aleatorios si hay menos de 5 figuras
    } else {
      colorFigura.push(paleta.darColor()); // Colores de la paleta si hay 5 o más figuras
    }
  }

  figuraActual = new Figura(posX, 0, radInicial, rotacion, colorFigura, cantFiguras); // Crea la nueva figura en la posición inicial
  figuraActual.estado = 'creciente'; // La figura comienza en estado creciente
  posicionesY.push(0); // Registra la posición inicial Y de la figura

}

function fijarFiguraActual() {
  if (figuraActual) {
    figuraActual.estado = 'fijo'; // Fija la figura actual en su posición final
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
