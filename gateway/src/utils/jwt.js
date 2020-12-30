const { sign, verify } = require("jsonwebtoken");

const setJWT = (req, id) => {
  const jwt = sign({ id }, process.env.REDIS_SECRET, { expiresIn: "24h" });

  req.session.jwt = jwt;
};

const jwtMiddleware = (req, res, next) => {
  const jwt = req.session.jwt;
  if (jwt) {
    try {
      const decoded = verify(jwt, process.env.REDIS_SECRET);
      req.userID = decoded.id;
    } catch (error) {
      next();
    }
  }
  next();
};

module.exports = { setJWT, jwtMiddleware };
