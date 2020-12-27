const express = require("express");
const { json, urlencoded } = require("express");
const morgan = require("morgan");
const { redis } = require("./redis");
const cors = require("cors");
const session = require("express-session");
const connectRedis = require("connect-redis");
const { ApolloServer } = require("apollo-server-express");
const { resolvers, typeDefs } = require("./graphql/index");
const { path } = require("./utils/constants");

const main = async () => {
  const RedisStore = connectRedis(session);

  const app = express();

  app.use(morgan("dev"));

  app.use(json());
  app.use(urlencoded({ extended: false }));

  app.use(
    session({
      store: new RedisStore({ client: redis }),
      name: "rs",
      secret: process.env.REDIS_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 7,
      },
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, redis }),
  });

  server.applyMiddleware({ app, path: path, cors: false });

  const PORT = process.env.PORT | 8000;

  app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
  });
};

main();
