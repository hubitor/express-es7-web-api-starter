'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _book = require('../../controllers/api/book.controller');

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap
var paramValidation = {
  createBook: {
    body: {
      bookName: _joi2.default.string().required(),
      author: _joi2.default.string().required(),
      isbn: _joi2.default.string().min(10).max(13).required()
    }
  },
  updateBook: {
    params: {
      bookId: _joi2.default.string().required()
    },
    body: {
      bookName: _joi2.default.string().required(),
      author: _joi2.default.string().required(),
      isbn: _joi2.default.string().min(10).max(13).required()
    }
  }
};

router.route('/')
/** GET /api/books - Get list of books */
.get(_book2.default.list)

/** POST /api/books - Create new book */
.post((0, _expressValidation2.default)(paramValidation.createBook), _book2.default.create);

router.route('/:bookId')
/** GET /api/books/:bookId - Get book */
.get(_book2.default.get)

/** PUT /api/books/:bookId - Update book */
.put((0, _expressValidation2.default)(paramValidation.updateBook), _book2.default.update)

/** DELETE /api/books/:bookId - Delete book */
.delete(_book2.default.remove);

/** Load book when API with bookId route parameter is hit */
router.param('bookId', _book2.default.load);

exports.default = router;
module.exports = exports['default'];