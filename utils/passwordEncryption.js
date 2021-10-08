const bcrypt = require('bcrypt');

const passwordEncryption = async(password) => {
    return bcrypt.hashSync(password, 10);
}

module.exports = {
    passwordEncryption
}