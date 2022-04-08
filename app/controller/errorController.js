const MongoUserActivity = require('../mongodbModel/userActivities.model')
const MongoSystemError = require('../mongodbModel/systemError.model')

function isEmpty(obj) {
  return !Object.keys(obj).length > 0
}
/**
   * @param {!Object} req - Object
   * @param {number} req.firmId - Company id of the user
   * @param {number} req.id - User id
   * @param {number} req.url - Requested url
   * @param {number} req.headers.userAgent - User agent
   * @param {!string} description - Description of the error
   * @param {!string} functionName - Function name of the error occured
   */
addError = async (req, description, functionName) => {
  let requestBody = null
  if (!description) {
    return false
  }
  if (!req || isEmpty(req)) {
    req = { user: { companyId: 1, userId: 1 }, headers: {} }
  }
  try {
    description = description.toString();
    requestBody = JSON.stringify(req.body)
  } catch (e) { }

  const user = req.user

  try {
    let platform = "web"
    if (req.url.substr(0, 11) === "/api/mobile")
      platform = "mobile"
    MongoUserActivity.create({
      user: user.userId,
      url: req.url,
      action: "error",
      agent: req.headers['user-agent'],
      platform: platform,
      error: description,
      requestBody: requestBody,
      functionName: functionName,
      ipAddress: req.headers['x-forwarded-for'],//|| req.socket.remoteAddress,
      status: "500",
    })
  } catch (err) {
  }

}

/**
   * @param {!Object} error - Error Object
   * @param {!string} name - Error name, function name, short explanation
   * @param {!string} type - Type of the error (cron, mail etc.)
*/
addSystemError = async (name, type, error) => {
  if (!name || !error || !type) {
    return false
  }
  MongoSystemError.create({
    name, type, error
  })
}


module.exports = {
  /**
   * @param {!Object} req - Object
   * @param {!string} description - Description of the error
   * @param {!number} type - Type of the error
   * @param {!string} functionName - Function name of the error occured
   * @param {!number} isKnown - whether error is known (1) or not (0)
   */
  addError,
  /**
   * @param {!Object} error - Error Object
   * @param {!string} name - Error name, function name, short explanation
   * @param {!string} type - Type of the error (cron, mail etc.)
*/
  addSystemError
}
