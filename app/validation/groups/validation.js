const schema = require('./schema')
const resultHandler = require('../../controller/resultHandler')

addGroups = (req, res, next) => {
  const result = schema.addGroups.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}

updateGroups = (req, res, next) => {
  const result = schema.updateGroups.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}