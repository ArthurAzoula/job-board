const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection.database');

class AdvertissementModel extends Model {}
AdvertissementModel.init({
    advertissement_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    titre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_debut: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_debut'
    },
    date_fin: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_fin'
    }
}, {
    sequelize,
    modelName: 'advertissement',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    validate: {
        // add custom validators here
    }
});

module.exports = AdvertissementModel;