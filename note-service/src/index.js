const { json, urlencoded } = require("express");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { Note } = require("./db/index");

const main = () => {
  const app = express();
  app.use(morgan("combined"));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cors({ credentials: true }));
  app.use(helmet());

  const PORT = process.env.PORT | 3001;

  app.get("/", async (req, res) => {
    const newNote = await Note.create({
      content: "random content",
      title: "random tittle",
      userID: "1234",
    });

    res.json({ newNote });
  });

  app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
  });
};

main();
