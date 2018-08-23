'use strict'

var express = require('express');
//Importamos el controlador
var UserController = require('../controllers/user');
//Llamamos la función Router para poder crear las rutas
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//Importamos la libreria connect-multiparty para  trabajar con ficheros
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'})
//Creando una ruta y llamando la función que queremos
//Si queremos aplicar un middleware al controlador lo colocamos como 2do parametro
api.get('/probando-controlador',md_auth.ensureAuth,UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload],UserController.uploadImage);
api.get('/get-image-user/:imageFile',UserController.getImageFile);
module.exports = api;