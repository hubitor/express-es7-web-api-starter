'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _db = require('../helpers/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Homepage
 */
/*
 * @Author: Tidusvn05
 * @Date: 2018-05-29 15:22:01
 * @Last Modified by: Tidusvn05
 * @Last Modified time: 2018-05-29 16:47:21
 */
function memberlist(req, res, next) {

  res.render('admin/memberlist', {
    title: 'Users',
    pageTitle: ''
  }); //{ noContentHeader: true }
}

function memberlistDatatable(req, res) {
  var datatablesBuilder = (0, _db.buildDatatablesBuilder)(req);

  _user2.default.dataTables(datatablesBuilder, function (err, table) {
    res.json({
      data: table.data,
      recordsFiltered: table.total,
      recordsTotal: table.total
    });
  });
}

exports.default = { memberlist: memberlist, memberlistDatatable: memberlistDatatable };
module.exports = exports['default'];