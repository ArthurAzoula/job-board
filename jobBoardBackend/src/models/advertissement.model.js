'use strict';
const {
  Model
} = require('sequelize');

/**
 * Represents an Advertissement in the database
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
  class advertissementModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      advertissementModel.belongsTo(models.company, {foreignKey: 'company_id', as: 'company'})
    }
  }
  advertissementModel.init({
    advertissement_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    titre: {
        allowNull: false,
        type: DataTypes.STRING(50),
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    company_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    type_contrat: {
      allowNull: false,
      type: DataTypes.ENUM('CDI', 'CDD', 'Stage', 'Alternance'),
    },
    remuneration: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    working_time: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    lieu: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
  }, {
    sequelize,
    modelName: 'advertissement',
    paranoid: true
  });
  return advertissementModel;  
};