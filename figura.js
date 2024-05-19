class Figura {
  constructor(y, rad, rot, col, cant) {
    this.y = y;
    this.radio = rad; // Radio
    this.rot = rot; // Rotacion
    this.col = col; // Array de colores sacado de clase Paleta
    this.cant = cant;
    this.tipo = random() < 0.5 ? "circulo" : "semicirculo";
    this.estado = 'fijo';
  }

  show() {
    push();
    if (this.rot == 0) {
      rotate(radians(90)); // derecha
    } else {
      rotate(radians(270)); // izquierda
    }

    if (this.estado === 'creciente') {
      this.radio++;
    }

    if (this.tipo === "circulo") {
      for (let i = 0; i < this.cant; i++) {
        fill(this.col[i]); // color sacado de la clase Paleta
        let radius = this.radio * ((this.cant / i) * 0.3); // radio menor para cada círculo segun la cantidad de figuras
        arc(this.y, 0, radius, radius, 0, TWO_PI, PIE, 100); // circulo

        // Misma figura pero con textura
        push();
        tint(255, 200);
        texture(texturaFigura);
        arc(this.y, 0, radius, radius, 0, TWO_PI, PIE, 100); // circulo
        pop();
      }
    } else {
      for (let i = 0; i < this.cant; i++) {
        fill(this.col[i]); // Color sacado de la clase Paleta
        let radius = this.radio * ((this.cant / i) * 0.5); // radio menor para cada semicírculo segun la cantidad de figuras
        arc(this.y, 0, radius, radius, 0, PI, OPEN, 100); // Semicirculo

        // Misma figura pero con textura
        push();
        tint(255, 200);
        texture(texturaFigura);
        arc(this.y, 0, radius, radius, 0, PI, OPEN, 100); // Semicirculo
        pop();
      }
    }
    pop();
  }
}