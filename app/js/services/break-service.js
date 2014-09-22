// breakService

module.exports = function(app) {
  app.factory('breakService', function($http) {
    // helper functions...

    // breakScrambler object passed to controller
    var breakScrambler = {
      getBreak: function() {
        // return "Here's a break.";
        var dbBreak = $http({
          method: 'GET',
          url: '/api/v_0_0_1/breakideas'
        }).error(function(data, status) {
          console.log(status);
        });
        return dbBreak;
      }
    };
    return breakScrambler;
  });
};
