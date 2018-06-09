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

var _auth = require('../../controllers/api/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap
var paramValidation = {
  login: {
    body: {
      email: _joi2.default.string().email().required(),
      password: _joi2.default.string().required()
    }
  },
  registerUser: {
    body: {
      email: _joi2.default.string().email().required(),
      password: _joi2.default.string().required(),
      firstName: _joi2.default.string(),
      lastName: _joi2.default.string()
    }
  }
};

/** POST /auth/login - Returns token if correct username and password is provided */
router.route('/login').post((0, _expressValidation2.default)(paramValidation.login), _auth2.default.login);

/** POST /auth/register - Register a new user */
router.route('/register').post((0, _expressValidation2.default)(paramValidation.registerUser), _auth2.default.register);

exports.default = router;
module.exports = exports['default'];