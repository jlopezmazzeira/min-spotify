'use strict'

var express = require('express');
//Importamos el controlador
var AlbumController = require('../controllers/album');
//Llamamos la función Router para poder crear las rutas
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//Importamos la libreria connect-multiparty para  trabajar con ficheros
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/albums'})
//Creando una ruta y llamando la función que queremos
//Si queremos aplicar un middleware al controlador lo colocamos como 2do parametro
api.get('/album/:id',md_auth.ensureAuth,AlbumController.getAlbum);
api.get('/albums/:artist?',md_auth.ensureAuth,AlbumController.getAlbums);
api.post('/album',md_auth.ensureAuth,AlbumController.saveAlbum);
api.put('/album/:id',md_auth.ensureAuth,AlbumController.updateAlbum);
api.delete('/album/:id',md_auth.ensureAuth,AlbumController.deleteAlbum);
api.post('/upload-image-album/:id',[md_auth.ensureAuth, md_upload],AlbumController.uploadImage);
api.get('/get-image-album/:imageFile',AlbumController.getImageFile);
module.exports = api;