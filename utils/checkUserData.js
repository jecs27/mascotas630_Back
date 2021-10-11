const checkEmailDomain = (email) => {
    return (/@gmail.com\s*$/.test(email))
};

const checkPassword = (str) => {
    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(str)
}

module.exports = {
    checkEmailDomain,
    checkPassword,
};