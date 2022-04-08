const schema = require('./schema')
const resultHandler = require('../../controller/resultHandler')

addAlertHistory = (req, res, next) => {
  const result = schema.addAlertHistory.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}

module.exports = {
  addAlertHistory,
}