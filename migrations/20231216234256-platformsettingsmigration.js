'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('platformsettings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      lti_client_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      cee_licensee_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      cee_secret_key: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      cee_provider_url: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('platformsettings');
  }
};
