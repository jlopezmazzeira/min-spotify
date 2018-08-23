'use strict'

//Para cargar Express (Servidor)
var express = require('express');

//Para parsear el body de la peticiones
var bodyParser = require('body-parser');

//Para cargar el servidor
var app = express();

//Cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var song_routes = require('./routes/song');
//Para configurar el bodyParser
//Para que pueda funcionar
app.use(bodyParser.urlencoded({extended:false}));
//Para transformar el body en json
app.use(bodyParser.json());

//Configurar las cabeceras Http
/*app.use((req, res, next) => {
	//Para aceptar peticiones desde cualquier dominio
	res.header('Access-Control-Allow-Origin', '*');
	//Para no tener inconvenientes con peticiones AJAX
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	//Peticiones aceptadas
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Allow','GET, POST, PUT, DELETE, OPTIONS');

	next();
});*/
//Rutas Bases

//Funciona como un middleware
app.use('/api',user_routes);
app.use('/api',artist_routes);
app.use('/api',album_routes);
app.use('/api',song_routes);
/*app.get('/pruebas',function(req,res) {
	res.status(200).send({message: 'Bienvenido al curso'});
})*/
//Para exportar el modulo
module.exports = app;