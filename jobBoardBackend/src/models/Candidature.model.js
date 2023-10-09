const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.database');
const UserModel = require('./User.model');
const AdvertissementModel = require('./Advertissement.model');

class CandidatureModel extends Model {}
CandidatureModel.init({
    candidature_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
        defaultValue: 'pending'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
    }
}, {
    sequelize,
    modelName: 'candidature',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    validate: {
        // Add your validation rules here
    }
});

// Define your associations here
CandidatureModel.belongsTo(UserModel);
UserModel.hasMany(CandidatureModel);

CandidatureModel.belongsTo(AdvertissementModel);
AdvertissementModel.hasMany(CandidatureModel);

module.exports = CandidatureModel;