const schema = require('./schema')
const resultHandler = require('../../controller/resultHandler')

addAlertTypes = (req, res, next) => {
  const result = schema.addAlertTypes.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}

updateAlertTypes = (req, res, next) => {
  const result = schema.updateAlertTypes.validate(req.body, {
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
  addAlertTypes,
  updateAlertTypes
}