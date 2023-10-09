const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.database');
const AdvertissementModel = require('./Advertissement.model');

class CompanieModel extends Model {}
CompanieModel.init({
    entreprise_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adresse: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    telephone: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
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
    modelName: 'companie',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    validate: {
        // Add your validation rules here
    }
});

// Define your associations here
CompanieModel.hasMany(AdvertissementModel);
AdvertissementModel.belongsTo(CompanieModel);

module.exports = CompanieModel;