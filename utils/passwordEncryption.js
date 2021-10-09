const bcrypt = require('bcrypt');

const passwordEncryption = (password) => {
    return bcrypt.hashSync(password, 10);
}

module.exports = {
    passwordEncryption,

}