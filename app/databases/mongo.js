import q from 'q'
import mongodb from 'mongodb'
const mongoClient = mongodb.MongoClient

export const connect = () => {
   
    let deferred = q.defer()

    try{
        
        mongoClient.connect(global.configKeys.mongodbConnectUri,function (err, db) {
            if (err) {
                deferred.reject(err);
            } else {    
                deferred.resolve(db.db("clearhausdb"));
            }
        })       

    }catch(e){                
        deferred.reject(e)            
    }

    return deferred.promise
}
