const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");
const ResetPasswordTokens = sequelize.define("resetPasswordTokens", {
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
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = { ResetPasswordTokens };