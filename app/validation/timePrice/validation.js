const schema = require('./schema')
const resultHandler = require('../../controller/resultHandler')

addTimePrice = (req, res, next) => {
  const result = schema.addTimePrice.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}

updateTimePrice = (req, res, next) => {
  const result = schema.updateTimePrice.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}