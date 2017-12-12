	 var Persona = function (nombre, billetera){
	 	this.nombre = nombre;
	 	this.billetera = billetera;
	 	this.enriquecer = function(monto){
	 		this.billetera += monto;
	 	}
	 }

	 var BancoCentral = function (){
	 	//this.usuarios = usuarios;*/
	 	   // propiedades
   		this.usuarios = {
       		"cristhian": 5000
  		 };
	 	this.consultarSaldo = function (nombre){
	 		return this.usuarios[nombre];
	 	};
	 	this.extraer = function (nombre, monto){
	 		this.usuarios[nombre] -= monto;
	 	};
	 }

	 var Cajero = function (banco, saldo){
	 	this.banco = banco;
	 	this.saldo = saldo;
	 	this.consultarSaldoCajero = function(monto){
	 		return this.saldo >= monto;
	 	}
	 	this.consultarSaldoPersona = function (nombre, monto){
	 		return this.banco.consultarSaldo(nombre) >= monto; 
	 	}
	 	this.puedeDarDinero = function (nombre, monto){
	 		if (!this.consultarSaldoPersona(nombre, monto)){
	 			return false;
	 		} 
	 		if (!this.consultarSaldoCajero(monto)){
	 			return false;
	 		}
	 		else {
	 			return true;
	 		}
	 	}
	 	this.descontarSaldoCajero = function(monto){
	 		return this.saldo -= monto;
	 	}
	 	this.descontarSaldoPersona = function (nombre, monto){
	 		return this.banco.extraer(nombre, monto);
	 	} 
	 	this.entregarDinero = function (nombre, monto){
	 		this.descontarSaldoCajero(monto);
	 		this.descontarSaldoPersona(nombre, monto);
	 		return monto;
	 	}
	 }

	 var Sucursal = function (cajero){
	 	this.cajero = cajero;
	 	this.extraer = function (nombre, monto){
	 		if (!this.cajero.puedeDarDinero(nombre, monto)){
	 			return;
	 		}
	 			return this.cajero.entregarDinero(nombre, monto);
	 		}
	 	}
	

	var yo = new Persona("cristhian", 1000);
var bancoCentral = new BancoCentral();
var cajero = new Cajero (bancoCentral, 20000);
var sucursalBanelco = new Sucursal (cajero);

var plataDelCajero = sucursalBanelco.extraer(yo.nombre, 500);
yo.enriquecer(plataDelCajero);

console.log(yo.billetera);