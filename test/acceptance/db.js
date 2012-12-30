var assert = require("assert");
var d3 = require('../../');

describe('Db', function() {
  describe('#getRegions()', function() {
    it('Should return an array of regions', function(done) {
      d3.db.getRegions().forEach(function(region) { assert(d3.db.isRegion(region.toUpperCase())); });
      d3.db.getRegions().forEach(function(region) { assert(d3.db.isRegion(region.toLowerCase())); });
      d3.db.getRegions().forEach(function(region) { assert(d3.db.isRegion(region)); });
      done();
    })
  })
  describe('#getLocales()', function() {
    it('Should return an array of locales', function(done) {
      d3.db.getLocales().forEach(function(locale) { assert(d3.db.isLocale(locale.toUpperCase())); });
      d3.db.getLocales().forEach(function(locale) { assert(d3.db.isLocale(locale.toLowerCase())); });
      d3.db.getLocales().forEach(function(locale) { assert(d3.db.isLocale(locale)); });
      done();
    })
  })
  describe('#getFollowers()', function() {
    it('Should return an array of followers', function(done) {
      d3.db.getFollowers().forEach(function(follower) { assert(d3.db.isFollower(follower.toUpperCase())); });
      d3.db.getFollowers().forEach(function(follower) { assert(d3.db.isFollower(follower.toLowerCase())); });
      d3.db.getFollowers().forEach(function(follower) { assert(d3.db.isFollower(follower)); });
      done();
    })
  })
  describe('#getFollowers()', function() {
    it('Should return an array of artisans', function(done) {
      d3.db.getArtisans().forEach(function(artisan) { assert(d3.db.isArtisan(artisan.toUpperCase())); });
      d3.db.getArtisans().forEach(function(artisan) { assert(d3.db.isArtisan(artisan.toLowerCase())); });
      d3.db.getArtisans().forEach(function(artisan) { assert(d3.db.isArtisan(artisan)); });
      done();
    })
  })
});