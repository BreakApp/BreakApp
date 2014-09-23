// user controller
'use strict';

module.exports = function(app) {
  app.controller('userController', function($scope, $http, $cookies, $base64, $location){

    if($location.path() === '/signout'){
      $cookies.jwt = null;
    }
    if(!$cookies.jwt || $cookies.jwt.length >= 10){
      return $location.path('/');
    }
    if($location.path() === '/signup'){
      $scope.newuser = true;
    }

    $scope.signIn = function(){
      console.log('hey');
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode($scope.user.email + ':' + $scope.user.password);
      $http({
        method: 'GET',
        url: '/api/v_0_0_1/users'
      })
      .success(function(data) {
        $cookies.jwt = data.jwt;
        $location.path('/notes');
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
      console.log('clicked');
      $http({
        method: 'POST',
        url: '/api/v_0_0_1/users',
        data: $scope.user
      })
      .success(function(data) {
        $cookies.jwt = data.jwt;
        $location.path('/');
      })
      .error(function(data) {
        console.log('error');
        console.log(data);
      });
    };
  });
};