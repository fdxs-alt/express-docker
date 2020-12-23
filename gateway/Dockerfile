FROM node:14

WORKDIR /app

COPY package.json /app

COPY yarn.lock /app

RUN yarn

COPY  . /app

EXPOSE 8000

CMD yarn dev