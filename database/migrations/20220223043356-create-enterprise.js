'use strict';
const db = require('../models/index'); //requiring model
const EnterpriseType = db['EnterpriseType'];
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Enterprises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      enterpriseType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'EnterpriseTypes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Enterprises');
  }
};