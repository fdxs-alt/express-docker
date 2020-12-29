const createHttpError = require("http-errors");
const UserModelMethods = require("./db/User");
const { compare } = require("bcrypt");
class UserController {
  static async getUser(req, res, next) {
    const { userID } = req.params;
    console.log(userID);
    const { dataValues } = await UserModelMethods.getUserById(userID);

    const { password: _, ...rest } = dataValues;

    res.status(200).json({ user: rest });
  }

  static async register(req, res, next) {
    const { nick, email, password } = req.body;

    const user = await UserModelMethods.findUser({ nick, email });

    if (user) {
      return next(createHttpError(400, "User already exists"));
    }
    try {
      const { dataValues } = await UserModelMethods.createNewUser({
        nick,
        email,
        password,
      });

      const { password: _, ...newUser } = dataValues;

      res.status(201).json({ newUser });
    } catch (error) {
      return next(
        createHttpError(500, "Error occured during creation of the user")
      );
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    const { dataValues } = await UserModelMethods.findUser({ email });

    const { password: hashedPassword, ...rest } = dataValues;

    if (!dataValues) {
      return next(createHttpError(400, "Email or password is wrong"));
    }

    const isUser = await compare(password, hashedPassword);

    if (!isUser) {
      return next(createHttpError(401, "Email or password is wrong"));
    }

    res.status(200).json({ user: rest });
  }
}

module.exports = UserController;
