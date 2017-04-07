#
# Clearhaus App Dockerfile
#

# Pull base image nodejs image.
FROM node:boron

#Maintainer.
MAINTAINER RT Bathula <battu.network@gmail.com>


RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose ports.
#   - 1447: Clearhaus App
EXPOSE 1447

#Run the app
CMD [ "npm", "start" ]