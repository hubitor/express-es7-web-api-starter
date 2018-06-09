'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _home = require('./home.route');

var _home2 = _interopRequireDefault(_home);

var _admin = require('./admin.route');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', function (req, res) {
  return res.send('OK');
});

// mount auth routes at /auth
router.use('/', _home2.default);

router.use('/', _admin2.default);

exports.default = router;
module.exports = exports['default'];