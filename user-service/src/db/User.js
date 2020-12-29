const { User } = require(".");
const { hash } = require("bcrypt");
class UserModelMethods {
  static async createNewUser({ email, nick, password }) {
    const hashedPassword = await hash(password, 10);
    return User.create({
      email,
      nick,
      password: hashedPassword,
    });
  }

  static deleteUser(id) {
    return User.destroy({ where: { id } });
  }

  static getUserById(id) {
    return User.findOne({ where: { id } });
  }

  static findUser(params) {
    return User.findOne({ where: params });
  }
}

module.exports = UserModelMethods;
