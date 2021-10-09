const { validationResult } = require('express-validator');
const { errResponse } = require('../middleware/HandleError/HandleError');
const { sequelize, pets, petsImages } = require('../models/database');

const messageValidation = 'One or more parameter values in the input request are invalid.';

const registerPet = async(req, res) => {
    let err = await errResponse(validationResult(req), res, 'error');
    if (err !== null) {
        return res.status(422).send({
            status: 422,
            message: messageValidation,
            data: {}
        });
    }
    const tran = await sequelize.transaction();
    try {
        let { name, breed, birthday } = req.body;
        let [regPet, created] = await pets.findOrCreate({
            where: {
                name: name,
                breed: breed,
                birthday: birthday
            },
            defaults: {
                name: name,
                breed: breed,
                birthday: birthday
            },
            raw: true,
            transaction: tran
        });
        if (created) {
            delete regPet.dataValues.create_date;
            delete regPet.dataValues.status;

            await tran.commit();
            return res.status(201).send({ status: 201, message: "Pet was created successfully.", data: { user: regPet } });
        } else {
            await tran.rollback();
            return res.status(403).send({ status: 403, message: "The pet already exist.", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: 'An error was generated when trying to Register Pet.',
            data: { error: error.toString() }
        });

    }
}

const uploadImagesPet = async(req, res) => {
    try {
        if (req.files.length > 0) {
            for (let image of req.files) {
                console.log(image);
            }
        }
        return res.status(200).send({ status: 200, message: 'Done.', data: { error: null } });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 500, message: 'An error was generated when trying to upload File.', data: { error: error.toString() } });
    }

}

module.exports = {
    registerPet,
    uploadImagesPet,
}