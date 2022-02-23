'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EnterpriseTypes', [
      {
      name: 'Abogados',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        name: 'Cocineros',
        createdAt: new Date(),
        updatedAt: new Date()
        }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('EnterpriseTypes', null, {});
  }
};
