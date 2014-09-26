'use strict';

var BreakIdea = require('../models/break-idea');

module.exports = function(app) {
  var baseUrl = '/api/v_0_0_1/breakideas';

	app.post('/api/v_0_0_1/breakideas', function(req, res) {
    var newBreak = new BreakIdea();
    newBreak.name = req.body.name;
    newBreak.instructions = req.body.instructions;
    newBreak.minutes = req.body.minutes;

    newBreak.save(function(err, resBreak) {
      if(err) return res.status(500).json(err);
      return res.send(resBreak);
    });
  });

  app.get(baseUrl, function(req, res){
    BreakIdea.find({}, function(err, breakideas) {
      if(err) return res.status(500).json(err);
      return res.json(breakideas);
    });
  });
};
