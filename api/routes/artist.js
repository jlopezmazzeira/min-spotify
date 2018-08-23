'use strict'

var express = require('express');
//Importamos el controlador
var ArtistController = require('../controllers/artist');
//Llamamos la función Router para poder crear las rutas
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//Importamos la libreria connect-multiparty para  trabajar con ficheros
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/artists'})
//Creando una ruta y llamando la función que queremos
//Si queremos aplicar un middleware al controlador lo colocamos como 2do parametro
api.get('/artist/:id',md_auth.ensureAuth,ArtistController.getArtist);
//Cuando el parametro tiene el signo ? es opcional el parametro
api.get('/artists/:page?',md_auth.ensureAuth,ArtistController.getArtists);
api.post('/artist',md_auth.ensureAuth,ArtistController.saveArtist);
api.put('/artist/:id',md_auth.ensureAuth,ArtistController.updateArtist);
api.delete('/artist/:id',md_auth.ensureAuth,ArtistController.deleteArtist);
api.post('/upload-image-artist/:id',[md_auth.ensureAuth, md_upload],ArtistController.uploadImage);
api.get('/get-image-artist/:imageFile',ArtistController.getImageFile);

module.exports = api;