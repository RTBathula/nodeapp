import keys from '../config/keys'
import _ from'underscore'

export const isProduction = () => {
    if(process.env.PORT){
        return true
    }  

    return false 
}

export const getPort = () => {
    if(isProduction()){
        return process.env.PORT
    }
     
    return 1447 
}

export const getConfigKeys = () => {

    if(isProduction()){
        return keys["production"]
    }
     
    return keys["development"]
}

export const hasWhiteSpace = (txt) => {
  return /^ *$/.test(txt)
}

export const validateEmail = (email) => {
  let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return expr.test(email)
}

export const _isJSON = (json) => {

    //String
      if(json && typeof(json)==="string"){
        try{
          JSON.parse(json);
          return true;
        }catch(e){
          return false;
        }

      }else{
        return _.isObject(json);
      }
        
      return false;
}
