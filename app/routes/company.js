import express  from 'express'
import * as validate  from '../validations/company'
//Services
import companyService from '../services/company'

let app = express()

const companyRoute = function() {
   
    app.post('/company', validate.createNew, function(req,res,next) {	

    	let newCompanyObj = req.body 

        companyService.createNew(newCompanyObj).then(function(result){
        	return res.status(200).json(result)
        },function(error){
        	return res.status(400).json(error)
        })        
    }) 

    app.get('/company/:id', validate.getDetails, function(req,res,next) {   

        let companyId = req.params.id

        companyService.getDetails(companyId).then(function(result){
            return res.status(200).json(result)
        },function(error){
            return res.status(400).json(error)
        })        
    }) 

    app.get('/company', function(req,res,next) {   

        var skip  = 0 // default
        var limit = 999 // default

        if(req.query.skip && req.query.skip!=""){
            skip = parseInt(req.query.skip)
        }
        if(req.query.limit && req.query.limit!=""){
            limit = parseInt(req.query.limit)
        }

        companyService.getList(skip,limit).then(function(result){
            return res.status(200).json(result)
        },function(error){
            return res.status(400).json(error)
        })        
    })

    app.put('/company/:id/update-company', validate.updateCompany, function(req,res,next) {   

        let companyId        = req.params.id
        let updateCompanyObj = req.body

        companyService.updateCompany(companyId,updateCompanyObj).then(function(result){
            return res.status(200).json(result)
        },function(error){
            return res.status(400).json(error)
        })        
    })

    app.put('/company/:id/add-beneficial', validate.addBeneficial, function(req,res,next) {   

        let companyId        = req.params.id
        let addBeneficialObj = req.body

        companyService.addBeneficial(companyId,addBeneficialObj).then(function(result){
            return res.status(200).json(result)
        },function(error){
            return res.status(400).json(error)
        })        
    })       
    
    return app
}

export default companyRoute
