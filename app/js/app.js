'use strict';
require('angular/angular');
require('angular-route');

var breakApp = angular.module('breakApp', ['ngRoute']);

// service(s)
require('./services/break-service')(breakApp);

// controller(s)
require('./controllers/break-controller')(breakApp);

// router
breakApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/break-view.html',
    controller: 'breakController'
  }).otherwise({
    redirectTo: '/'
  });
}]);
