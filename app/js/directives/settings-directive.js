'use strict';

module.exports = function(app) {
  app.directive('settingsDirective', function() {
    var direc = {
      restrict: 'EAC',
      templateUrl: 'views/settings-view.html'
    };
    return direc;
  });
};
