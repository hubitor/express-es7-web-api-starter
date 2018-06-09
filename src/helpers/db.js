/**
 * Login Required middleware.
 */
function buildDatatablesBuilder(req) {
  const builder = {};
  if (req.query.length) {
    builder.limit = req.query.length;
  }
  if (req.query.start) {
    builder.skip = req.query.start;
  }

  if (req.query.order && req.query.order.length > 0) {
    const order = req.query.order[0];
    const columns = req.query.columns;
    builder.sort = {};
    const orderColumnName = columns[order.column].name;
    builder.sort[orderColumnName] = order.dir === 'asc' ? 1 : -1;
  }

  return builder;
}

export { buildDatatablesBuilder };
