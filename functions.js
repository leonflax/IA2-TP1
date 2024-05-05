function preload() {
  textura = loadImage("img/textures/canvas_texture.jpg"); // Textura de fondo
  texturaFigura = loadImage("img/textures/figura_texture.jpg"); // Textura de figura
  imgPaleta = loadImage("img/soniasaturado.jpeg"); // Referencia de paleta (Cambiar para otra paleta)
}

function windowResized() {
  resizeCanvas(windowHeight / 1.5, windowHeight); // Tamaño de lienzo responsive
}

function mouseClicked() {
  if (indiceFiguras < maxFiguras) {
    // si la figura es menor al total de las posibilidades
    let posY = random(-height / 2 + 90, height / 2 - 90); // no superan margen del lienzo
    let radio = 150; // radio inicial
    let rotacion = Math.round(random());
    // let esEntero = 0;
    let colorFigura = [];
    let cantFiguras = int(random(6) + 3);
    for (let i = 0; i < cantFiguras; i++) {
      colorFigura.push(paleta.darColor());
    }

    if (Figura.estado === "inicial") {
      Figura.estado = "intermedio";
    } else if (Figura.estado === "intermedio") {
      Figura.estado = "final";
    } else if (Figura.estado === "final") {
      Figura.estado = "inicial";
    }

    console.log(Figura.estado);

    figuraActual = new Figura(posY, radio, rotacion, colorFigura, cantFiguras); // Crea una nueva figura

    figuras.push(figuraActual);

    indiceFiguras++; // Suma a la cuenta de figuras dibujadas hasta el momento
  }
}

// function mouseDragged() {
//   if (figuraActual) {
//     let nuevoRadio = dist(mouseX, mouseY, figuraActual.y, width / 2); // dist del mouse con centro de la fig
//     // tamaño de figura según la cantidad de figuras
//     if (cantFiguras < 10) { // grandes menores a 10 fig
//       figuraActual.rad = constrain(nuevoRadio, 100, 350); // modif radio c/mouse entre 300 y 550
//     } else if (cantFiguras >= 10 && cantFiguras < 25) { // medianas entre 10 y 25 fig
//       figuraActual.rad = constrain(nuevoRadio, 40, 140); //modif radio c/mouse entre 140 y 240
//     } else if (cantFiguras >= 25) { // pequeñas mayores a 25 fig
//       figuraActual.rad = constrain(nuevoRadio, 20, 100); //modif radio c/mouse entre 20 y 100
//     }
//   }
// }

// function mouseReleased() {//si suelta el mouse
//   if (figuraActual) { // añade la figura actual al arreglo y la fija
//     figuras.push(figuraActual);
//     figuraActual = null; // reinicia la figura actual
//     cantFiguras++; //suma fig a cantidad total
//   }
// }

// Desactiva el click derecho
function rightClick() {
  document.oncontextmenu = function () {
    return false;
  };
}
