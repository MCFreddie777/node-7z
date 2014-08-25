/*global describe, it, afterEach */
var expect = require('chai').expect;
var fs = require('fs');
var rimraf = require('rimraf');
var extractFull = require('../../lib/extractFull');

describe('Module: `extractFull`', function () {
  
  afterEach(function () { rimraf.sync('.tmp/test'); });
  
  it('should return an error on 7z error', function (done) {
    extractFull('test/nothere.7z', '.tmp/test')
    .catch(function (err) {
      expect(err).to.be.an.instanceof(Error);
      done();
    });
  });
  
  it('should return entries on progress', function (done) {
    extractFull('test/zip.7z', '.tmp/test')
    .progress(function (entries) {
      expect(entries.length).to.be.at.least(1);
      done();
    });
  });
  
  it('should extract on the right path', function (done) {
    extractFull('test/zip.7z', '.tmp/test')
    .then(function () {
      expect(fs.existsSync('.tmp/test/zip')).to.be.eql(true);
      done();
    });
  });
  
});