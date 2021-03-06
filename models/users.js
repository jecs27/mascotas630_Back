'use strict';
const moment = require("moment");
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        static associate(models) {}
    }
    users.init({
        create_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: moment().format('YYYY-MM-DD'),
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementIdentity: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ''
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        sequelize,
        timestamps: false,
        indexes: [
            { fields: ['user_id'], unique: true }
        ],
        modelName: 'users',
        freezeTableName: true
    });
    return users;
};