'use strict';

require('../../app/js/app.js');
require('angular-mocks');

describe('breakService', function() {
  beforeEach(angular.mock.module('breakApp'));

  var bs;
  var $httpBackend;
  // var testNote = {noteBody: 'test note', _id: '1'};
  beforeEach(angular.mock.inject(function(breakService, _$httpBackend_) {
    bs = breakService;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a get request', function() {
    $httpBackend.expectGET('/api/v_0_0_1/breakideas').respond(200);
    bs.getBreak();

    $httpBackend.flush();    
  });

  // it('should make a post request', function() {
  //   $httpBackend.expectPOST('/api/v_0_0_1/breakideas').respond(200, testNote);
  //   bs.saveNewNote(testNote);

  //   $httpBackend.flush();
  // });

  // it('should make a put request', function() {
  //   $httpBackend.expectPUT('/api/v_0_0_1/breakideas/1').respond(202, testNote);
  //   bs.saveOldNote(testNote);

  //   $httpBackend.flush();
  // });

  // it('should be able to make a delete request', function() {
  //   $httpBackend.expectDELETE('/api/v_0_0_1/breakideas/1').respond(200);
  //   bs.deleteNote(testNote);

  //   $httpBackend.flush();
  // });
});
