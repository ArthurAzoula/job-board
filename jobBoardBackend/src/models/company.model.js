'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companyModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      companyModel.hasMany(models.advertissement, {foreignKey: 'advertissement_id', as: 'advertissement'});
    }
  }
  companyModel.init({
    company_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nom: {
        allowNull: false,
        type: DataTypes.STRING(50),
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(255),
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
    adresse: {
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
    password: {
      allowNull: false,
      type: DataTypes.STRING(300),
      set(value) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
      },
      get() {
        return this.getDataValue('password');
      }
    },
  }, {
    sequelize,
    modelName: 'company',
    paranoid: true
  });
  return companyModel;
};