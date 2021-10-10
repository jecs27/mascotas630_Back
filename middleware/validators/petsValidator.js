const { check } = require('express-validator');

module.exports = {
    checkGetPetListValidator: [
        check('lastId').isNumeric(),
        check('limitData').isNumeric(),
        check('user_id').isNumeric(),
    ],
    checkDataPetValidator: [
        check('name').isString(),
        check('breed').isString(),
        check('birthday').isDate(),
        check('user_id').isNumeric(),
    ],
    checkUpdateDataPetValidator: [
        check('name').isString(),
        check('breed').isString(),
        check('birthday').isDate(),
        check('pet_uuid').isUUID(),
    ]
};