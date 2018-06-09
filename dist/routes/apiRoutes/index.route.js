'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./user.route');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _book = require('./book.route');

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
// router.get('/health-check', (req, res) =>
//   res.send('OK')
// );

// mount auth routes at /auth
router.use('/auth', _auth2.default);

// mount user routes at /api/users
router.use('/api/shop_users', _user2.default);

// mount book routes at /api/books
router.use('/api/books', _book2.default);

exports.default = router;
module.exports = exports['default'];