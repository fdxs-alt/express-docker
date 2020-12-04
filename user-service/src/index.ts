import * as express from "express";

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Not working " });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
