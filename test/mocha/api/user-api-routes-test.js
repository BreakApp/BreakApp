require('../../../server');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('userRoutes', function() {

  var apiPath = '/api/v_0_0_1/users';

  it('cannot access the users database without authentication', function(done) {
    chai.request('http://localhost:3000')
      .get(apiPath)
      .res(function(res) {
        expect(res).to.have.status(401);
        done();
      });
  });
});
