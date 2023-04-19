'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const query = fs.readFileSync('db/queries/User.sql').toString();

    return await queryInterface.sequelize.query(query);
  },

  async down(queryInterface, Sequelize) {
    const query = `
      DROP FUNCTION IF EXISTS registernewuser;
    `;
    return await queryInterface.sequelize.query(query);
  }
};
