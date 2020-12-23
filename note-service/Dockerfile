FROM node:14

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

COPY prisma ./prisma/

RUN yarn

RUN yarn prisma generate

COPY . .

EXPOSE 3001

VOLUME [ "/app/node_modules" ]

CMD yarn dev