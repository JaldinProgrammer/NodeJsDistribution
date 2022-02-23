'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EnterpriseType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EnterpriseType.hasMany(models.Enterprise,{
        foreignKey: 'enterpriseType',
      })
    }
  }
  EnterpriseType.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'EnterpriseType',
  });
  return EnterpriseType;
};