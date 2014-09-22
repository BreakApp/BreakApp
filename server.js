'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');

var app = express();

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/breaks');

app.use(express.static(__dirname + (process.env.STATIC_DIR || '/build')));

app.use(bodyparser.json());
require('./routes/studyBreaks-routes')(app);
//If we need body parser, we will say: app.use(bodyparser.json());
// Our route to the breaks db, it will be different that this route: require('./routes/note-routes')(app);
// Our route to the users db

var server = http.createServer(app);

server.listen(process.env.PORT || 3000, function() {
  console.log('server running');
});
