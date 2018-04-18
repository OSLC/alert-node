'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearSession = exports.getSession = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getSession = exports.getSession = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(storage) {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _storage.getData)(storage);

          case 2:
            data = _context.sent;
            return _context.abrupt('return', data.session || null);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getSession(_x) {
    return _ref.apply(this, arguments);
  };
}();

var clearSession = exports.clearSession = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(storage) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _storage.updateStorage)(storage, function (data) {
              return (0, _extends3.default)({}, data, { session: null });
            });

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function clearSession(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.saveSession = saveSession;

var _storage = require('./storage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveSession(storage) {
  var _this = this;

  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(session) {
      var data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _storage.updateStorage)(storage, function (data) {
                return (0, _extends3.default)({}, data, { session: session });
              });

            case 2:
              data = _context2.sent;
              return _context2.abrupt('return', data.session);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
}