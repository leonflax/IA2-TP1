class Figura {
  constructor(y, rad, rot, col, cant) {
    // creo constructor
    this.y = y;
    this.rad = rad; // Radio
    this.rot = rot; // Rotacion
    this.col = col; // Array de colores sacado de clase Paleta
    this.cant = cant;
    // tipo de arco
    this.tipo = random() < 0.5 ? "circulo" : "semicirculo";
    // this.estado = "inicial";
    // console.log(this.cantFiguras);
  }

  show() {
    push();

    // translate(width / 2, height / 2); // division central de lienzo

    // rotaciones
    if (this.rot == 0) {
      rotate(radians(90)); // derecha
    } else {
      rotate(radians(270)); // izquierda
    }

    if (this.estado === "inicial") {
      if (cantFiguras < 10) {
        // grandes menores a 10 fig
        figuraActual.rad = random((100, 350)); // modif radio
      }
    } else if (Figura.estado === "intermedio") {
      if (cantFiguras >= 10 && cantFiguras < 25) {
        // medianas entre 10 y 25 fig
        figuraActual.rad = random((40, 140)); //modif radio
      }
    } else if (Figura.estado === "final") {
      if (cantFiguras >= 25) {
        // pequeñas mayores a 25 fig
        figuraActual.rad = random((20, 100)); //modif radio
      }
    }

    // creo figuras
    if (this.tipo === "circulo") {
      // si dibuja circulo "TWO_PI"
      for (let i = 0; i < this.cant; i++) {
        fill(this.col[i]); // color sacado de la clase Paleta
        let radius = this.rad * ((this.cant / i) * 0.3); // radio menor para cada círculo segun la cantidad de figuras
        arc(this.y, 0, radius, radius, 0, TWO_PI, PIE, 100); //circulo

        // Misma figura pero con textura
        push();
        blendMode(DARKEST); // SIRVEN OVERLAY, DARKEST, BURN
        tint(255, 200);
        texture(texturaFigura);
        arc(this.y, 0, radius, radius, 0, TWO_PI, PIE, 100); //circulo

        pop();
      }
    } else {
      // si dibuja semicirculo "PI"
      for (let i = 0; i < this.cant; i++) {
        fill(this.col[i]); // Color sacado de la clase Paleta
        let radius = this.rad * ((this.cant / i) * 0.5); // radio menor para cada semicírculo segun la cantidad de figuras
        arc(this.y, 0, radius, radius, 0, PI, OPEN, 100); // Semicirculo

        // Misma figura pero con textura
        push();
        blendMode(OVERLAY);
        tint(255, 200);
        texture(texturaFigura);
        arc(this.y, 0, radius, radius, 0, PI, OPEN, 100); // Semicirculo

        pop();
      }
    }
    pop();
  }
}
