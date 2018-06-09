'use strict';

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.config.includeStack = true;

describe('## Misc', function () {
  describe('# GET /health-check', function () {
    it('should return OK', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/health-check').expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.text).to.equal('OK');
        done();
      }).catch(done);
    });
  });

  describe('# Error Handling', function () {
    it('should handle express validation error - email is required', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post('/auth/register').send({
        password: _faker2.default.internet.password()
      }).expect(_httpStatus2.default.BAD_REQUEST).then(function (res) {
        (0, _chai.expect)(res.body.error).to.equal('"email" is required');
        done();
      }).catch(done);
    });
  });
});