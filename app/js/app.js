'use strict';
require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var breakApp = angular.module('breakApp', ['ngRoute', 'ngCookies', 'base64']);

// service(s)
require('./services/break-service')(breakApp);
require('./services/auth')(breakApp);

// controller(s)
require('./controllers/break-controller')(breakApp);
require('./controllers/user-controller')(breakApp);

// router
breakApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/break-view.html',
    controller: 'breakController'
  }).otherwise({
    redirectTo: '/'
  });
}]);
