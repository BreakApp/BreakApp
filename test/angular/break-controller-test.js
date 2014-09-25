'use strict';

require('../../app/js/app.js');
require('angular-mocks');

describe('breakController', function() {
  var $controllerConstructor;
  var $httpBackend;
  var scope;

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
    // beforeEach(angular.mock.inject(function(_$httpBackend_) {
    //   $httpBackend = _$httpBackend_; 
    //   $httpBackend.expectGET('/api/v_0_0_1/breakideas').respond(200);
    // }));

    // afterEach(function() {
    //   $httpBackend.verifyNoOutstandingExpectation();
    //   $httpBackend.verifyNoOutstandingRequest();
    // });

    it('starts with no current break set', function() {
      ctrl = $controllerConstructor('breakController', {$scope: scope});
      expect(scope.currentBreak).toEqual('');
    });

    it('starts with the timer not running', function() {
      ctrl = $controllerConstructor('breakController', {$scope: scope});
      expect(scope.timerRunning).toEqual(false);
    });

    it('starts the timer running when breakTimer is called', function() {
      ctrl = $controllerConstructor('breakController', {$scope: scope, _break});
      scope.breakTimer();
      expect(scope.timerRunning).toBeTruthy();
    });

    // it('should be able to create a new note', function() {
    //   $httpBackend.expectPOST('/api/v_0_0_1/notes').respond(200, {'noteBody': 'test note'});
    //   ctrl = $controllerConstructor('notesController', {$scope: scope});
    //   scope.newNote = {'noteBody': 'test note'};
    //   scope.saveNewNote();

    //   $httpBackend.flush();
    // });

    // it('should be able edit a note', function() {
    //   $httpBackend.expectPUT('/api/v_0_0_1/notes/1').respond(202, {});
    //   $httpBackend.expectGET('/api/v_0_0_1/notes').respond(200, [{}]);
    //   ctrl = $controllerConstructor('notesController', {$scope: scope});
    //   scope.saveNote({_id: '1'});

    //   $httpBackend.flush();
    // });

    // it('should be able to delete a note', function() {
    //   $httpBackend.expectDELETE('/api/v_0_0_1/notes/1').respond(200, {});
    //   $httpBackend.expectGET('/api/v_0_0_1/notes').respond(200, [{}]);
    //   ctrl = $controllerConstructor('notesController', {$scope: scope});
    //   scope.deleteNote({_id: '1'});

    //   $httpBackend.flush();
    // });
  });
});
