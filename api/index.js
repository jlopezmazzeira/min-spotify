//Nuevo standar de JS
'use strict'

//Para utilizar el modulo 
var mongoose = require('mongoose');
var app = require('./app');
//Para configurar un puerto
var port = process.env.PORT || 3977;
//Para realizar la conección a la BD
mongoose.connect('mongodb://localhost:27017/curso_mean2', (err, resp) => {
	if (err) {
		throw err;
	} else{
		console.log("La BD esta corriendo correctamente");

		//Para iniciar el servidor de la API Rest
		app.listen(port,function() {
			console.log("servidor iniciado de la API Rest de música por http://localhost:"+port);
		});
	}
});