require('../../../server');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('breakRoutes', function() {

  var apiPath = '/api/v_0_0_1/breakideas';

  it('makes a successful GET request to the breaks DB', function(done) {
    chai.request('http://localhost:3000')
      .get(apiPath)
      .res(function(res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('gets back json from the breaks DB', function(done) {
    chai.request('http://localhost:3000')
      .get(apiPath)
      .res(function(res) {
        expect(Array.isArray(res.body)).to.be.true;
        expect(res).to.be.json;
        done();
      })
  });

  it('gets back a break with an \'instructions\' property', function(done) {
    chai.request('http://localhost:3000')
      .get(apiPath)
      .res(function(res) {
        expect(res.body[0]).to.have.property('instructions');
        done();
      });
  });

});
