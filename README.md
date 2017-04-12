# Nodejs company api
Clearhaus test project

# Hosted URL
http://nodecompanyapi.herokuapp.com

# Trivia
Enabled ES6 usage with babel support. Created a separate folder especially for validations. Validations are done for every end point via middleware style. All the API calls respond in same style, giving consistency and symmetry to response either errors or success responses. 
Example of success result ``{ status:"success",message:"successfully fetched",data: {} }``
Example of error result ``{status:"error",message:"id param is required"}``



# Getting Started

Fork and clone the repository. Install dependencies with:

``npm install``

# Database connection
Run MongoDB locally or run through service and add MongoDB connection string app/config/keys.js file

Example: under app/config/keys.js
```
{
  development : {
    mongodbConnectUri: "mongodb://localhost:27017"
  }
}
```

# Build ES6 with babel and and Run Server
After completing all above steps run your node.js server
```
npm run dev
npm start
```
# Can I deploy docker image in heroku?
Yes, As dockerfile is written for this project, you can deploy to heroku using simple heroku commands. Here is how.

##Direct image push to heroku from project workspace(main commands)
```
heroku create
heroku container:push web
heroku ps:scale web=1
```
##Using existing docker image from (rtbathula/nodeapp)
```
docker tag rtbathula/nodeapp registry.heroku.com/<heroku-app-name>/web
docker push registry.heroku.com/<heroku-app-name>/web
heroku ps:scale web=1
```
For more info, look here https://devcenter.heroku.com/articles/container-registry-and-runtime

# API End points and usage
## Create company POST -> http://localhost:1447/company

> Example CURL Request:

```
curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{"name":"starbucks","address":"costanera center","city":"santiago","country":"chile","email":"rtbathula@sbucks.com","phone":"123456789","directors":[{"name":"rtbathula","email":"director1@sbucks.com"}],"beneficials":[{"name":"hello","email":"beneficial1@sbucks.com"}]}' http://localhost:1447/company

```

> Result:

```json
{
  "status"  : "success",
  "message" : "Successfully created a company" ,
  "data"    : {created company object}
}
```

### Parameters

Parameter                   | Type        | Description
--------------------------- | ----------- | -------------------------------
name              | string      | company name
address              | string      | company address
city              | string      | company city
country              | string      | company country
email(optional)   | string      | company email
phone(optional)              | string      | company phone
directors              | json array      | company directors. see below for params
beneficials              | json array      | comapny beneficials. see below for params

### Directors and Beneficials Parameters

Parameter                   | Type        | Description
--------------------------- | ----------- | -------------------------------
name              | string      |  name
email  | string      | email


## Get company details GET -> http://localhost:1447/company/{companyid}

> Example CURL Request:

```
curl -X GET  http://localhost:1447/company/{companyid}
```

> Result:

```json
{
  "status"  : "success",
  "message" : "Successfully fetched the company details" ,
  "data"    : {company object}
}
```

## Get company list GET -> http://localhost:1447/company?skip=0&limit=3

> Example CURL Request:

```
curl -X GET  http://localhost:1447/company
```

> Result:

```json
{
  "status"  : "success",
  "message" : "Successfully fetched the company list" ,
  "data"    : [{company object}]
}
```
### Optional skip and limit query params

Parameter                   | Type        | Description
--------------------------- | ----------- | -------------------------------
skip              | integer      |  0
limit  | integer      | 2

## Create company POST -> http://localhost:1447/company

> Example CURL Request:

```
curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{"name":"starbucks","address":"costanera center","city":"santiago","country":"chile","email":"rtbathula@sbucks.com","phone":"123456789","directors":[{"name":"rtbathula","email":"director1@sbucks.com"}],"beneficials":[{"name":"hello","email":"beneficial1@sbucks.com"}]}' http://localhost:1447/company

```

> Result:

```json
{
  "status"  : "success",
  "message" : "Successfully created a company" ,
  "data"    : {created company object}
}
```

### Parameters

Parameter                   | Type        | Description
--------------------------- | ----------- | -------------------------------
name              | string      | company name
address              | string      | company address
city              | string      | company city
country              | string      | company country
email(optional)   | string      | company email
phone(optional)              | string      | company phone
directors              | json array      | company directors. see below for params
beneficials              | json array      | comapny beneficials. see below for params


## Love :heart: to hear feedback from you
RT Bathula-weirdo,coffee lover
battu.network@gmail.com

