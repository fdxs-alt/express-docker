const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const Note = sequelize.define(
  "Note",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

sequelize.sync().then(() => console.log("Synchronized"));

module.exports = {
  sequelize,
  Note,
};
