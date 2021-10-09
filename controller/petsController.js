const { validationResult } = require('express-validator');
const fs = require('fs');
const sharp = require('sharp');

const { errResponse } = require('../middleware/HandleError/HandleError');
const { sequelize, pets, petsImages } = require('../models/database');

const messageValidation = 'One or more parameter values in the input request are invalid.';
const MAX_LENGHT_IMG = 10485760; //10MB

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
        let { name, breed, birthday, user_id } = req.body;
        let [regPet, created] = await pets.findOrCreate({
            where: {
                name: name,
                breed: breed,
                birthday: birthday,
                user_id: user_id
            },
            defaults: {
                name: name,
                breed: breed,
                birthday: birthday,
                user_id: user_id
            },
            raw: true,
            transaction: tran
        });
        if (created) {
            delete regPet.dataValues.create_date;
            delete regPet.dataValues.status;
            if (req.files.length > 0) {

                var listImg = [];
                for (let image of req.files) {
                    let imagesObj = {};
                    let buff = '';
                    let imgNameOutput = image.destination + '_' + regPet.dataValues.pet_id + image.originalname;
                    if (image.size > MAX_LENGHT_IMG) {
                        await sharp(image.path).resize({ width: 1024 }).toFile(imgNameOutput)
                            .then(function(newFileInfo) {
                                buff = fs.readFileSync(imgNameOutput);
                                fs.unlinkSync(imgNameOutput)
                            })
                            .catch(function(errorSharp) {
                                console.log("Error occured: " + errorSharp);
                            });

                    } else {
                        buff = fs.readFileSync(image.path);
                    }

                    imagesObj.pet_id = regPet.dataValues.pet_id;
                    imagesObj.image = buff.toString('base64');
                    listImg.push(imagesObj);
                    fs.unlinkSync(image.path)

                }
                var regImages = await petsImages.bulkCreate(listImg, {
                    raw: true,
                    transaction: tran
                });

            }
            await tran.commit();
            return res.status(201).send({ status: 201, message: "Pet was created successfully.", data: { pet: regPet, images: regImages } });
        } else {
            await tran.rollback();
            return res.status(403).send({ status: 403, message: "The pet already exist.", data: {} });
        }
    } catch (error) {
        await tran.rollback();
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: 'An error was generated when trying to Register Pet.',
            data: { error: error.toString() }
        });

    }
}

const listMyPets = async(req, res) => {
    let err = await errResponse(validationResult(req), res, 'error');
    if (err !== null) {
        return res.status(422).send({
            status: 422,
            message: messageValidation,
            data: {}
        });
    }
    try {
        return res.status(201).send({ status: 201, message: "Pet was created successfully.", data: { pet: regPet, images: regImages } });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: 'An error was generated when trying to get Pet List.',
            data: { error: error.toString() }
        });
    }
}

module.exports = {
    registerPet,
    listMyPets,
}