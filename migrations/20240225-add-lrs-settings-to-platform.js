'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('platformsettings', 'lrs_url', Sequelize.STRING);
    await queryInterface.addColumn('platformsettings', 'lrs_username', Sequelize.STRING);
    await queryInterface.addColumn('platformsettings', 'lrs_password', Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('platformsettings', 'lrs_url');
    await queryInterface.removeColumn('platformsettings', 'lrs_username');
    await queryInterface.removeColumn('platformsettings', 'lrs_password');
  }
};