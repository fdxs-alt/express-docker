const Redis = require("ioredis");
const { REDIS_HOST, REDIS_PORT } = require("./utils/.");

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

module.exports = { redis };
