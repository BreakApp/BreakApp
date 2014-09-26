'use strict';

require('../../app/js/app.js');
require('angular-mocks');

describe('breakController', function() {
  var $controllerConstructor;
  var $httpBackend;
  var scope;
  var _breakService;

  beforeEach(angular.mock.module('breakApp'));

  beforeEach(angular.mock.inject(function($controller, $rootScope, breakService) {
    scope = $rootScope.$new();
    $controllerConstructor = $controller;
    _breakService = breakService;
  }));

  it('creates a new controller', function() {
    var breakController = $controllerConstructor('breakController', {$scope: scope });
    expect(typeof breakController).toBe('object'); 
  });

  describe('breakController functions', function() {
    var ctrl;

    it('starts with no current break set', function() {
      ctrl = $controllerConstructor('breakController', {$scope: scope});
      expect(scope.currentBreak).toEqual('');
    });

    it('starts with the timer not running', function() {
      ctrl = $controllerConstructor('breakController', {$scope: scope});
      expect(scope.timerRunning).toEqual(false);
    });

    it('starts the timer running when breakTimer is called', function() {
      ctrl = $controllerConstructor('breakController', {$scope: scope});
      scope.breakTimer();
      expect(scope.timerRunning).toBeTruthy();
    });

    it('stops timer running when getBreak is called', function() {
      ctrl = $controllerConstructor('breakController', {$scope: scope});
      scope.getBreak();
      expect(scope.timerRunning).toBeFalsy();
    });
  });
});
