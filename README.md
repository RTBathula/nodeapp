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
## Enterprise Register
Enterprise Register API. Alternatively you can also register from 
[Enterprise todova platform](http://enterprise.todova.cl/register). Once registered with todova, a verfication email is 
sent to creator's email. On successfully email confirmation, the creator will recieve his/her accountId,apikey,roleKey 
to email to secure calls to rest API end point. NOTE: By deafault Creator role is added as "pricipal" where creator is 
allowed to make any calls without any restriction.

> Request:

```json
POST -> /enterprise/register 
```

```json
{
    "companyName"                : "todova",
    "companyRut"                 : "25.173.454-1",
    "companyPhone"               : "+56987654321",
    "companyDirection"           : "sancho de la hoz, santiago, chile",
    "companyLocationCoordinates" :  [-33.404928,-70.599794],
    "companyWebsite"             :  "http://your-web-enterprise.cl",
    "companyGiro"                : "your-giro",
    "companyRubro"               : "your-rubro",
    "companyRepresentative"      : "Carla",

    "creatorEmail"     : "carla@todova.cl",
    "creatorRut"       : "25.164.544-1",
    "creatorPhone"     : "+56987654321",
    "creatorFirstName" : "Carla",
    "creatorLastName"  : "Rodrigo",
    "creatorPassword"  : "some-secret-password"
}
```

> Result:

```json
{
  "status"  : "success",
  "message" : "Successfully registered with todova.Please confirm your email"  
}
```

### HTTP Request

`POST /enterprise/register`

### Parameters(* indicates fields are required)

Parameter                   | Type        | Description
--------------------------- | ----------- | -------------------------------
companyName*                | string      | Registered company name
companyRut*                 | string      | Company's chilean RUT
companyPhone*               | string      | Company's phone with +56
companyDirection*           | string      | Comapany location address
companyLocationCoordinates* | coordinates | Company location [Lat, Lng]
companyWebsite*             | string      | Company Website with http://
companyGiro*                | string      | Company Giro
companyRubro*               | string      | Company Rubro
companyRepresentative*      | string      | Representative of the company
creatorEmail*               | email       | Creator email
creatorRut*                 | string      | Creator chilean RUT
creatorPhone*               | string      | Creator phone with +56
creatorFirstName*           | string      | Creator first name
creatorLastName*            | string      | Creator last name
creatorPassword*            | string      | Creator 6 alphanumeric password


```
curl -X POST -H "Accept: application/json" -H "Content-Type: application/json" -d '{"name":"xyz2","address":"xyz","city":"xyz","country":"xyz","email":"xyz@gmail.com","phone":"123456789","directors":[{"name":"hello","email":"ghk@gmail.com"}],"beneficials":[{"name":"hello","email":"ghk@gmail.com"}]}' http://localhost:1447/company

```

## Love :heart: to hear feedback from you
RT Bathula-weirdo,coffee lover
battu.network@gmail.com

