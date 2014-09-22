// break controller 
'use strict';

module.exports = function(app) {
  app.controller('breakController', function($scope, breakService) {

    $scope.currentBreak = '';

    $scope.getBreak = function() {
      $scope.currentBreak = breakService.getBreak();
    }
  });
};
