var express = require('express');
var router = express.Router();

const { registerUser, loginUser } = require('../controller/usersController');
const { createUsersValidator } = require('../middleware/validators/usersValidator');

router.post('/register', createUsersValidator, registerUser);
router.post('/loginUser', createUsersValidator, loginUser);

module.exports = router;