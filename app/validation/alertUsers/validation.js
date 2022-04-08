const schema = require('./schema')
const resultHandler = require('../../controller/resultHandler')

addAlertUsers = (req, res, next) => {
  const result = schema.addAlertUsers.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}

updateAlertUsers = (req, res, next) => {
  const result = schema.updateAlertUsers.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}

deleteAlertUsers = (req, res, next) => {
  const result = schema.deleteAlertUsers.validate(req.body, {
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
  addAlertUsers,
  updateAlertUsers
}