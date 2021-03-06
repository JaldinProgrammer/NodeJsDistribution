'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enterprise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Enterprise.belongsTo(models.EnterpriseType,{
        foreignKey: 'enterpriseType',
      })
    }
  }
  Enterprise.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    enterpriseType: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Enterprise',
  });
  return Enterprise;
};