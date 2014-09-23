'use strict';

var User = require('../models/user');

module.exports = function(app, passport){
	var baseUrl = '/api/v_0_0_1/users';

	app.post(baseUrl, function(req, res){
		User.findOne({'basic.email': req.body.email}, function(err, user){
			//add err
		});

		var newUser = new User();
		newUser.email = req.body.email;
		newUser.password = newUser.generateHash(req.body.password);

		newUser.save(function(err, resUser){
			//add err
			return res.status(200).json({'jwt': resUser.createToken(app)});
		});
	});

	app.get(baseUrl, passport.authenticate('basic', {session: false}), function(req, res){
		res.json({'jwt': req.user.createToken(app)});
	});

};