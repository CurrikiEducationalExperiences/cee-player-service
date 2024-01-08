'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
    await queryInterface.dropTable('users');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
    await queryInterface.dropTable('users');
  }
};
