'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineHandlers = exports.server = exports.client = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  This module describes a simple IPC interface for communicating between browser windows.
  Window.postMessage() is the transport interface, and a request/response interface
  is defined on top of it as follows:

  const request = {
    'solid-auth-client': {
      id: 'abcd-efgh-ijkl',
      method: 'doSomethingPlease',
      args: [ 'one', 'two', 'three' ]
    }
  }

  const response = {
    'solid-auth-client': {
      id: 'abcd-efgh-ijkl',
      ret: 'the_value'
    }
  }
*/

var NAMESPACE = 'solid-auth-client';


var namespace = function namespace(data) {
  return (0, _defineProperty3.default)({}, NAMESPACE, data);
};

var getNamespacedPayload = function getNamespacedPayload(eventData) {
  if (!eventData || (typeof eventData === 'undefined' ? 'undefined' : (0, _typeof3.default)(eventData)) !== 'object') {
    return null;
  }
  var payload = eventData[NAMESPACE];
  if (!payload || (typeof payload === 'undefined' ? 'undefined' : (0, _typeof3.default)(payload)) !== 'object') {
    return null;
  }
  return payload;
};

var getResponse = function getResponse(eventData) {
  var resp = getNamespacedPayload(eventData);
  if (!resp) {
    return null;
  }
  var id = resp.id,
      ret = resp.ret;

  return id != null && typeof id === 'string' && resp.hasOwnProperty('ret') ? { id: id, ret: ret } : null;
};

var getRequest = function getRequest(eventData) {
  var req = getNamespacedPayload(eventData);
  if (!req) {
    return null;
  }
  var id = req.id,
      method = req.method,
      args = req.args;

  return id != null && typeof id === 'string' && typeof method === 'string' && Array.isArray(args) ? { id: id, method: method, args: args } : null;
};

var client = exports.client = function client(serverWindow, serverOrigin) {
  return function (request) {
    return new _promise2.default(function (resolve, reject) {
      var reqId = (0, _v2.default)();
      var responseListener = function responseListener(event) {
        var data = event.data,
            origin = event.origin;

        var resp = getResponse(data);
        if (serverOrigin !== '*' && origin !== serverOrigin || !resp) {
          return;
        }
        if (resp.id !== reqId) {
          return;
        }
        resolve(resp.ret);
        window.removeEventListener('message', responseListener);
      };
      window.addEventListener('message', responseListener);
      serverWindow.postMessage({
        'solid-auth-client': {
          id: reqId,
          method: request.method,
          args: request.args
        }
      }, serverOrigin);
    });
  };
};

var server = exports.server = function server(clientWindow, clientOrigin) {
  return function (handle) {
    var messageListener = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
        var data, origin, req, resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = event.data, origin = event.origin;
                req = getRequest(data);

                if (req) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return');

              case 4:
                if (!(origin !== clientOrigin)) {
                  _context.next = 7;
                  break;
                }

                console.warn('SECURITY WARNING: solid-auth-client is listening for messages from ' + clientOrigin + ', ' + ('but received a message from ' + origin + '.  Ignoring the message.'));
                return _context.abrupt('return');

              case 7:
                _context.next = 9;
                return handle(req);

              case 9:
                resp = _context.sent;

                if (resp) {
                  clientWindow.postMessage(namespace(resp), clientOrigin);
                }

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function messageListener(_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    var _server = {
      start: function start() {
        window.addEventListener('message', messageListener);
        return _server;
      },
      stop: function stop() {
        window.removeEventListener('message', messageListener);
        return _server;
      }
    };
    return _server;
  };
};

var combineHandlers = exports.combineHandlers = function combineHandlers() {
  for (var _len = arguments.length, handlers = Array(_len), _key = 0; _key < _len; _key++) {
    handlers[_key] = arguments[_key];
  }

  return function (req) {
    return handlers.map(function (handler) {
      return handler(req);
    }).find(function (promise) {
      return promise !== null;
    });
  };
};