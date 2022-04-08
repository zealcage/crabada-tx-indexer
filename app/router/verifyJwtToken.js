const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const UserController = require('../controller/user/User')

verifyToken = (req, res, next) => { //SOCKET IO uses different verify function
	let token = req.headers['authorization'];

	if (!token) {
		return res.status(403).send({
			auth: false, message: 'Lütfen tekrar giriş yapınız.'//'No token provided.'
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: 'Fail to Authentication. Error -> ' + err
			});
		}
		req.user = {
			userId: decoded.userId,
			mail: decoded.mail,
			deviceId: decoded.deviceId,
			username: decoded.username,
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			timezone: decoded.timezone,
			iat: decoded.iat,
			exp: decoded.exp,
		};
		req.currentUser = new UserController(req.user)
		next();
	});
}

verifyTokenCookie = (req, res, next) => { //SOCKET IO uses different verify function
	const token = req.cookies.token || null;
	if (!token) {
		return res.status(403).send({
			auth: false, message: 'No token provided.'
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: 'Fail to Authentication. Error -> ' + err
			});
		}
		req.user = {
			userId: decoded.userId,
			companyId: decoded.companyId,
			username: decoded.username,
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			authority: decoded.authority,
			timezone: decoded.timezone,
			iat: decoded.iat,
			exp: decoded.exp,
		};
		req.currentUser = new UserController(req.user)

		next();
	});
}

verifyTokenCookieAdmin = (req, res, next) => { //SOCKET IO uses different verify function
	const token = req.cookies.session || null;
	if (!token) {
		return res.status(403).send({
			auth: false, message: 'No token provided.'
		});
	}

	jwt.verify(token, config.adminSecret, (err, decoded) => {
		if (err) {
			return res.status(500).send({
				auth: false,
				message: 'Fail to Authentication. Error -> ' + err
			});
		}
		req.user = {
			userId: decoded.userId,
			username: decoded.username,
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			authority: decoded.authority,
		};
		req.currentUser = new UserController(req.user)

		next();
	});
}


verifyLocalRequest = (req, res, next) => {
	if (req.connection.remoteAddress !== "127.0.0.1" || req.headers["local-secret"] !== "a!rfweo^939!2!fasvASD?AS?a*!af") return res.status(500).send({
		auth: false,
		message: 'Error'
	});

	next();
}

const authJwt = {};
authJwt.verifyTokenCookie = verifyTokenCookie;
authJwt.verifyToken = verifyToken;
authJwt.verifyTokenCookieAdmin = verifyTokenCookieAdmin;
authJwt.verifyLocalRequest = verifyLocalRequest;

module.exports = authJwt;
