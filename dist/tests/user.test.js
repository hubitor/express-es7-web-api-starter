'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

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

/**
 * root level hooks
 */
after(function (done) {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  _mongoose2.default.models = {};
  _mongoose2.default.modelSchemas = {};
  _mongoose2.default.connection.close();
  done();
});

describe('## User APIs', function () {
  var user = {
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password(),
    firstName: _faker2.default.name.firstName(),
    lastName: _faker2.default.name.lastName()
  };

  describe('# POST /auth/register', function () {
    it('should create a new user', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post('/auth/register').send(user).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.token).to.not.equal('');
        (0, _chai.expect)(res.body.token).to.not.equal(undefined);
        (0, _chai.expect)(res.body.user.email).to.equal(user.email);
        (0, _chai.expect)(res.body.user.firstName).to.equal(user.firstName);
        (0, _chai.expect)(res.body.user.lastName).to.equal(user.lastName);
        (0, _chai.expect)(res.body.user.password).to.equal(undefined); // Password should be removed.
        user = res.body.user;
        user.token = res.body.token;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/users/:userId', function () {
    it('should get user details', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/users/' + user._id).set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.email).to.equal(user.email);
        (0, _chai.expect)(res.body.firstName).to.equal(user.firstName);
        (0, _chai.expect)(res.body.lastName).to.equal(user.lastName);
        (0, _chai.expect)(res.body.password).to.equal(undefined); // Password should be removed.
        done();
      }).catch(done);
    });

    it('should report error with message - Not found, when user does not exists', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/users/56c787ccc67fc16ccc1a5e92').set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.error).to.equal('No such user exists!');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/users/:userId', function () {
    it('should update user details', function (done) {
      user.firstName = _faker2.default.name.firstName();
      (0, _supertestAsPromised2.default)(_index2.default).put('/api/users/' + user._id).set({ Authorization: 'Bearer ' + user.token }).send(user).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.email).to.equal(user.email);
        (0, _chai.expect)(res.body.firstName).to.equal(user.firstName);
        (0, _chai.expect)(res.body.lastName).to.equal(user.lastName);
        (0, _chai.expect)(res.body.password).to.equal(undefined); // Password should be removed.
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/users/', function () {
    it('should get all users', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/users').set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/users/', function () {
    it('should delete user', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).delete('/api/users/' + user._id).set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.email).to.equal(user.email);
        (0, _chai.expect)(res.body.firstName).to.equal(user.firstName);
        (0, _chai.expect)(res.body.lastName).to.equal(user.lastName);
        (0, _chai.expect)(res.body.password).to.equal(undefined); // Password should be removed.
        done();
      }).catch(done);
    });
  });

  describe('# Error Handling', function () {
    it('should handle mongoose CastError - Cast to ObjectId failed', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/users/56z787zzz67fc').set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.INTERNAL_SERVER_ERROR).then(function (res) {
        (0, _chai.expect)(res.body.error).to.contain('Cast to ObjectId failed');
        (0, _chai.expect)(res.body.error).to.contain('56z787zzz67fc');
        done();
      }).catch(done);
    });
  });
});