const Redis = require("ioredis");
const { REDIS_HOST } = require("./utils/constants");

const redis = new Redis({
  host: REDIS_HOST,
  port: 6379,
});

module.exports = { redis };
