'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jobApplicationModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jobApplicationModel.hasOne(models.advertissement, {foreignKey: 'advertissement_id'})
      jobApplicationModel.hasMany(models.people, {foreignKey: 'people_id'});
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
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    advertissement_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    email_send: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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