FROM node:14

WORKDIR /app

COPY package.json /app

RUN yarn

COPY  . /app

EXPOSE 8000

VOLUME [ "/app/node_modules" ]

CMD yarn dev