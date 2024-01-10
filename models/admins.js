const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");
const Admins = sequelize.define("admins", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});
module.exports = { Admins };