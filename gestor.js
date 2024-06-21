class GestorSenial {
	constructor(minimo_, maximo_, anchoGestor_) {
	  this.minimo = minimo_;
	  this.maximo = maximo_;
	  this.anchoGestor = anchoGestor_;
  
	  this.puntero = 0;
	  this.cargado = 0;
	  this.mapeada = [];
	  this.filtrada = 0;
	  this.anterior = 0;
	  this.derivada = 0;
  
	  this.f = 0.80;
	  this.amplificadorDerivada = 15.0;
	}
  
	actualizar(entrada_) {
	  this.mapeada[this.puntero] = map(entrada_, this.minimo, this.maximo, 0.0, 1.0);
	  this.mapeada[this.puntero] = constrain(this.mapeada[this.puntero], 0.0, 1.0);
  
	  this.filtrada = this.filtrada * this.f + this.mapeada[this.puntero] * (1 - this.f);
  
	  this.derivada = (this.filtrada - this.anterior) * this.amplificadorDerivada;
  
	  this.anterior = this.filtrada;
  
	  this.puntero++;
	  if (this.puntero >= this.anchoGestor) {
		this.puntero = 0;
	  }
	  this.cargado = max(this.cargado, this.puntero);
	}
  }
  