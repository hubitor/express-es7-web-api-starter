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

describe('## Book APIs', function () {
  var user = {
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password(),
    firstName: _faker2.default.name.firstName(),
    lastName: _faker2.default.name.lastName()
  };

  var book = {
    bookName: _faker2.default.name.findName(),
    author: _faker2.default.name.findName(),
    // isbn: faker.random.alphaNumeric(11),
    isbn: Math.random().toString(36).substr(11, 13)
  };
  console.log(user);
  describe('# POST /auth/register', function () {
    it('should create a new user for creating book', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post('/auth/register').send(user).expect(_httpStatus2.default.OK).then(function (res) {
        // console.log(res.body);
        // expect(res.body.token).to.not.equal('');
        // expect(res.body.token).to.not.equal(undefined);
        (0, _chai.expect)(res.body.user.email).to.equal(user.email);
        // expect(res.body.user.firstName).to.equal(user.firstName);
        // expect(res.body.user.lastName).to.equal(user.lastName);
        // expect(res.body.user.password).to.equal(undefined); // Password should be removed.
        user = res.body.user;
        // user.token = res.body.token;
        done();
      }).catch(done);
    });
  });

  describe('# POST /api/books', function () {
    it('should create a new book', function (done) {
      book.owner = user._id; // Setting created user as owner.
      (0, _supertestAsPromised2.default)(_index2.default).post('/api/books').send(book).set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.OK).then(function (res) {
        console.log(res.body);
        (0, _chai.expect)(res.body.owner).to.equal(book.owner);
        (0, _chai.expect)(res.body.bookName).to.equal(book.bookName);
        (0, _chai.expect)(res.body.author).to.equal(book.author);
        (0, _chai.expect)(res.body.isbn).to.equal(book.isbn);
        book = res.body;
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/books/:bookId', function () {
    it('should get book details', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/books/' + book._id).set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.owner._id).to.equal(user._id);
        (0, _chai.expect)(res.body.bookName).to.equal(book.bookName);
        (0, _chai.expect)(res.body.author).to.equal(book.author);
        (0, _chai.expect)(res.body.isbn).to.equal(book.isbn);
        done();
      }).catch(done);
    });

    it('should report error with message - Not found, when book does not exists', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/books/56c787ccc67fc16ccc1a5e92').set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.error).to.equal('No such book exists!');
        done();
      }).catch(done);
    });
  });

  describe('# PUT /api/books/:bookId', function () {
    it('should update book details', function (done) {
      book.bookName = _faker2.default.name.findName();
      (0, _supertestAsPromised2.default)(_index2.default).put('/api/books/' + book._id).set({ Authorization: 'Bearer ' + user.token }).send(book).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.owner._id).to.equal(user._id);
        (0, _chai.expect)(res.body.bookName).to.equal(book.bookName);
        (0, _chai.expect)(res.body.author).to.equal(book.author);
        (0, _chai.expect)(res.body.isbn).to.equal(book.isbn);
        done();
      }).catch(done);
    });
  });

  describe('# GET /api/books/', function () {
    it('should get all books', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/books').set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/books/', function () {
    it('should delete book', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).delete('/api/books/' + book._id).set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.owner._id).to.equal(user._id);
        (0, _chai.expect)(res.body.bookName).to.equal(book.bookName);
        (0, _chai.expect)(res.body.author).to.equal(book.author);
        (0, _chai.expect)(res.body.isbn).to.equal(book.isbn);
        done();
      }).catch(done);
    });
  });

  describe('# Error Handling', function () {
    it('should handle express validation error - isbn is required', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post('/api/books').send({
        bookName: _faker2.default.name.findName(),
        author: _faker2.default.name.findName(),
        owner: user._id
      }).set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.BAD_REQUEST).then(function (res) {
        (0, _chai.expect)(res.body.error).to.equal('"isbn" is required');
        done();
      }).catch(done);
    });
  });

  describe('# DELETE /api/users/', function () {
    it('should delete user after done with books testing', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).delete('/api/users/' + user._id).set({ Authorization: 'Bearer ' + user.token }).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.email).to.equal(user.email);
        (0, _chai.expect)(res.body.firstName).to.equal(user.firstName);
        (0, _chai.expect)(res.body.lastName).to.equal(user.lastName);
        (0, _chai.expect)(res.body.password).to.equal(undefined); // Password should be removed.
        done();
      }).catch(done);
    });
  });
});