'use strict';

module.exports = function(app) {
  app.directive('loginDirective', function() {
    var direc = {
      restrict: 'EAC',
      templateUrl: 'views/login-view.html'
    };
    return direc;
  });
};
