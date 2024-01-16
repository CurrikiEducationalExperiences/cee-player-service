const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");

const Platforms = sequelize.define("platforms", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  platformName: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  platformUrl: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  clientId: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  authEndpoint: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  accesstokenEndpoint: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  kid: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  authConfig: {
    type: DataTypes.JSON,
    allowNull: true
  },
  authorizationServer: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
});

module.exports = { Platforms };