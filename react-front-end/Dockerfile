# Fetching the latest node image on alpine linux
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
COPY ./package.json /react-app
COPY ./package-lock.json /react-app

RUN npm cache clean --force
RUN npm install -g npm

RUN npm ci

# Copying all the files in our project
COPY . .

# Starting our application
RUN npm run build
CMD npm start