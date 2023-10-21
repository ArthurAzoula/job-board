'use strict';
const {
  Model
} = require('sequelize');
/**
 * Represent a JobApplication in the database
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
  class jobApplicationModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jobApplicationModel.hasOne(models.advertissement, {foreignKey: 'advertissement_id', as: 'advertissement'})
      jobApplicationModel.hasMany(models.people, { foreignKey: 'people_id', as: 'people' });
      jobApplicationModel.hasMany(models.anonymous, { foreignKey: 'anonymous_id', as: 'anonymous' });
    }
  }
  jobApplicationModel.init({
    jobapplication_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    people_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    advertissement_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    anonymous_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    message: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending',
    }
  }, {
    sequelize,
    modelName: 'jobapplication',
    paranoid: true
  });
  return jobApplicationModel;
};  