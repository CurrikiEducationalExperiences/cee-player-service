'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
  
    await queryInterface.createTable('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  });
  await queryInterface.createTable('accounts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    facebook: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    instagram: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    twitter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  });
  await queryInterface.addIndex('users', ['email']);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('accounts');
    await queryInterface.dropTable('users');
  }
};