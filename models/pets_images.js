'use strict';
const moment = require("moment");
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class petsImages extends Model {
        static associate(models) {
            petsImages.belongsTo(models.pets, {
                as: 'pets',
                foreignKey: 'pet_id'
            });
        }
    }
    petsImages.init({
        create_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: moment().format('YYYY-MM-DD'),
        },
        petImage_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrementIdentity: true,
            autoIncrement: true,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'pets_images',
        freezeTableName: true
    });
    return petsImages;
};