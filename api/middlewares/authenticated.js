'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secret_curso';

exports.ensureAuth = function(req, res, next){


	if (!req.headers.authorization) {
		return res.satus(403).send({message: 'La petición no tiene la cabecera de autorización'});
	}

	var token = req.headers.authorization.replace(/['"]+/g, '');

	try{
		var payload = jwt.decode(token, secret);

		if (payload.exp <= moment().unix()) {
			return res.satus(401).send({message: 'El token ha expirado'});
		}
	} catch(ex) {
		//console.log(ex);
		return res.satus(404).send({message: 'Token no válido'});	
	}

	req.user = payload;

	next();
};