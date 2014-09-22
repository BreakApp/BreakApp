'use strict';
require('angular/angular');
require('angular-route');

var breakApp = angular.module('breakApp', ['ngRoute']);

// service(s)
require('./services/break-service')(breakApp);

// directive(s)
require('./directives/break-display-directive')(breakApp); // contains controller
