const { DataTypes } = require("sequelize");
const { sequelize } = require("../src/utils/database");

const PublicKeys = sequelize.define("publickeys", {
  kid: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  platformUrl: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  clientId: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  iv: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  data: {
    type: DataTypes.TEXT,
    allowNull: true
  },
});

module.exports = { PublicKeys };