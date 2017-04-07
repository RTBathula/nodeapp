import express      from 'express'
import bodyParser   from 'body-parser'
import * as util    from './helpers/util'
import {connect}    from './databases/mongo'

//Routes
import companyRoute   from './routes/company'

global.configKeys = util.getConfigKeys()
var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname))

//Connect mongoDB
_connectMongoDB()

//Routes
_routes()

app.get('/', function(req,res,next) { 
    return res.status(200).send("Clearhaus App runing on PORT:"+util.getPort())     
})  

app.set('port', util.getPort())
var server = app.listen(app.get('port'), function() {
	console.log("Clearhaus App runing on PORT:"+app.get('port'))
})

//Private Fuctions
function _connectMongoDB(){

	connect().then(function(mongoCon){		
		global.mongoCon=mongoCon
	},function(error){
		throw error 
	})
}

function _routes(){
	app.use('/', companyRoute())	
}
