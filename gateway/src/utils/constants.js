const REDIS_HOST = "gateway-redis";
const USER_SERVICE = "http://user-service:4000";
const NOTE_SERVICE = "http://note-service:3001";
const REDIS_PORT = 6379;
const path = "/graphql";
const COOKIE_NAME = "rs";
const MAX_AGE = 1000 * 60 * 60 * 24 * 7 * 7;

module.exports = {
  REDIS_HOST,
  USER_SERVICE,
  NOTE_SERVICE,
  path,
  REDIS_PORT,
  MAX_AGE,
  COOKIE_NAME,
};
