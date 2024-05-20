class Paleta {
  constructor(imagen_) {
    this.imagen = imagen_; // Imagen de la paleta de colores
  }

  darColor() {
    let x = int(random(this.imagen.width)); // Coordenada X aleatoria en la imagen
    let y = int(random(this.imagen.height)); // Coordenada Y aleatoria en la imagen
    return this.imagen.get(x, y); // Retorna el color en la posición aleatoria
  }
}
