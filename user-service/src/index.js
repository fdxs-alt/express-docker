const { json, urlencoded } = require("express");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./Routes");

const main = () => {
  const app = express();
  app.use(morgan("dev"));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(helmet());
  app.use(cors({ credentials: true }));
  app.use("/", routes);

  app.use((err, req, res, next) => {
    res.status(err.status).json({ error: err.message });
    next();
  });

  const PORT = process.env.PORT | 4000;

  app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
  });
};
main();
