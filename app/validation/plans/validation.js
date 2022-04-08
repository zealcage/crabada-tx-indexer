const schema = require('./schema')
const resultHandler = require('../../controller/resultHandler')

addPlan = (req, res, next) => {
  const result = schema.addPlan.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}

updatePlan = (req, res, next) => {
  const result = schema.updatePlan.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}