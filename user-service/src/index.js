const { json } = require("express");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const main = () => {
  const app = express();
  app.use(morgan("dev"));
  app.use(json());
  app.use(helmet());
  app.use(cors({ credentials: true }));

  const PORT = process.env.PORT | 3000;

  app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
  });
};
main();
