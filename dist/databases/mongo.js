'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = undefined;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoClient = _mongodb2.default.MongoClient;

var connect = exports.connect = function connect() {

    var deferred = _q2.default.defer();

    try {

        mongoClient.connect(global.configKeys.mongodbConnectUri, function (err, db) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(db.db("clearhausdb"));
            }
        });
    } catch (e) {
        deferred.reject(e);
    }

    return deferred.promise;
};
//# sourceMappingURL=mongo.js.map