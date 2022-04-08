const config = require('../config/config.js');
const cookieCreator = require('./createCookie')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.createJwtToken = (user, res, expiration) => {
    if (!user || !user.firstName || !user.lastName || !user.company || !user.username ) {
        throw Error('User Required');
    }
    if (expiration > 43200000) //12h
        expiration = 43200000
    else if (expiration < 900000) //15 min
        expiration = 900000

    const expiresIn = expiration ? expiration : process.env.DB_ENV === 'development' ? 43200000 : 43200000; //12hours
    const token = jwt.sign({
        userId: user._id,
        companyId: user.company._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        authority: user.authority,
        timezone: user.timezone,
        signedAt: Date.now(),
    }, config.secret, {
        expiresIn: (expiresIn / 1000),
    });
    return cookieCreator.createCookie(token, res, expiresIn)
}

exports.createJwtTokenAndReturn = (user, expiration) => {
    const token = jwt.sign({
        userId: user._id,
        mail: user.mail,
        firstName: user.firstName,
        lastName: user.lastName,
        signedAt: Date.now(),
    }, config.secret, {
        expiresIn: expiration,
    });
    return token
}

exports.createJwtTokenAdmin = (user, res, expiration) => {
    if (!user || !user.firstName || !user.lastName || !user.username || (expiration && typeof expiration !== 'number')) {
        throw Error('User Required');
    }
    if (expiration > 43200000) //12h
        expiration = 43200000
    else if (expiration < 900000) //15 min
        expiration = 900000

    const expiresIn = expiration ? expiration : process.env.DB_ENV === 'development' ? 43200000 : 43200000; //12hours
    const token = jwt.sign({
        userId: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        authority: user.authority,
        timezone: user.timezone,
        signedAt: Date.now(),
    }, config.adminSecret, {
        expiresIn: (expiresIn / 1000),
    });
    return cookieCreator.createCookieAdmin(token, res, expiresIn)
}