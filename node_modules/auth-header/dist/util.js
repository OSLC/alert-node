'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var token = /^[^\u0000-\u001F\u007F()<>@,;:\\"/?={}\[\]\u0020\u0009]+$/;

var isToken = exports.isToken = function isToken(str) {
  return typeof str === 'string' && token.test(str);
};
var isScheme = exports.isScheme = isToken;
var quote = exports.quote = function quote(str) {
  return '"' + str.replace(/"/g, '\\"') + '"';
};
var unquote = exports.unquote = function unquote(str) {
  return str.substr(1, str.length - 2).replace(/\\"/g, '"');
};
//# sourceMappingURL=util.js.map