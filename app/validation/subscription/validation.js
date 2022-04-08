const schema = require('./schema')
const resultHandler = require('../../controller/resultHandler')

addSubscription = (req, res, next) => {
  const result = schema.addSubscription.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}

updateSubscription = (req, res, next) => {
  const result = schema.updateSubscription.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}