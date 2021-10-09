var express = require('express');
var router = express.Router();

const { registerUser, loginUser } = require('../controller/usersController');
const { verifyToken } = require('../middleware/Auth/Auth');
const { createUsersValidator } = require('../middleware/Validators/usersValidator');

router.post('/register', createUsersValidator, registerUser);
router.post('/loginUser', createUsersValidator, loginUser);

module.exports = router;