#Grab the latest alpine image
FROM node:6

#Maintainer.
MAINTAINER RT Bathula <battu.network@gmail.com>

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose is NOT supported by Heroku
EXPOSE 1447	

#Run the app
CMD ["npm", "start"]


