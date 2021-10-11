'use strict';
const moment = require("moment");
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class pets extends Model {
        static associate(models) {
            pets.belongsTo(models.users, {
                as: 'users',
                foreignKey: 'user_id'
            });
        }
    }
    pets.init({
        create_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: moment().format('YYYY-MM-DD'),
        },
        pet_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementIdentity: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: ''
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: moment().format('YYYY-MM-DD'),
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
            { fields: ['pet_id'], unique: true }
        ],
        modelName: 'pets',
        freezeTableName: true
    });
    return pets;
};