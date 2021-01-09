const NoteModelMethods = require("./db/Note");
const createError = require("http-errors");

class NotesController {
  static async createNote(req, res, next) {
    const { title, content, userID } = req.body;

    try {
      const newNote = await NoteModelMethods.createNote(title, content, userID);
      res.status(201).json({ newNote });
    } catch (error) {
      return next(
        createError(500, "Error occured during creation of the note")
      );
    }
  }

  static async getUserNotes(req, res) {
    const { userID } = req.params;

    const userNotes = await NoteModelMethods.getAllUsersNotes(userID);

    res.status(200).json({ userNotes });
  }

  static async getSpecificNote(req, res, next) {
    const { id } = req.params;

    const isExisting = await NoteModelMethods.getSpecificNote(id);

    if (!isExisting) {
      return next(createError(400, "There is no such note"));
    }

    const singleNote = await NoteModelMethods.getSpecificNote(id);

    res.status(200).json({ singleNote });
  }

  static async deleteNote(req, res, next) {
    const { id } = req.params;

    const singleNote = await NoteModelMethods.getSpecificNote(id);

    if (!singleNote) {
      return next(createError(400, "There is no such note"));
    }

    await NoteModelMethods.removeNote(id);

    res.status(200).json({ success: true });
  }

  static async deleteAllUsersNotes(req, res) {
    const { userID } = req.params;

    await NoteModelMethods.removeAllUserNotes(userID);

    res.status(200).json({ success: true });
  }

  static async updateNote(req, res, next) {
    const { id } = req.params;
    const { title, content } = req.body;

    const singleNote = await NoteModelMethods.getSpecificNote(id);

    if (!singleNote) {
      return next(createError(400, "There is no such note"));
    }

    try {
      singleNote.title = title;
      singleNote.content = content;
      await singleNote.save();

      res.status(200).json({ updatedNote: singleNote });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = NotesController;
