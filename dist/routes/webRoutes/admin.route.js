'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _admin = require('../../controllers/admin.controller');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

// import validate from 'express-validation';
// import Joi from 'joi';
router.route('/admin/memberlist')
/** GET /- Homepage */
.get(_admin2.default.memberlist);

router.route('/admin/memberlist-datatable')
/** GET /- Homepage */
.get(_admin2.default.memberlistDatatable);

exports.default = router;
module.exports = exports['default'];