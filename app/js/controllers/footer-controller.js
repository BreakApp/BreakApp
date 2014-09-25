// break controller
'use strict';

module.exports = function(app) {
  app.controller('footerController', function($scope) {

    $scope.property = '';




    $scope.someFunction = function(){
      dostuff();
    };


  });
};
