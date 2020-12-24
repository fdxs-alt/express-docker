const { User } = require(".");
const { hash } = require("bcrypt");
class UserModelMethods {
  constructor() {
    this.createNewUser = this.createNewUser.bind(this);
  }

  static async createNewUser({ email, nick, password }) {
    const hashedPassword = await hashPassword(password);
    return User.create({
      email,
      nick,
      password: hashedPassword,
    });
  }

  static deleteUser(id) {
    return User.destroy({ where: { id } });
  }

  static getUser(id) {
    return User.findOne({ where: { id } });
  }

  static findUserWithEmail(email) {
    return User.findOne({ where: { email } });
  }

  hashPassword(password) {
    return hash(password, 10);
  }
}

module.exports = UserModelMethods;
