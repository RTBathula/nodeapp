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

app.use(function (req, res, next) {
	//if req body is a string, convert it to JSON.
	if (req.text && _isJSON(req.text)) {
		req.body = JSON.parse(req.text);
	}

	if (req.body && typeof req.body === "string" && _isJSON(req.body)) {
		req.body = JSON.parse(req.body);
	}

	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	next();
});

//Connect mongoDB
_connectMongoDB();

//Routes
_routes();

app.get('/', function (req, res, next) {
	return res.status(200).send("Clearhaus API nodeapp up and running");
});

app.set('port', util.getPort());
var server = app.listen(app.get('port'), function () {
	console.log("Clearhaus API nodeapp up and running on PORT:" + app.get('port'));
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