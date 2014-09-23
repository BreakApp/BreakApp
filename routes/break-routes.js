'use strict';

var BreakIdea = require('../models/break-idea');

module.exports = function(app) {
  var baseUrl = '/api/v_0_0_1/breakideas';

  app.get(baseUrl, function(req, res){
    BreakIdea.find({}, function(err, breakideas) {
      if(err) return res.status(500).json(err);
      return res.json(breakideas);
    });
  });

  // app.get(baseUrl + '/:id', function(req, res) {
  //   studyBreak.findOne({'_id': req.params.id}, function(err, studybreak) {
  //     if (err) return res.status(500).json(err);
  //     return res.json(studybreak);
  //   });
  // });
};

//where we add the functionality for returning a random break?
