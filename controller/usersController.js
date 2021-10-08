const { validationResult } = require('express-validator');
const { errResponse } = require('../middleware/HandleError/HandleError');
const { sequelize, Users } = require('../models/database');

const { passwordEncryption } = require('../utils/passwordEncryption');
const { checkEmailDomain, checkPassword } = require('../utils/checkUserData');

const messageValidation = 'One or more parameter values in the input request are invalid.';

const registerUser = async(req, res) => {
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
        let { email, password } = req.body;
        if (!checkEmailDomain(email)) {
            await tran.rollback();
            return res.status(400).send({ status: 400, message: "Invalid Email.", data: {} });
        }

        if (!checkPassword(password)) {
            await tran.rollback();
            return res.status(400).send({ status: 400, message: "Invalid Password.", data: {} });
        }


        let crypPassword = await passwordEncryption(password);
        let [regUser, created] = await Users.findOrCreate({
            where: {
                email: email
            },
            defaults: {
                email: email,
                password: crypPassword,
            },
            raw: true,
            transaction: tran
        });
        if (created) {

            delete regUser.dataValues.create_date;
            delete regUser.dataValues.password;
            delete regUser.dataValues.status;
            delete regUser.dataValues.user_id;

            await tran.commit();
            return res.status(201).send({ status: 201, message: "User was created successfully.", data: { user: regUser } });
        } else {
            await tran.rollback();
            return res.status(403).send({ status: 403, message: "The user already exist.", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 500,
            message: 'An error was generated when trying to Register User.',
            data: { error: error.toString() }
        });

    }
}
const loginUser = async(req, res) => {}


module.exports = {
    registerUser,
    loginUser
}