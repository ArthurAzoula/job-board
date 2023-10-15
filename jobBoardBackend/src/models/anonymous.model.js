'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anonymousModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      anonymousModel.hasMany(models.jobapplication, { foreignKey: 'jobapplication_id', as: 'jobapplication' });
    }
  }
  anonymousModel.init({
    anonymous_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nom: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    prenom: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(50),
      // Verification de l'email
      validate: {
        isEmail: true,

      },
    },
    telephone: {
      allowNull: false,
      type: DataTypes.STRING(50),
      // Verification du numero de telephone
      validate: {
        isNumeric: true,
        len: [10, 10],
      },
    },
    
  }, {
    sequelize,
    modelName: 'anonymous',
    paranoid: true
  });
  return anonymousModel;
};