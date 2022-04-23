const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("inpt", "root", "hazard", {
  host: "localhost",
  dialect: "mysql",
});

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectToDb;
