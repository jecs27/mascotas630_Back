var express = require('express');
var router = express.Router();

const { registerUser } = require('../controller/usersController');
const { verifyToken } = require('../middleware/Auth/Auth');
const { createUsersValidator } = require('../middleware/Validators/usersValidator');

router.post('/register', createUsersValidator, registerUser);

module.exports = router;