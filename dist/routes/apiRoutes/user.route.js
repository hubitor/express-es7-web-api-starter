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

var _user = require('../../controllers/api/user.controller');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap
var paramValidation = {
  updateUser: {
    body: {
      email: _joi2.default.string().required(),
      firstName: _joi2.default.string(),
      lastName: _joi2.default.string()
    }
  }
};

router.route('/')
/** GET /api/users - Get list of users */
.get(_user2.default.list);

router.route('/profile')
/** GET /api/users/profile - Get profile of logged in user */
.get(_user2.default.getProfile);

router.route('/:userId')
/** GET /api/users/:userId - Get user */
.get(_user2.default.get)

/** PUT /api/users/:userId - Update user */
.put((0, _expressValidation2.default)(paramValidation.updateUser), _user2.default.update)

/** DELETE /api/users/:userId - Delete user */
.delete(_user2.default.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', _user2.default.load);

exports.default = router;
module.exports = exports['default'];