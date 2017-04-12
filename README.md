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
Yes, As dockerfile is written for this project, you can deploy to heroku using simple heroku commands. Here is how
##Direct image push to heroku(main commands)
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
For more info look here https://devcenter.heroku.com/articles/container-registry-and-runtime

## Love :heart: to hear feedback from you
RT Bathula-weirdo,coffee lover
battu.network@gmail.com

