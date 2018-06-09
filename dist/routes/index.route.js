'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./apiRoutes/index.route');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./webRoutes/index.route');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

// router.get('');
// For web
router.use('/', _index4.default);

// For api
router.use('/', _index2.default);

exports.default = router;
module.exports = exports['default'];