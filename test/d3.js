var assert = require("assert");
var d3 = require('../');

describe('D3', function() {
  describe('#getProfile()', function() {
    it('should return a profile from the bnet api', function(done) {
      d3.bnet.getProfile("Potentiality#1530", function(err, res) {
        console.log(['getProfile', err, res]);
        done();
      });
    })
  })
});