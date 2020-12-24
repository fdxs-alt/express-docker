const { Note } = require(".");

class NoteModelMethods {
  static createNote(title, content, userID) {
    return Note.create({ title, content, userID });
  }

  static getAllUsersNotes(userID) {
    return Note.findAll({ where: { userID } });
  }

  static getSpecificNote(id) {
    return Note.findOne({ where: { id } });
  }

  static removeNote(id) {
    return Note.destroy({ where: { id } });
  }

  static removeAllUserNotes(userID) {
    return Note.destroy({ where: { userID } });
  }

  static updateNote(title, content, id) {
    return Note.update({ title, content }, { where: { id } });
  }
}

module.exports = NoteModelMethods;
