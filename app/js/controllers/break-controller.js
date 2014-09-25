// break controller
'use strict';

module.exports = function(app) {
  app.controller('breakController', function($scope, breakService) {

    $scope.currentBreak = '';
    $scope.timerLength = 2000;
    $scope.timerRunning = false;


    $scope.breakTimer = function(){
      $scope.currentBreak = '';
      $scope.timeoutID = setTimeout($scope.getBreak, $scope.timerLength);
      $scope.timerRunning = true;
    };

    $scope.getBreak = function() {
      $scope.timerRunning = false;
      breakService.getBreak().success(function(data) {
        var randomSeed = Math.floor((Math.random() * data.length));
 	    	$scope.currentBreak = data[randomSeed];
      });
    };

    $scope.getAllBreaks = function() {
      breakService.getBreak().success(function(data) {
 	    	$scope.currentBreak = data;
      });
    };
  });
};
