// breakService

module.exports = function(app) {
  app.factory('breakService', function() {
    // helper functions...

    // breakScrambler object passed to controller
    var breakScrambler = {
      getBreak: function() {
        return "Here's a break!";
      }
    };
    return breakScrambler;
  });
};
