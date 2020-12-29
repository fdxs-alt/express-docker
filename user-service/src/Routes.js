const { Router } = require("express");
const UserController = require("./UserController");

const router = Router();

router.post("/login", UserController.login);

router.post("/register", UserController.register);

router.get("/:userID", UserController.getUser);

module.exports = router;
