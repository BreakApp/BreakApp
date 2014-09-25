'use strict';

module.exports = function(app) {
  app.directive('footerDirective', function() {
    var direc = {
      restrict: 'EAC',
      templateUrl: 'views/footer.html',
      scope: {
      },
      controller: function($scope) {
        $scope.toggleModal1 = function(){
          $scope.targeted1 = ($scope.targeted1 ? false : true);
        };
        $scope.toggleModal2 = function(){
          $scope.targeted2 = ($scope.targeted2 ? false : true);
        };
        $scope.toggleModal3 = function(){
          $scope.targeted3 = ($scope.targeted3 ? false : true);
        };
      }
    };
    return direc;
  });
};
