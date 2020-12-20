const { urlencoded, json } = require("express");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

app.use(morgan("dev"));
app.use(json());
app.use(helmet());

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
