'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _home = require('../../controllers/home.controller');

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

// import validate from 'express-validation';
// import Joi from 'joi';
router.route('/')
/** GET /- Homepage */
.get(_home2.default.index);

exports.default = router;
module.exports = exports['default'];