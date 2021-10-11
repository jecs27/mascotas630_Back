const { check } = require('express-validator');

module.exports = {
    createUsersValidator: [
        check('password').isString(),
        check('password').notEmpty(),
        check('email').isEmail(),
    ]

};