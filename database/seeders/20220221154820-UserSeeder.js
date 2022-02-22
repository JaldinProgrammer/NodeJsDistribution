'use strict';
const bcryptjs = require('bcryptjs');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const salt = bcryptjs.genSaltSync();
   return queryInterface.bulkInsert('Users',[
     /*
      * jaldinNote: notice that when a field is setted with a default value and you create an object on seeds
      * the default value will rarely desactive, so if urgonna define a field that already have a default value
      * u must to write the desire value in every object
     */
    {
      name: 'Valeria Coronado',
      password: bcryptjs.hashSync('123', salt),
      email: 'vale@gmail.com',
      superAdmin: false
    },
    {
      name: 'Carlos Jaldin',
      password: bcryptjs.hashSync('123', salt),
      email: 'carjal192000@gmail.com',
      superAdmin: true
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
