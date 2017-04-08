import * as util  from '../helpers/util'

export const createNew = (req, res, next) => { 	
	let newCompanyObj = req.body || null
    let response = {
    	status: "error"
    }   

    //Validate
    if(!newCompanyObj || Object.prototype.toString.call(newCompanyObj)=="[object Null]"){
    	response.message = "Invalid company object"
        return res.status(400).json(response)
    }

    if(newCompanyObj && (!newCompanyObj.name || newCompanyObj.name=="" || (newCompanyObj.name && util.hasWhiteSpace(newCompanyObj.name)))){  
        response.message = "Company name is required"
        return res.status(400).json(response)
    }

    if(newCompanyObj.name && (newCompanyObj.name.length<2)){       
        response.message = "Company name should contain atleast of 2 letters"
        return res.status(400).json(response)
    }

    if(newCompanyObj && (!newCompanyObj.address || newCompanyObj.address=="" || (newCompanyObj.address && util.hasWhiteSpace(newCompanyObj.address)))){
        response.message = "Company address is required"
        return res.status(400).json(response)
    }

    if(newCompanyObj.address && (newCompanyObj.address.length<2)){
        response.message = "Company address should contain atleast of 2 letters"
        return res.status(400).json(response)
    }

    if(newCompanyObj && (!newCompanyObj.city || newCompanyObj.city=="" || (newCompanyObj.city && util.hasWhiteSpace(newCompanyObj.city)))){
        response.message = "Company city is required"
        return res.status(400).json(response)
    }

    if(newCompanyObj.city && (newCompanyObj.city.length<2)){
        response.message = "Company city should contain atleast of 2 letters"
        return res.status(400).json(response)
    }

    if(newCompanyObj && (!newCompanyObj.country || newCompanyObj.country=="" || (newCompanyObj.country && util.hasWhiteSpace(newCompanyObj.country)))){
        response.message = "Company country is required"
        return res.status(400).json(response)
    }

    if(newCompanyObj.country && (newCompanyObj.country.length<2)){
        response.message = "Company country should contain atleast of 2 letters"
        return res.status(400).json(response)
    }

    if(newCompanyObj && (newCompanyObj.email && !util.validateEmail(newCompanyObj.email))){     
        response.message = "Invalid company email"
        return res.status(400).json(response)
    }

    if(newCompanyObj && (newCompanyObj.phone && newCompanyObj.phone.length<9)){
        response.message = "Company phone should atleast of 9 digits"
        return res.status(400).json(response)
    }   

    if(newCompanyObj && (!newCompanyObj.directors || newCompanyObj.directors.length==0)){        
        response.message = "Atleast one company director is required"
        return res.status(400).json(response)
    }

    let uniqueDirectors = []
    if(newCompanyObj.directors.length>0){
        for(let i=0;i<newCompanyObj.directors.length;++i){
        	let name  = newCompanyObj.directors[i].name
        	let email = newCompanyObj.directors[i].email

        	if(uniqueDirectors.indexOf(email)>-1){
        		response.message = "Duplicate director email:"+email
        		return res.status(400).json(response)
        	}

        	if(!name || name=="" || (name && util.hasWhiteSpace(name))){		
		        response.message = "Director name is invalid"
        		return res.status(400).json(response)
		    }
		    if(name && (name.length<2)){		     
		        response.message = "Director name should contain atleast of 2 letters"
        		return res.status(400).json(response)
		    }

		    if(!email || !util.validateEmail(email)){		       
		        response.message = "Invalid director email"
        		return res.status(400).json(response)
		    }

		    uniqueDirectors.push(email)
        }
    }

    if(newCompanyObj && (!newCompanyObj.beneficials  || newCompanyObj.beneficials.length==0)){    
        response.message = "Atleast one company beneficial is required"
       	return res.status(400).json(response)
    }

    let uniqueBeneficials = []
    if(newCompanyObj.beneficials.length>0){
        for(let i=0;i<newCompanyObj.beneficials.length;++i){
        	let name  = newCompanyObj.beneficials[i].name
        	let email = newCompanyObj.beneficials[i].email

        	if(uniqueBeneficials.indexOf(email)>-1){
        		response.message = "Duplicate beneficial email:"+email
        		return res.status(400).json(response)
        	}

        	if(!name || name=="" || (name && util.hasWhiteSpace(name))){		       
		        response.message = "Beneficial name is invalid"
       			return res.status(400).json(response)
		    }
		    if(name && (name.length<2)){
		    	response.message = "Beneficial name should contain atleast of 2 letters"
       			return res.status(400).json(response)		   
		    }

		    if(!email || !util.validateEmail(email)){		        
		        response.message = "Invalid beneficial email"
       			return res.status(400).json(response)	
		    }

		    uniqueBeneficials.push(email)
        }
    }

    return next()
}

export const getDetails = (req, res, next) => {  
    let companyId = req.params.id || null
    let response = {
        status: "error"
    }

    if(!companyId || companyId==""){
        response.message = "Company id is required"
        return res.status(400).json(response)
    }   

    return next()
}

export const updateCompany = (req, res, next) => {  
    let companyId        = req.params.id || null
    let updateCompanyObj = req.body || null

    let response = {
        status: "error"
    }

    if(!companyId || companyId==""){
        response.message = "Company id is required"
        return res.status(400).json(response)
    }  

    //Validate
    if(!updateCompanyObj || Object.prototype.toString.call(updateCompanyObj)=="[object Null]"){
        response.message = "Invalid update company object"
        return res.status(400).json(response)
    } 

    if(!updateCompanyObj.address && !updateCompanyObj.city && !updateCompanyObj.country && !updateCompanyObj.email && !updateCompanyObj.phone){
        response.message = "Invalid update company object"
        return res.status(400).json(response)
    }

    if(updateCompanyObj.address && (updateCompanyObj.address.length<2)){
        response.message = "Company address should contain atleast of 2 letters"
        return res.status(400).json(response)
    }   

    if(updateCompanyObj.city && (updateCompanyObj.city.length<2)){
        response.message = "Company city should contain atleast of 2 letters"
        return res.status(400).json(response)
    }  

    if(updateCompanyObj.country && (updateCompanyObj.country.length<2)){
        response.message = "Company country should contain atleast of 2 letters"
        return res.status(400).json(response)
    }

    if(updateCompanyObj.email && !util.validateEmail(updateCompanyObj.email)){     
        response.message = "Invalid company email"
        return res.status(400).json(response)
    }

    if(updateCompanyObj.phone && updateCompanyObj.phone.length<9){
        response.message = "Company phone should atleast of 9 digits"
        return res.status(400).json(response)
    }    

    return next()
}


export const addBeneficial = (req, res, next) => {  
    let companyId        = req.params.id || null
    let addBeneficialObj = req.body || null

    let response = {
        status: "error"
    }

    if(!companyId || companyId==""){
        response.message = "Company id is required"
        return res.status(400).json(response)
    }  

    //Validate
    if(!addBeneficialObj || Object.prototype.toString.call(addBeneficialObj)=="[object Null]"){
        response.message = "Invalid add beneficial object"
        return res.status(400).json(response)
    }

    if(!addBeneficialObj.name || addBeneficialObj.name=="" || (addBeneficialObj.name && util.hasWhiteSpace(addBeneficialObj.name))){        
        response.message = "Beneficial name is invalid"
        return res.status(400).json(response)
    }
    if(addBeneficialObj.name.length<2){             
        response.message = "Beneficial name should contain atleast of 2 letters"
        return res.status(400).json(response)
    }

    if(!addBeneficialObj.email || !util.validateEmail(addBeneficialObj.email)){              
        response.message = "Invalid beneficial email"
        return res.status(400).json(response)
    }    

    return next()
}