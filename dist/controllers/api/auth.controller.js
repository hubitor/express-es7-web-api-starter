'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _user = require('../../models/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
/**
 *  Returns jwt token and user details if valid email and password are provided
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {token, User}
 */
function login(req, res, next) {
  _user2.default.getByEmail(req.body.email).then(function (foundUser) {
    if (!foundUser.validPassword(req.body.password)) {
      var err = new _APIError2.default('User email and password combination do not match', _httpStatus2.default.UNAUTHORIZED);
      return next(err);
    }
    // const token = jwt.sign(foundUser.safeModel(), config.jwtSecret, {
    //   expiresIn: config.jwtExpiresIn
    // });
    return res.json({
      // token,
      user: foundUser.safeModel()
    });
  }).catch(function (err) {
    return next(new _APIError2.default(err.message, _httpStatus2.default.NOT_FOUND));
  });
}

/**
 * Register a new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * @returns {User}
 */
function register(req, res, next) {
  var user = new _user2.default(req.body);

  _user2.default.findOne({ email: req.body.email }).exec().then(function (foundUser) {
    if (foundUser) {
      return Promise.reject(new _APIError2.default('Email must be unique', _httpStatus2.default.CONFLICT));
    }
    user.password = user.generatePassword(req.body.password);
    return user.save();
  }).then(function (savedUser) {
    return res.json({
      user: savedUser.safeModel()
    });
  }).catch(function (e) {
    return next(e);
  });
}

exports.default = { login: login, register: register };
module.exports = exports['default'];