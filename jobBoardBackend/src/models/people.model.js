'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class peopleModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      peopleModel.hasMany(models.jobapplication, {foreignKey: 'people_id'});
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
      // Verification de l'email
      validate: {
        isEmail: true,

      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(50),
      // add security to password set and get
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      },
      get() {
        return this.getDataValue('password');
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