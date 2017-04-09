'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var companyService = {

  /*Desc   : Create new company
    Params : {name,address,city,country,email,phone,directors[],beneficials[]}
    Returns: Promise
             Resolve->saved success message
             Reject->Error on find() or company name already exist or save()
  */
  createNew: function createNew(newCompanyObj) {

    var deferred = _q2.default.defer();
    var response = {};

    try {
      var collection = global.mongoCon.collection("company");

      newCompanyObj.name = newCompanyObj.name.trim();

      collection.find({ name: newCompanyObj.name }).limit(1).next(function (err, respDoc) {
        if (err) {
          response.status = "error";
          response.message = "Something went wrong. Please try after sometime";
          deferred.reject(response);
        }
        if (respDoc) {
          response.status = "error";
          response.message = "Company with given name is already exist.";
          deferred.reject(response);
        }
        if (!respDoc) {
          newCompanyObj._id = new _mongodb2.default.ObjectId();
          newCompanyObj.createdAt = new Date().getTime();
          newCompanyObj.updatedAt = new Date().getTime();

          collection.insertOne(newCompanyObj, function (err, doc) {
            if (err) {
              response.status = "error";
              response.message = "Unable to create new company. Please try after sometime";
              deferred.reject(response);
            } else {
              response.status = "success";
              response.message = "Successfully created a company";
              response.data = newCompanyObj;
              deferred.resolve(response);
            }
          });
        }
      });
    } catch (err) {
      response.status = "error";
      response.message = err;
      deferred.reject(response);
    }

    return deferred.promise;
  },

  /*Desc   : Get company details
    Params : company id
    Returns: Promise
             Resolve->company details
             Reject->Error on find() or document not found
  */
  getDetails: function getDetails(companyId) {

    var deferred = _q2.default.defer();
    var response = {};

    try {

      var collection = global.mongoCon.collection("company");

      collection.find({ _id: new _mongodb2.default.ObjectId(companyId) }).limit(1).next(function (err, respDoc) {
        if (err || !respDoc) {
          response.status = "error";
          response.message = "Unable to find company with given company id. Please check company id!";
          deferred.reject(response);
        }

        response.status = "success";
        response.message = "Successfully fetched the company details";
        response.data = respDoc;
        deferred.resolve(response);
      });
    } catch (err) {
      response.status = "error";
      response.message = err;
      deferred.reject(response);
    }

    return deferred.promise;
  },

  /*Desc   : Get company list
    Params : skip,limit
    Returns: Promise
             Resolve->company list
             Reject->Error on find()
  */
  getList: function getList(skip, limit) {

    var deferred = _q2.default.defer();
    var response = {};

    try {

      var collection = global.mongoCon.collection("company");

      collection.find().skip(skip).limit(limit).toArray(function (err, docs) {
        if (err) {
          response.status = "error";
          response.message = "Unable to get the company list.";
          deferred.reject(response);
        }

        response.status = "success";
        response.message = "Successfully fetched the company list";
        response.data = docs;
        deferred.resolve(response);
      });
    } catch (err) {
      response.status = "error";
      response.message = err;
      deferred.reject(response);
    }

    return deferred.promise;
  },

  /*Desc   : Update company info
    Params : companyId, {address,city,country,email,phone}
    Returns: Promise
             Resolve->new company
             Reject->Error on findOneAndUpdate()
  */
  updateCompany: function updateCompany(companyId, updateCompanyObj) {

    var deferred = _q2.default.defer();
    var response = {};

    try {

      var collection = global.mongoCon.collection("company");

      var updateObj = {};
      updateObj.updatedAt = new Date().getTime();
      if (updateCompanyObj.country) {
        updateObj.address = updateCompanyObj.address;
      }
      if (updateCompanyObj.city) {
        updateObj.city = updateCompanyObj.city;
      }
      if (updateCompanyObj.country) {
        updateObj.country = updateCompanyObj.country;
      }
      if (updateCompanyObj.email) {
        updateObj.email = updateCompanyObj.email;
      }
      if (updateCompanyObj.phone) {
        updateObj.phone = updateCompanyObj.phone;
      }

      collection.findOneAndUpdate({ _id: new _mongodb2.default.ObjectId(companyId) }, { $set: updateObj }, { returnOriginal: false }, function (err, resp) {
        if (err) {
          response.status = "error";
          response.message = "Unable to update the company with given company id and update object.";
          deferred.reject(response);
        }

        response.status = "success";
        response.message = "Successfully update the company";
        response.data = resp.value;
        deferred.resolve(response);
      });
    } catch (err) {
      response.status = "error";
      response.message = err;
      deferred.reject(response);
    }

    return deferred.promise;
  },

  /*Desc   : Add beneficial
    Params : companyId, {name,email}
    Returns: Promise
             Resolve->new company
             Reject->Error on findOneAndUpdate()
  */
  addBeneficial: function addBeneficial(companyId, addBeneficialObj) {

    var deferred = _q2.default.defer();
    var response = {};

    try {

      var collection = global.mongoCon.collection("company");

      //Check if already beneficial owner exist with email         
      var checkBenficialExistQuery = {
        "$elemMatch": {
          email: addBeneficialObj.email
        }
      };

      collection.find({ _id: new _mongodb2.default.ObjectId(companyId), beneficials: checkBenficialExistQuery }).limit(1).next(function (err, respDoc) {
        if (err) {
          response.status = "error";
          response.message = "Unable to add beneficial. please retry";
          deferred.reject(response);
        }
        if (respDoc) {
          response.status = "error";
          response.message = "Beneficial already exist with email:" + addBeneficialObj.email;
          deferred.reject(response);
        }
        if (!respDoc) {

          var updateObj = {
            updatedAt: new Date().getTime()
          };

          var pushObj = {
            beneficials: {
              name: addBeneficialObj.name,
              email: addBeneficialObj.email
            }
          };

          collection.findOneAndUpdate({ _id: new _mongodb2.default.ObjectId(companyId) }, { $set: updateObj, $push: pushObj }, { returnOriginal: false }, function (err, resp) {
            if (err) {
              response.status = "error";
              response.message = "Unable to add the beneficial with given company id and beneficial object.";
              deferred.reject(response);
            }

            response.status = "success";
            response.message = "Successfully added the new beneficial";
            response.data = addBeneficialObj;
            deferred.resolve(response);
          });
        }
      });
    } catch (err) {
      response.status = "error";
      response.message = err;
      deferred.reject(response);
    }

    return deferred.promise;
  }
};

exports.default = companyService;
//# sourceMappingURL=company.js.map