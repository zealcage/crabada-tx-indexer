exports.createCookie = (token, res, expiration) => {
    return res.cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: process.env.NODE_ENV === 'development' ? false : true, // set to true if your using https
        httpOnly: true,
        sameSite: true
    });
}

exports.createCookieAdmin = (token, res, expiration) => {
    return res.cookie('session', token, {
        expires: new Date(Date.now() + expiration),
        secure: process.env.NODE_ENV === 'development' ? false : true, // set to true if your using https
        httpOnly: true,
        sameSite: true
    });
}