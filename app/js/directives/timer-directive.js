'use strict';

module.exports = function(app) {
  app.directive('timerDirective', function() {
    var direc = {
      restrict: 'EAC',
      templateUrl: 'views/timer-view.html'
    };
    return direc;
  });
};
