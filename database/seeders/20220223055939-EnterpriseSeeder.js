'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Enterprises', [
      {
      name: 'Empresa 1',
      enterpriseType: 2,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        name: 'Empresa 2',
        enterpriseType: 1,
        createdAt: new Date(),
        updatedAt: new Date()
        }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Enterprises', null, {});
  }
};
