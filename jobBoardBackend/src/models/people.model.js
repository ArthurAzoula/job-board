'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
/**
 * Represent a People in the database
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
  class peopleModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      peopleModel.hasMany(models.jobapplication, {foreignKey: 'jobapplication_id', as: 'jobapplication'});
    }
  }
  peopleModel.init({
    people_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    prenom: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    nom: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true,
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
    telephone: {
      allowNull: false,
      type: DataTypes.STRING(50),
      // Verification du numero de telephone
      validate: {
        isNumeric: true,
        len: [10, 10],
      },
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'people',
    paranoid: true
  });
  return peopleModel;
};