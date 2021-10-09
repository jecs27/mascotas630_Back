const checkEmailDomain = (email) => {
    return (/@gmail.com\s*$/.test(email))
};

const checkPassword = (str) => {
    //falta la exp reg correcta
    let re = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    return re.test(str)
}

module.exports = {
    checkEmailDomain,
    checkPassword,
};