'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = function () {
  /**
   * @param options {Object}
   *
   * @param options.idp {string} Identity provider (issuer of ID Token)
   *
   * @param options.clientId {string} Relying Party client_id
   *
   * @param options.sessionKey {string} Serialized client session key generated
   *   during the Authentication Request, used to issue PoPTokens
   *
   * @param options.decoded {IDToken} Decoded/verified ID Token JWT
   *
   * @param options.accessToken {string} Compact-serialized access_token param
   *
   * @param options.idToken {string} Compact-serialized id_token param
   */
  function Session(options) {
    _classCallCheck(this, Session);

    this.idp = options.idp;
    this.clientId = options.clientId;
    this.sessionKey = options.sessionKey;
    this.decoded = options.decoded;

    // Raw (string-encoded) tokens
    this.accessToken = options.accessToken;
    this.idToken = options.idToken;
  }

  /**
   * @param response {AuthenticationResponse}
   *
   * @returns {Session}
   */


  _createClass(Session, null, [{
    key: 'fromAuthResponse',
    value: function fromAuthResponse(response) {
      var RelyingParty = require('./RelyingParty'); // import here due to circular dep

      var payload = response.decoded.payload;
      var registration = response.rp.registration;
      var sessionKey = response.session[RelyingParty.SESSION_PRIVATE_KEY];

      var options = {
        sessionKey: sessionKey,
        idp: payload.iss,
        clientId: registration['client_id'],
        decoded: response.decoded,
        accessToken: response.params['access_token'],
        idToken: response.params['id_token']
      };

      return new Session(options);
    }
  }]);

  return Session;
}();

module.exports = Session;