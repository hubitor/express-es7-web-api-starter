'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../../models/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  _user2.default.get(id).then(function (user) {
    req.user = user; // eslint-disable-line no-param-reassign
    return next();
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user.safeModel());
}

/**
 * Get user profile of logged in user
 * @returns {User}
 */
function getProfile(req, res, next) {
  _user2.default.get(res.locals.session._id).then(function (user) {
    return res.json(user.safeModel());
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Update existing user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * @returns {User}
 */
function update(req, res, next) {
  var user = req.user;
  user.email = req.body.email;
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;

  user.save().then(function (savedUser) {
    return res.json(savedUser.safeModel());
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$limit = _req$query.limit,
      limit = _req$query$limit === undefined ? 50 : _req$query$limit,
      _req$query$skip = _req$query.skip,
      skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _user2.default.list({ limit: limit, skip: skip }).then(function (users) {
    return res.json(users);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  var user = req.user;
  user.remove().then(function (deletedUser) {
    return res.json(deletedUser.safeModel());
  }).catch(function (e) {
    return next(e);
  });
}

exports.default = { load: load, get: get, getProfile: getProfile, update: update, list: list, remove: remove };
module.exports = exports['default'];