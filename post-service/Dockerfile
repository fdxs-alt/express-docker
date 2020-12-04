FROM node:14.5-alpine

ADD . ./app

WORKDIR /app

RUN npm i -g nodemon ts-node typescript

RUN npm install

EXPOSE 7000

ENTRYPOINT [ "npm", "start" ] 
