"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if admin already exists in the database
    const admin = await queryInterface.sequelize.query(
      `SELECT * FROM admins WHERE email = 'masterdemo@curriki.org'`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    // If no admin exist, insert the data
    if (!admin || admin.length === 0) {
        console.log("inserting")
      await queryInterface.bulkInsert(
        "admins",
        [
          {
            id: "1",
            email: "masterdemo@curriki.org",
            password:
              "$2b$04$z9NAiJDpo9Wzs/SKL7ZPr.V7l05K.TYLppkXXC7LhsiorjldvHphC",
            createdAt: "2024-01-01 19:00:00",
            updatedAt: "2023-01-01 19:00:00",
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", {});
  },
};
