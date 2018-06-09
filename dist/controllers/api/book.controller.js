'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _user = require('../../models/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load book and append to req.
 */
function load(req, res, next, id) {
  _user2.default.get(id).then(function (book) {
    req.book = book; // eslint-disable-line no-param-reassign
    return next();
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get book
 * @returns {Book}
 */
function get(req, res) {
  return res.json(req.book);
}

/**
 * Create new book
 * @property {string} req.body.bookName - The name of book.
 * @property {string} req.body.author - Author name of book.
 * @property {string} req.body.isbn- The isbn of book.
 * @returns {Book}
 */
function create(req, res, next) {
  var book = new _user2.default(req.body);
  book.owner = res.locals.session._id;

  _user2.default.findOne({ bookName: book.bookName }).exec().then(function (foundBook) {
    if (foundBook) {
      return Promise.reject(new _APIError2.default('Book name must be unique', _httpStatus2.default.CONFLICT, true));
    }
    return book.save();
  }).then(function (savedBook) {
    return res.json(savedBook);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Update existing book
 * @property {string} req.body.bookName - The name of book.
 * @property {string} req.body.author - Author name of book.
 * @property {string} req.body.isbn- The isbn of book.
 * @returns {Book}
 */
function update(req, res, next) {
  var book = req.book;
  book.bookName = req.body.bookName || book.bookName;
  book.author = req.body.author || book.author;
  book.isbn = req.body.isbn || book.isbn;
  book.save().then(function (savedBook) {
    return res.json(savedBook);
  }).catch(function (e) {
    return next(new _APIError2.default(e.message, _httpStatus2.default.CONFLICT, true));
  });
}

/**
 * Get book list.
 * @returns {Book[]}
 */
function list(req, res, next) {
  _user2.default.list().then(function (books) {
    return res.json(books);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Delete book.
 * @returns {Book}
 */
function remove(req, res, next) {
  var book = req.book;
  book.remove().then(function (deletedBook) {
    return res.json(deletedBook);
  }).catch(function (e) {
    return next(e);
  });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
module.exports = exports['default'];