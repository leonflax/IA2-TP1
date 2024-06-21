class Figura {
  constructor(x, y, rad, rot, col, cant) {
    this.x = x;
    this.y = y; // Posición Y de la figura
    this.radio = rad; // Radio inicial de la figura
    this.rot = rot; // Rotación de la figura (0 o 1)
    this.col = col; // Array de colores para la figura
    this.cant = cant; // Cantidad de subfiguras que componen la figura
    this.tipo = random() < 0.5 ? "circulo" : "semicirculo"; // Tipo de figura (círculo o semicírculo)
    this.estado = 'fijo'; // Estado inicial de la figura
    this.rotacionSeleccionada = Math.random() < 0.5 ? 90 : 270;
  }

  show() {
    push();

    // Aplica la rotación a la figura
    rotate(radians(this.rotacionSeleccionada)); // Aplica la rotación seleccionada

    // Si la figura está en estado creciente, incrementa el radio
    if (this.estado === 'creciente') {
      // console.log('POS Y =' + this.y);
      if(this.tipo === 'circulo'){
        this.radio += 2; // Ajusta el incremento para aumentar la velocidad de crecimiento
      }else{
        // El semicirculo crece mas rapido que el circulo
        this.radio += 5; // Ajusta el incremento para aumentar la velocidad de crecimiento
      }
    }

    // Dibuja la figura
    if (this.tipo === 'circulo') {
      // Si es un círculo
      for (let i = 0; i < this.cant; i++) {
        fill(this.col[i]); // Asigna el color
        let radius = this.radio * ((this.cant / (i + 3)) * 0.8); // Calcula el radio del subcírculo
        arc(this.y, 0, radius, radius, 0, TWO_PI, PIE, 70); // Dibuja el subcírculo

        // Dibuja el subcírculo con textura
        push();
        tint(255, 100); // Aplica transparencia
        texture(texturaFigura); // Asigna la textura
        arc(this.y, 0, radius, radius, 0, TWO_PI, PIE, 70); // Dibuja el subcírculo con textura
        pop();
      }
      
    } else {
      // Si es un semicírculo
      for (let i = 0; i < this.cant; i++) {
        fill(this.col[i]); // Asigna el color
        let radius = this.radio * ((this.cant / (i + 5)) * 0.6); // Calcula el radio del subsemicírculo
        arc(this.y, 0, radius, radius, 0, PI, OPEN, 70); // Dibuja el subsemicírculo

        // Dibuja el subsemicírculo con textura
        push();
        tint(255, 100); // Aplica transparencia
        texture(texturaFigura); // Asigna la textura
        arc(this.y, 0, radius, radius, 0, PI, OPEN, 70); // Dibuja el subsemicírculo con textura
        pop();
      }
    }
    pop();
  }
}
