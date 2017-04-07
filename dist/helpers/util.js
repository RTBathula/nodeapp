"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._isJSON = exports.validateEmail = exports.hasWhiteSpace = exports.getConfigKeys = exports.getPort = exports.isProduction = undefined;

var _keys = require("../config/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isProduction = exports.isProduction = function isProduction() {
    if (process.env.PORT) {
        return true;
    }

    return false;
};

var getPort = exports.getPort = function getPort() {
    if (isProduction()) {
        return process.env.PORT;
    }

    return 1447;
};

var getConfigKeys = exports.getConfigKeys = function getConfigKeys() {

    if (isProduction()) {
        return _keys2.default["production"];
    }

    return _keys2.default["development"];
};

var hasWhiteSpace = exports.hasWhiteSpace = function hasWhiteSpace(txt) {
    return (/^ *$/.test(txt)
    );
};

var validateEmail = exports.validateEmail = function validateEmail(email) {
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return expr.test(email);
};

var _isJSON = exports._isJSON = function _isJSON(json) {
    //String
    if (json && typeof json === "string") {
        try {
            JSON.parse(json);
            return true;
        } catch (e) {
            return false;
        }
    }

    return false;
};
//# sourceMappingURL=util.js.map