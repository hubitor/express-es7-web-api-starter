'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROLES = undefined;

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseDatatables = require('mongoose-datatables');

var _mongooseDatatables2 = _interopRequireDefault(_mongooseDatatables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * User Roles
 */
var ROLES = exports.ROLES = {
  admin: 1,
  mod: 2,
  user: 3
};

/**
 * User Schema
 * @private
 */
/*
 * @Author: Tidusvn05
 * @Date: 2017-12-20 22:19:11
 * @Last Modified by: Tidusvn05
 * @Last Modified time: 2018-05-30 00:26:59
 */
var schema = new _mongoose2.default.Schema({
  id: {
    type: String,
    // required: true,
    minlength: 3,
    maxlength: 128
  },
  channelId: {
    type: String
  },
  channelName: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true
  }, // will remove in future
  // And using new full profile.
  profile: {
    name: String,
    address: String,
    gender: String,
    avatar: String,
    timezone: String,
    country: String,
    countryCode: String,
    relationship: Number
  },
  gProfile: Object, // full profile from google
  channels: Object,
  messageAddress: Object,
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true
  },
  address: {
    type: String
  },
  oauth: {
    type: Object
  },
  age: Number,
  relationship: Number,
  lastSyncedAt: Date, // last time sync data from gogle calendar.
  // Use populate to access ref log.
  logs: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'UserLog'
  }],
  alertsTo: Array,
  role: Number,
  countryCode: String,
  timezone: String,
  stats: Object, // store stats analytic from google calendars
  hasConfirmedInfo: {
    type: Boolean,
    default: false
  },
  linkedToUserId: _mongoose2.default.Schema.Types.ObjectId,
  gmtOffset: {
    type: Number,
    index: true
  },
  appToken: {
    type: String, // token to access app.bizbot.io
    index: true
  }

}, {
  timestamps: true,
  collection: 'users'
});

schema.statics = {

  ROLES: ROLES

};

/**
 * Protected Methods
 */
schema.method({
  transform: function transform() {
    var _this = this;

    var transformed = {};
    var fields = ['_id', 'profile', 'role', 'appToken'];

    fields.forEach(function (field) {
      transformed[field] = _this[field];
    });

    return transformed;
  }
});

schema.plugin(_mongooseDatatables2.default);
/**
 * @typedef User
 */
module.exports = _mongoose2.default.model('User', schema);