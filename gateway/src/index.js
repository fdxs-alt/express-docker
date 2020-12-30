const express = require("express");
const { json } = require("express");
const morgan = require("morgan");
const { redis } = require("./redis");
const cors = require("cors");
const session = require("express-session");
const connectRedis = require("connect-redis");
const { ApolloServer } = require("apollo-server-express");
const { resolvers, typeDefs } = require("./graphql/.");
const { path, jwtMiddleware, COOKIE_NAME, MAX_AGE } = require("./utils/.");

const main = async () => {
  const app = express();

  const RedisStore = connectRedis(session);

  app.use(morgan("dev"));

  app.use(json());

  app.use(
    session({
      store: new RedisStore({ client: redis }),
      name: COOKIE_NAME,
      secret: process.env.REDIS_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: MAX_AGE,
      },
    })
  );

  app.use(jwtMiddleware);

  app.use(
    cors({
      credentials: true,
    })
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, redis }),
  });

  server.applyMiddleware({ app, path, cors: false });

  const PORT = process.env.PORT | 8000;

  app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
  });
};

main();
