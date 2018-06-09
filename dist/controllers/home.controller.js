'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Homepage
 */
function index(req, res, next) {
  // res.send('Welcome!!!');
  res.render('home/index', {
    title: 'Welcome'
  });
}

exports.default = { index: index };
module.exports = exports['default'];