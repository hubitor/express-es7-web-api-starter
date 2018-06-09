'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ActionLog Schema
 */
var ActionLogSchema = new _mongoose2.default.Schema({
  user: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  customer: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Customer',
    index: true
  },
  type: {
    type: String, // regist
    index: true
  },
  targetId: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    index: true
  },
  note: String

}, {
  timestamps: true,
  collection: 'actionLogs'
});

/**
 * - pre-post-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ActionLogSchema.method({});

/**
 * Statics
 */
ActionLogSchema.statics = {};

/**
 * @typedef ActionLog
 */
exports.default = _mongoose2.default.model('ActionLog', ActionLogSchema);
module.exports = exports['default'];