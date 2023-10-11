'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class advertissementModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      advertissementModel.belongsTo(models.company)
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
    type_contrat: {
      allowNull: false,
      type: DataTypes.ENUM('CDI', 'CDD', 'Stage', 'Alternance'),
    },
    publication_date: {
      allowNull: false,
      type: DataTypes.DATE,

    },
    expiration_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'advertissement',
    paranoid: true
  });
  return advertissementModel;  
};