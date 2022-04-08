// const authJwt = require('./verifyJwtToken');
// const validations = require('../validation/');

const util = require('util');

const Database = require('../mongodbConfig/mongodb.config.js')
let mine = require("../controller/mine");
let wallet = require("../controller/wallet");

// IMAGE
//const upload = require('../controller/uploadImage/uploadMiddleware');
//const displayImage = require('../controller/uploadImage/displayImage');

// const userError = require('../controller/errorController');

module.exports = function (app, io, redis) {
	// require('../cron/cronJobs.js')(io, cluster)

	//******************** Error handler ********************//
	app.use(function (err, req, res, next) {//Error Controller
		console.error(err)
		// userError.addError(req, err, 99, 'GLOBAL_ERROR_CONTROLLER', 0)
		res.status(500).json({
			"description": "Error",
			"error": "Error occured"
		});
	});
}