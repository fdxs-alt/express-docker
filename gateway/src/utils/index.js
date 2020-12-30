const { setJWT, jwtMiddleware } = require("./jwt");
const {
  NOTE_SERVICE,
  REDIS_HOST,
  USER_SERVICE,
  path,
  REDIS_PORT,
  MAX_AGE,
  COOKIE_NAME,
} = require("./constants");
const { createError } = require("./errors");
const { createValidationError, validateSchema } = require("./validation");

module.exports = {
  setJWT,
  jwtMiddleware,
  NOTE_SERVICE,
  REDIS_HOST,
  USER_SERVICE,
  path,
  createError,
  createValidationError,
  validateSchema,
  REDIS_PORT,
  COOKIE_NAME,
  MAX_AGE,
};
