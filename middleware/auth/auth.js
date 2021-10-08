const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const generateToken = (data) => {
    try {
        return jwt.sign(data, config.token_key, { algorithm: 'HS256', expiresIn: '10h' });
    } catch (error) {
        return error;
    }
}

const verifyToken = (req, res, next) => {
    try {
       if (req.header('Authorization')?.split(' ')[0] == 'Bearer') {
            const decoded = jwt.verify(req.header('Authorization').split(' ')[1], config.token_key);
            if (decoded.exp <= moment().unix()) {
                return res.status(401).send({ status: 401, message: 'Expired Token' });
            } else {
                next();
            }
        } else {
            return res.status(403).send({ status: 403, message: 'Wrong Token' });
        }
    } catch (error) {
        switch (error.name) {
            case 'JsonWebTokenError':
                return res.status(403).send({ status: 403, message: 'Wrong Token' });
            case 'TokenExpiredError':
                return res.status(401).send({ status: 401, message: 'Expired Token' });
            default:
                return res.status(403).send({ status: 403, message: "You couldn't be authenticated" });
        }
    }
}

module.exports = {
    generateToken,
    verifyToken
}