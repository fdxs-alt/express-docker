const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nick: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true }
);

sequelize.sync().then(() => console.log("Synchronized"));

module.exports = {
  User,
  sequelize,
};
