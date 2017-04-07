'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _util = require('./helpers/util');

var util = _interopRequireWildcard(_util);

var _mongo = require('./databases/mongo');

var _company = require('./routes/company');

var _company2 = _interopRequireDefault(_company);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.configKeys = util.getConfigKeys();

//Routes

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use(_express2.default.static(__dirname));

//Connect mongoDB
_connectMongoDB();

//Routes
_routes();

app.get('/', function (req, res, next) {
	return res.status(200).send("Clearhaus App runing on PORT:" + util.getPort());
});

app.set('port', util.getPort());
var server = app.listen(app.get('port'), function () {
	console.log("Clearhaus App runing on PORT:" + app.get('port'));
});

//Private Fuctions
function _connectMongoDB() {

	(0, _mongo.connect)().then(function (mongoCon) {
		global.mongoCon = mongoCon;
	}, function (error) {
		throw error;
	});
}

function _routes() {
	app.use('/', (0, _company2.default)());
}
//# sourceMappingURL=server.js.map