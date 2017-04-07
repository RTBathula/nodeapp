'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _company = require('../validations/company');

var validate = _interopRequireWildcard(_company);

var _company2 = require('../services/company');

var _company3 = _interopRequireDefault(_company2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
//Services


var companyRoute = function companyRoute() {

    app.post('/company', validate.createNew, function (req, res, next) {

        var newCompanyObj = req.body;

        _company3.default.createNew(newCompanyObj).then(function (result) {
            return res.status(200).json(result);
        }, function (error) {
            return res.status(400).json(error);
        });
    });

    app.get('/company/:id', validate.getDetails, function (req, res, next) {

        var companyId = req.params.id;

        _company3.default.getDetails(companyId).then(function (result) {
            return res.status(200).json(result);
        }, function (error) {
            return res.status(400).json(error);
        });
    });

    app.get('/company', function (req, res, next) {

        var skip = 0; // default
        var limit = 999; // default

        if (req.query.skip && req.query.skip != "") {
            skip = parseInt(req.query.skip);
        }
        if (req.query.limit && req.query.limit != "") {
            limit = parseInt(req.query.limit);
        }

        _company3.default.getList(skip, limit).then(function (result) {
            return res.status(200).json(result);
        }, function (error) {
            return res.status(400).json(error);
        });
    });

    app.put('/company/:id/update-company', validate.updateCompany, function (req, res, next) {

        var companyId = req.params.id;
        var updateCompanyObj = req.body;

        _company3.default.updateCompany(companyId, updateCompanyObj).then(function (result) {
            return res.status(200).json(result);
        }, function (error) {
            return res.status(400).json(error);
        });
    });

    app.put('/company/:id/add-beneficial', validate.addBeneficial, function (req, res, next) {

        var companyId = req.params.id;
        var addBeneficialObj = req.body;

        _company3.default.addBeneficial(companyId, addBeneficialObj).then(function (result) {
            return res.status(200).json(result);
        }, function (error) {
            return res.status(400).json(error);
        });
    });

    return app;
};

exports.default = companyRoute;
//# sourceMappingURL=company.js.map