const fs = require('fs');

const opciones ={
	ID:{
		demand: true,
		alias: 'i'
	},
	Nombre:{
		demand: true,
		alias: 'n'
	},
	cedula:{
		demand: true,
		alias: 'c'
	}
};

var Cursos = [{
	ID: 1,
	Nombre: "Filosofia hidraulica",
	Duracion: 30,
	Valor: 100000,
},{
	ID: 2,
	Nombre: "Catapis acuatico",
	Duracion: 49,
	Valor: 250000,
},{
	ID: 3,
	Nombre: "Espeleologia feminista",
	Duracion: 70,
	Valor: 6540000,
}];

const argv = require('yargs')
	.command('inscribir', 'inscribir a la persona', opciones)
	.argv

let IID = argv.ID;
let nombre = argv.n;
let cc = argv.c;

let encontrado = Cursos.find( arr => arr.ID == IID );

let Mostrar = (nombre, duracion, valor, callback) =>{
		let informacion ='El curso se llama '+nombre+' tiene una duracion de '+duracion+' horas y un valor de '+valor+' pesos';
		callback(informacion);
}

if (encontrado != undefined && nombre != undefined && cc != undefined){
	let crearArchivo = (encontrado, nombre, cc) =>{
		texto = 'el estudiante ' + nombre + '\n' +
		'con cedula ' + cc + '\n' +
		'se ha matriculado en el curso llamado' + encontrado.Nombre +
		 'con una duracion de ' + encontrado.Duracion +
		 ' y un valor de '+ encontrado.Valor + ' pesos.';

		fs.writeFile('matricula.txt', texto, (err) => {
		if (err) throw (err);
		console.log('se ha creado el archivo');
		});
	}

crearArchivo (encontrado, nombre, cc);
}
else if(encontrado==undefined && IID > 0){
	console.log('El ID no existe, porfavor verifiquelo.');
}
else {
	var i = 0;

	function myLoop () {
	   setTimeout(function () {
	      Mostrar(Cursos[i].Nombre, Cursos[i].Duracion, Cursos[i].Valor, informacion =>{console.log(informacion)}); 
	      i++;                     
	      if (i < Cursos.length ) {
	         myLoop();             
	      }                        
	   }, 2000)
	}

	myLoop();  
}

//node index inscribir -i=1 -n=nana -c=9
