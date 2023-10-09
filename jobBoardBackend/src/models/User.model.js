const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../database/connection.database');

class UserModel extends Model {}
UserModel.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, 10));
        },
        get() {
            return this.getDataValue('password');
        }
    },
    telephone: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    modelName: 'user',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    validate: {
        // Add your validation rules here
    }
});

module.exports = UserModel;