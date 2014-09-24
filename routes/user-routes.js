'use strict';

var User = require('../models/user');

module.exports = function(app, passport){
	app.post('/api/v_0_0_1/users', function(req, res){
		User.findOne({'basic.email': req.body.email}, function(err, user){
			if(err) return res.status(500).json(err);

      if(user) return res.status(401).json({'msg':'cannot create user'});
		});

		var newUser = new User();
		newUser.email = req.body.email;
		newUser.password = newUser.generateHash(req.body.password);

		newUser.save(function(err, resUser){
			if(err) return res.status(500).json(err);

      return res.status(200).json({'jwt': resUser.createToken(app)});
		});
	});

	app.get('/api/v_0_0_1/users', passport.authenticate('basic', {session: false}), function(req, res){
		res.json({'jwt': req.user.createToken(app)});
	});

};