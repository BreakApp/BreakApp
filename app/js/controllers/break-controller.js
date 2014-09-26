// break controller
'use strict';

module.exports = function(app) {
  app.controller('breakController', function($scope, breakService) {

    $scope.currentBreak = '';
    $scope.timerRunning = false;
    $scope.toggleBreak = false;

    $scope.breakTimer = function(){
      $scope.currentBreak = '';
      $scope.timeoutID = setTimeout($scope.getBreak, breakService.getTimerLength());
      $scope.timerRunning = true;
    };

    $scope.getBreak = function() {
      if($scope.timerRunning){
        clearTimeout($scope.timeoutID);
      }
      if(!$scope.currentBreak){
        breakService.getBreak().success(function(data) {
          var randomSeed = Math.floor((Math.random() * data.length));
          $scope.currentBreak = data[randomSeed];
        });
      } else {
        $scope.currentBreak = '';
      }
      $scope.timerRunning = false;
    };

    $scope.getAllBreaks = function() {
      breakService.getBreak().success(function(data) {
 	    	$scope.currentBreak = data;
      });
    };
  });
};
