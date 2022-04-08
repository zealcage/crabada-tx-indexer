const schema = require('./schema')
const resultHandler = require('../../controller/resultHandler')

addRole = (req, res, next) => {
  const result = schema.addRole.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}

updateRole = (req, res, next) => {
  const result = schema.updateRole.validate(req.body, {
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
  addRole,
  updateRole,
}