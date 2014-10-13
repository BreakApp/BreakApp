'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var passport = require('passport');
var app = express();

mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/breaks' || 'mongodb://localhost/breaks');

app.use(express.static(__dirname + (process.env.STATIC_DIR || '/dist')));

app.set('jwtTokenSecret', process.env.JWT_SECRET ||'developmentsecret');
app.set('secret', process.env.SECRET ||'developmentsecret');

app.use(passport.initialize());

require('./lib/passport')(passport);
var jwtauth = require('./lib/jwtauth')(app);

app.use(bodyparser.json());

require('./routes/break-routes')(app, jwtauth.auth);
require('./routes/user-routes')(app, passport);

var server = http.createServer(app);

var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('server running on port ' + port);
});
