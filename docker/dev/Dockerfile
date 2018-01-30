FROM node:8.9-alpine

RUN npm install -g pm2

RUN mkdir -p /src/app
WORKDIR /src/app
ENV NODE_ENV=development

CMD pm2-docker app.js
