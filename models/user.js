'use strict';

var mongoose = require('mongoose');
var bcryt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');

var userSchema = mongoose.Schema({
	basic: {
		email: String,
		password: String
	}
});

userSchema.methods.generateHash = function(password){
	return bcryt.hashSync(password, bcryt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
	return bcryt.compareSync(password, this.basic.password);
};

userSchema.methods.createToken = function(app){
	var expires = moment().add(7, 'days').valueOf();
	var self = this;

	var token = jwt.encode({
		iss: self._id,
		expires: expires
	},app.get('jwtTokenSecret'));

	return token;
};

module.exports = mongoose.model('User', userSchema);