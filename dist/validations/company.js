"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addBeneficial = exports.updateCompany = exports.getDetails = exports.createNew = undefined;

var _util = require("../helpers/util");

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var createNew = exports.createNew = function createNew(req, res, next) {
    var newCompanyObj = req.body || null;
    var response = {
        status: "error"
    };

    //Validate
    if (!newCompanyObj || Object.prototype.toString.call(newCompanyObj) == "[object Null]") {
        response.message = "Invalid company object";
        return res.status(400).json(response);
    }

    if (newCompanyObj && (!newCompanyObj.name || newCompanyObj.name == "" || newCompanyObj.name && util.hasWhiteSpace(newCompanyObj.name))) {
        response.message = "Company name is required";
        return res.status(400).json(response);
    }

    if (newCompanyObj.name && newCompanyObj.name.length < 2) {
        response.message = "Company name should contain atleast of 2 letters";
        return res.status(400).json(response);
    }

    if (newCompanyObj && (!newCompanyObj.address || newCompanyObj.address == "" || newCompanyObj.address && util.hasWhiteSpace(newCompanyObj.address))) {
        response.message = "Company address is required";
        return res.status(400).json(response);
    }

    if (newCompanyObj.address && newCompanyObj.address.length < 2) {
        response.message = "Company address should contain atleast of 2 letters";
        return res.status(400).json(response);
    }

    if (newCompanyObj && (!newCompanyObj.city || newCompanyObj.city == "" || newCompanyObj.city && util.hasWhiteSpace(newCompanyObj.city))) {
        response.message = "Company city is required";
        return res.status(400).json(response);
    }

    if (newCompanyObj.city && newCompanyObj.city.length < 2) {
        response.message = "Company city should contain atleast of 2 letters";
        return res.status(400).json(response);
    }

    if (newCompanyObj && (!newCompanyObj.country || newCompanyObj.country == "" || newCompanyObj.country && util.hasWhiteSpace(newCompanyObj.country))) {
        response.message = "Company country is required";
        return res.status(400).json(response);
    }

    if (newCompanyObj.country && newCompanyObj.country.length < 2) {
        response.message = "Company country should contain atleast of 2 letters";
        return res.status(400).json(response);
    }

    if (newCompanyObj && newCompanyObj.email && !util.validateEmail(newCompanyObj.email)) {
        response.message = "Invalid company email";
        return res.status(400).json(response);
    }

    if (newCompanyObj && newCompanyObj.phone && newCompanyObj.phone.length < 9) {
        response.message = "Company phone should atleast of 9 digits";
        return res.status(400).json(response);
    }

    if (newCompanyObj && (!newCompanyObj.directors || newCompanyObj.directors.length == 0)) {
        response.message = "Atleast one company director is required";
        return res.status(400).json(response);
    }

    var uniqueDirectors = [];
    if (newCompanyObj.directors.length > 0) {
        for (var i = 0; i < newCompanyObj.directors.length; ++i) {
            var name = newCompanyObj.directors[i].name;
            var email = newCompanyObj.directors[i].email;

            if (uniqueDirectors.indexOf(email) > -1) {
                response.message = "Duplicate director email:" + email;
                return res.status(400).json(response);
            }

            if (!name || name == "" || name && util.hasWhiteSpace(name)) {
                response.message = "Director name is invalid";
                return res.status(400).json(response);
            }
            if (name && name.length < 2) {
                response.message = "Director name should contain atleast of 2 letters";
                return res.status(400).json(response);
            }

            if (!email || !util.validateEmail(email)) {
                response.message = "Invalid director email";
                return res.status(400).json(response);
            }

            uniqueDirectors.push(email);
        }
    }

    if (newCompanyObj && (!newCompanyObj.beneficials || newCompanyObj.beneficials.length == 0)) {
        response.message = "Atleast one company beneficial is required";
        return res.status(400).json(response);
    }

    var uniqueBeneficials = [];
    if (newCompanyObj.beneficials.length > 0) {
        for (var _i = 0; _i < newCompanyObj.beneficials.length; ++_i) {
            var _name = newCompanyObj.beneficials[_i].name;
            var _email = newCompanyObj.beneficials[_i].email;

            if (uniqueBeneficials.indexOf(_email) > -1) {
                response.message = "Duplicate beneficial email:" + _email;
                return res.status(400).json(response);
            }

            if (!_name || _name == "" || _name && util.hasWhiteSpace(_name)) {
                response.message = "Beneficial name is invalid";
                return res.status(400).json(response);
            }
            if (_name && _name.length < 2) {
                response.message = "Beneficial name should contain atleast of 2 letters";
                return res.status(400).json(response);
            }

            if (!_email || !util.validateEmail(_email)) {
                response.message = "Invalid beneficial email";
                return res.status(400).json(response);
            }

            uniqueBeneficials.push(_email);
        }
    }

    return next();
};

var getDetails = exports.getDetails = function getDetails(req, res, next) {
    var companyId = req.params.id || null;
    var response = {
        status: "error"
    };

    if (!companyId || companyId == "") {
        response.message = "Company id is required";
        return res.status(400).json(response);
    }

    return next();
};

var updateCompany = exports.updateCompany = function updateCompany(req, res, next) {
    var companyId = req.params.id || null;
    var updateCompanyObj = req.body || null;

    var response = {
        status: "error"
    };

    if (!companyId || companyId == "") {
        response.message = "Company id is required";
        return res.status(400).json(response);
    }

    //Validate
    if (!updateCompanyObj || Object.prototype.toString.call(updateCompanyObj) == "[object Null]") {
        response.message = "Invalid update company object";
        return res.status(400).json(response);
    }

    if (!updateCompanyObj.address && !updateCompanyObj.city && !updateCompanyObj.country && !updateCompanyObj.email && !updateCompanyObj.phone) {
        response.message = "Invalid update company object";
        return res.status(400).json(response);
    }

    if (updateCompanyObj.address && updateCompanyObj.address.length < 2) {
        response.message = "Company address should contain atleast of 2 letters";
        return res.status(400).json(response);
    }

    if (updateCompanyObj.city && updateCompanyObj.city.length < 2) {
        response.message = "Company city should contain atleast of 2 letters";
        return res.status(400).json(response);
    }

    if (updateCompanyObj.country && updateCompanyObj.country.length < 2) {
        response.message = "Company country should contain atleast of 2 letters";
        return res.status(400).json(response);
    }

    if (updateCompanyObj.email && !util.validateEmail(updateCompanyObj.email)) {
        response.message = "Invalid company email";
        return res.status(400).json(response);
    }

    if (updateCompanyObj.phone && updateCompanyObj.phone.length < 9) {
        response.message = "Company phone should atleast of 9 digits";
        return res.status(400).json(response);
    }

    return next();
};

var addBeneficial = exports.addBeneficial = function addBeneficial(req, res, next) {
    var companyId = req.params.id || null;
    var addBeneficialObj = req.body || null;

    var response = {
        status: "error"
    };

    if (!companyId || companyId == "") {
        response.message = "Company id is required";
        return res.status(400).json(response);
    }

    //Validate
    if (!addBeneficialObj || Object.prototype.toString.call(addBeneficialObj) == "[object Null]") {
        response.message = "Invalid add beneficial object";
        return res.status(400).json(response);
    }

    if (!addBeneficialObj.name || addBeneficialObj.name == "" || addBeneficialObj.name && util.hasWhiteSpace(addBeneficialObj.name)) {
        response.message = "Beneficial name is invalid";
        return res.status(400).json(response);
    }
    if (addBeneficialObj.name.length < 2) {
        response.message = "Beneficial name should contain atleast of 2 letters";
        return res.status(400).json(response);
    }

    if (!addBeneficialObj.email || !util.validateEmail(addBeneficialObj.email)) {
        response.message = "Invalid beneficial email";
        return res.status(400).json(response);
    }

    return next();
};
//# sourceMappingURL=company.js.map