/*
 * @Author: Tidusvn05
 * @Date: 2018-05-29 15:22:01
 * @Last Modified by: Tidusvn05
 * @Last Modified time: 2018-05-29 16:47:21
 */
import userModel from '../models/user.model';
import { buildDatatablesBuilder } from '../helpers/db';

/**
 * Homepage
 */
function memberlist(req, res, next) {

  res.render('admin/memberlist', {
    title: 'Users',
    pageTitle: ''
  }); //{ noContentHeader: true }
}

function memberlistDatatable(req, res) {
  const datatablesBuilder = buildDatatablesBuilder(req);

  userModel.dataTables(datatablesBuilder, function(err, table) {
    res.json({
      data: table.data,
      recordsFiltered: table.total,
      recordsTotal: table.total
    });
  });
}

export default { memberlist, memberlistDatatable };
