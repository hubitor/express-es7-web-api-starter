'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Login Required middleware.
 */
function buildDatatablesBuilder(req) {
  var builder = {};
  if (req.query.length) {
    builder.limit = req.query.length;
  }
  if (req.query.start) {
    builder.skip = req.query.start;
  }

  if (req.query.order && req.query.order.length > 0) {
    var order = req.query.order[0];
    var columns = req.query.columns;
    builder.sort = {};
    var orderColumnName = columns[order.column].name;
    builder.sort[orderColumnName] = order.dir === 'asc' ? 1 : -1;
  }

  return builder;
}

exports.buildDatatablesBuilder = buildDatatablesBuilder;