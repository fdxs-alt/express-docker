import express from "express";

function initApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send(`Hello frsomss post servio ssce sdsEHdH`);
  });
  const PORT = process.env.PORT || 7000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

initApp();
