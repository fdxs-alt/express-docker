const Redis = require("ioredis");

const redis = new Redis({
  host: "gateway-redis",
  port: 6379,
});

module.exports = { redis };
