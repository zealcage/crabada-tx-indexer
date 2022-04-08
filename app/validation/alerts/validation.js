const schema = require('./schema')
const resultHandler = require('../../controller/resultHandler')

addAlerts = (req, res, next) => {
  const result = schema.addAlerts.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}

updateAlerts = (req, res, next) => {
  const result = schema.updateAlerts.validate(req.body, {
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
  addAlerts,
  updateAlerts,
}