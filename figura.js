class Figura {
  constructor(y, rad, rot, col, cant) {
    this.y = y; // Posición Y de la figura
    this.radio = rad; // Radio inicial de la figura
    this.rot = rot; // Rotación de la figura (0 o 1)
    this.col = col; // Array de colores para la figura
    this.cant = cant; // Cantidad de subfiguras que componen la figura
    this.tipo = random() < 0.5 ? "circulo" : "semicirculo"; // Tipo de figura (círculo o semicírculo)
    this.estado = 'fijo'; // Estado inicial de la figura
  }

  show() {
    push();
    
    // Aplica la rotación a la figura
    if (this.rot == 0) {
      rotate(radians(90)); // Rotación a la derecha
    } else {
      rotate(radians(270)); // Rotación a la izquierda
    }

    // Si la figura está en estado creciente, incrementa el radio
    if (this.estado === 'creciente') {
      this.radio++;
    }

    // Dibuja la figura
    if (this.tipo === "circulo") {
      // Si es un círculo
      for (let i = 0; i < this.cant; i++) {
        fill(this.col[i]); // Asigna el color
        let radius = this.radio * ((this.cant / (i + 1)) * 0.3); // Calcula el radio del subcírculo
        arc(this.y, 0, radius, radius, 0, TWO_PI, PIE, 70); // Dibuja el subcírculo

        // Dibuja el subcírculo con textura
        push();
        // tint(255, 200); // Aplica transparencia
        // texture(texturaFigura); // Asigna la textura
        // arc(this.y, 0, radius, radius, 0, TWO_PI, PIE, 70); // Dibuja el subcírculo con textura
        pop();
      }
    } else {
      // Si es un semicírculo
      for (let i = 0; i < this.cant; i++) {
        fill(this.col[i]); // Asigna el color
        let radius = this.radio * ((this.cant / (i + 1)) * 0.5); // Calcula el radio del subsemicírculo
        arc(this.y, 0, radius, radius, 0, PI, OPEN, 70); // Dibuja el subsemicírculo

        // Dibuja el subsemicírculo con textura
        push();
        // tint(255, 200); // Aplica transparencia
        // texture(texturaFigura); // Asigna la textura
        // arc(this.y, 0, radius, radius, 0, PI, OPEN, 70); // Dibuja el subsemicírculo con textura
        pop();
      }
    }
    pop();
  }
}
