const { Router } = require("express");
const NotesController = require("./NotesController");

const router = Router();

router.get("/user/:userID", NotesController.getUserNotes);

router.get("/:id", NotesController.getSpecificNote);

router.post("/", NotesController.createNote);

router.delete("/:id", NotesController.deleteNote);

router.patch("/:id", NotesController.updateNote);

router.delete("/user/:userID", NotesController.deleteAllUsersNotes);

module.exports = router;
