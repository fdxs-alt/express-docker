import express from "express";

function initApp() {
  const app = express();

  app.use(express.json());
  app.get("/", (req, res) => {
    res.json({ message: "Nost working ojlolos" });
  });

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

initApp();
