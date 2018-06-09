'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _expressWinston = require('express-winston');

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _winston = require('./winston');

var _winston2 = _interopRequireDefault(_winston);

var _index = require('../routes/index.route');

var _index2 = _interopRequireDefault(_index);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import expressJwt from 'express-jwt';

// For web config


_dotenv2.default.config();

var app = (0, _express2.default)();

if (process.env.env === 'development') {
  app.use((0, _morgan2.default)('dev'));
}

// parse body params and attache them to req.body
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use((0, _cookieParser2.default)());
app.use((0, _compression2.default)());
app.use((0, _methodOverride2.default)());

var RedisStore = require('connect-redis')(_expressSession2.default);
app.use((0, _expressSession2.default)({
  store: new RedisStore({
    // db: 999,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// setup views
app.set('views', _path2.default.join(__dirname, '../views'));
app.set('view engine', 'pug');

// secure apps by setting various HTTP headers
app.use((0, _helmet2.default)());

// enable CORS - Cross Origin Resource Sharing
app.use((0, _cors2.default)());

// enable detailed API logging in dev env
if (process.env.env === 'development') {
  _expressWinston2.default.requestWhitelist.push('body');
  _expressWinston2.default.responseWhitelist.push('body');
  app.use(_expressWinston2.default.logger({
    winstonInstance: _winston2.default,
    meta: false, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// app.use('/api', expressJwt({ secret: process.env.jwtSecret }));
// app.use('/api', (req, res, next) => {
//   const authorization = req.header('authorization');
//   res.locals.session = JSON.parse(new Buffer((authorization.split(' ')[1]).split('.')[1], 'base64').toString()); // eslint-disable-line no-param-reassign
//   next();
// });

/**
 * Check authenticate via session for admin role from bizbot
 */
app.use('/admin', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, userModel, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("-----------");
            console.log(req.session);

            if (!req.session.admin) {
              _context.next = 6;
              break;
            }

            next();
            _context.next = 21;
            break;

          case 6:
            token = req.query.token;

            if (!token) {
              _context.next = 20;
              break;
            }

            console.log('token: ' + token);
            userModel = require('../models/user.model');
            _context.next = 12;
            return userModel.findOne({
              appToken: token
            });

          case 12:
            user = _context.sent;

            console.log(user);
            console.log('admin role: ' + userModel.ROLES.admin);

            if (!(user && user.role === userModel.ROLES.admin)) {
              _context.next = 20;
              break;
            }

            console.log('save session');
            req.session.admin = user.transform();
            next();
            return _context.abrupt('return');

          case 20:

            // else
            res.status(406).send('Not Acceptable!');

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

// Validate hook
app.use('/hook', function (req, res, next) {
  console.log('hokkkkk');
  console.log(req.body.token);
  if (process.env.hookSecretKey === req.body.token) {
    next();
  }
});

// mount all routes on / path
app.use('/', _index2.default);

// if error is not an instanceOf APIError, convert it.
app.use(function (err, req, res, next) {
  if (err instanceof _expressValidation2.default.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    var unifiedErrorMessage = err.errors.map(function (error) {
      return error.messages.join('. ');
    }).join(' and ');
    return res.status(err.status).json({
      error: unifiedErrorMessage,
      stack: process.env.env === 'development' ? err.stack : {}
    });
  } else if (!(err instanceof _APIError2.default)) {
    return res.status(err.status || _httpStatus2.default.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      stack: process.env.env === 'development' ? err.stack : {}
    });
  }
  return next(err);
});

// catch 404 and forward to error handler
// app.use((req, res, next) => res.status(httpStatus.NOT_FOUND).json({ error: 'API not found' })); // eslint-disable-line no-unused-vars

// log error in winston transports except when executing test suite
if (process.env.env !== 'test') {}
/* app.use(expressWinston.errorLogger({
  winstonInstance
}));*/


// error handler, send stacktrace only during development
// app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
//   res.status(err.status).json({
//     error: err.isPublic ? err.message : httpStatus[err.status],
//     stack: process.env.env === 'development' ? err.stack : {}
//   })
// );

exports.default = app;
module.exports = exports['default'];