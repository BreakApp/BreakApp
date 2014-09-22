'use strict';

var mongoose = require('mongoose');

var breakSchema = mongoose.Schema({
  name: String,
  instructions: String,
  minutes: String
});

module.exports = mongoose.model('BreakIdea', breakSchema);
