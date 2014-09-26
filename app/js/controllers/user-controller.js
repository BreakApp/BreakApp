// user controller
'use strict';

module.exports = function(app) {
  app.controller('userController', function($scope, $http, $cookies, $base64, $location, breakService){

    // if($location.path() === '/signout'){
    //   $cookies.jwt = null;
    // }
    // if(!$cookies.jwt || $cookies.jwt.length >= 10){
    //   return $location.path('/');
    // }
    // if($location.path() === '/signup'){
    //
    // }

    $scope.selectTime = 2000;
    $scope.newBreakIdea = '';
    $scope.newuser = false;

    if(!$cookies.jwt || $cookies.jwt.length <= 10){
      $scope.loggedIn = false;
    } else {
      $scope.loggedIn = true;
    }

    $scope.setTimerLength = function(){
      breakService.setTimerLength($scope.selectTime);
    }

    $scope.toggleModal1 = function(){
      $scope.targeted1 = ($scope.targeted1 ? false : true);
    };
    $scope.toggleModal2 = function(){
      $scope.targeted2 = ($scope.targeted2 ? false : true);
    };
    $scope.toggleModal3 = function(){
      $scope.targeted3 = ($scope.targeted3 ? false : true);
    };

    $scope.signIn = function(){
      $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode($scope.user.email + ':' + $scope.user.password);
      $http({
        method: 'GET',
        url: '/api/v_0_0_1/users'
      })
      .success(function(data) {
        $cookies.jwt = data.jwt;
        $scope.loggedIn = true;
        $location.path('/');
      })
      .error(function(data) {
        console.log('error');
        console.log(data);
      });
    };

    $scope.validatePassword = function() {
      return $scope.user.password === $scope.user.passwordConfirmation;
    };

    $scope.createNewUser = function() {
      $http({
        method: 'POST',
        url: '/api/v_0_0_1/users',
        data: $scope.user
      })
      .success(function(data) {
        $cookies.jwt = data.jwt;
        $scope.loggedIn = true;
        $location.path('/');
      })
      .error(function(data) {
        console.log('error');
        console.log(data);
      });
    };

    $scope.signOut = function(){
      $scope.loggedIn = false;
      $cookies.jwt = null;
    };

    $scope.newBreak = function(form) {
      breakService.newBreak($scope.newBreak)
        .success(function(data) {
          $scope.breaks.push(data);
          $scope.newBreakIdea = '';
        });
    };

  });
};
