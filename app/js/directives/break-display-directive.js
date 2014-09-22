// break display directive 
'use strict';

module.exports = function(app) {
  app.directive('breakDisplay', function() {
    var direc = {
      restrict: 'EAC',
      templateUrl: 'views/break-display.html',
      scope: {
      },
      controller: function($scope, breakService) {
        $scope.currentBreak = "";

        $scope.getBreak = function() {
          $scope.currentBreak = breakService.getBreak();
        };
      }
    };
    return direc;
  });
};
