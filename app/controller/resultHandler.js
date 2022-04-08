const errorMessageHandler = require('./config/locales/errorMessageHandler')
//const UserActivityController = require('./userActivityController')

const codeMessage = {
    'success': 200,
    'validation-error': 400,
    'authorization-required': 401,
    'unauthorized': 403,
    'not-found': 404,
    'duplicate': 409,
    'warning': 200,
    'validation-warning': 200,
};

async function resultHandler(req, res, result) {
    try {
        if (!result) {
            //UserActivityController.createActivityLog(req, "no-result", 500)
            return res.status(500).json(result);
        }
        else if (result.error) {
            //UserActivityController.createActivityLog(req, "known-error", codeMessage[result.error] ? codeMessage[result.error] : 500)
            return res.status(codeMessage[result.error] ? codeMessage[result.error] : 500).json(errorMessageHandler(req, result));
        }
        else if (result.status) {
            //UserActivityController.createActivityLog(req, "request", codeMessage[result.status])
            return res.status(codeMessage[result.status]).json(result);
        }
        else if (result.isJoi) {
            //UserActivityController.createActivityLog(req, "joi", codeMessage['validation-error'])
            return res.status(codeMessage['validation-error']).json(errorMessageHandler(req, result));
        }
        else {
            //UserActivityController.createActivityLog(req, "unknown-resultHandler", 500)
            return res.status(500).json(result);
        }
    } catch (error) {
        console.warn("\x1b[33m%s\x1b[0m%s\x1b[31m%s", 'WARNING: ', 'Unhandled result status: ', result && result.status ? result.status : result && result.error ? result.error : result)
    }
}

module.exports = resultHandler;