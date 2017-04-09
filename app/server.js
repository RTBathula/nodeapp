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

app.use(function(req, res, next) {
	//if req body is a string, convert it to JSON.
  if(req.text && _isJSON(req.text)){
  	req.body = JSON.parse(req.text)
	}

	if(req.body && typeof(req.body)==="string" && _isJSON(req.body)){
  	req.body = JSON.parse(req.body)
	}

  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', "*")
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept')
  next()
})

//Connect mongoDB
_connectMongoDB()

//Routes
_routes()

app.get('/', function(req,res,next) { 
  return res.status(200).send("Clearhaus API nodeapp up and running")     
})  

app.set('port', util.getPort())
var server = app.listen(app.get('port'), function() {
	console.log("Clearhaus API nodeapp up and running on PORT:"+app.get('port'))
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
