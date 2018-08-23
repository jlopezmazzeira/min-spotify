'use strict'

var express = require('express');
//Importamos el controlador
var SongController = require('../controllers/song');
//Llamamos la función Router para poder crear las rutas
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//Importamos la libreria connect-multiparty para  trabajar con ficheros
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/songs'})
//Creando una ruta y llamando la función que queremos
//Si queremos aplicar un middleware al controlador lo colocamos como 2do parametro
api.get('/song/:id',md_auth.ensureAuth,SongController.getSong);
api.get('/songs/:album?',md_auth.ensureAuth,SongController.getSongs);
api.post('/song',md_auth.ensureAuth,SongController.saveSong);
api.put('/song/:id',md_auth.ensureAuth,SongController.updateSong);
api.delete('/song/:id',md_auth.ensureAuth,SongController.deleteSong);
api.post('/upload-file-song/:id',[md_auth.ensureAuth, md_upload],SongController.uploadFile);
api.get('/get-file-song/:songFile',SongController.getSongFile);

module.exports = api;