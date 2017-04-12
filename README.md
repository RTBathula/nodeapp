# Nodejs company api
Clearhaus test project

#Hosted URL
http://nodecompanyapi.herokuapp.com

#Getting Started

Fork and clone the repository. Install dependencies with:

``npm install``

#Database connection
Run MongoDB locally or run through service and add MongoDB connection string app/config/keys.js file

Example: under app/config/keys.js
```
{
  development : {
    mongodbConnectUri: "mongodb://localhost:27017"
  }
}
```

#Build ES6 with babel and and Run Server
After completing all above steps run your node.js server
```
npm run dev
npm start
```

#LICENSE

Copyright 2016
