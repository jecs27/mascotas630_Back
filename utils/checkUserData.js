const checkEmailDomain = (email) => {
    return (/@gmail.com\s*$/.test(email))
};

const checkPassword = (str) => {
    //falta la exp reg correcta
    return (/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/.test(str));
}

module.exports = {
    checkEmailDomain,
    checkPassword,
};