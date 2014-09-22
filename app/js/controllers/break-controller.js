// break controller
'use strict';

module.exports = function(app) {
  app.controller('breakController', function($scope, breakService) {

    $scope.currentBreak = '';

    $scope.getBreak = function() {
      breakService.getBreak().success(function(data) {
 	    	$scope.currentBreak = data[Math.floor((Math.random() * data.length))];
      });
    };

    $scope.getAllBreak = function() {
      breakService.getBreak().success(function(data) {
 	    	$scope.currentBreak = data;
      });
    };
  });
};
