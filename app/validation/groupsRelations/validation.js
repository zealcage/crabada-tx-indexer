const schema = require('./schema')
const resultHandler = require('../../controller/resultHandler')

addGroupsRelation = (req, res, next) => {
  const result = schema.addGroupsRelation.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}

updateGroupsRelation = (req, res, next) => {
  const result = schema.updateGroupsRelation.validate(req.body, {
    stripUnknown: true,
    escapeHtml: true
  })
  if (result.error) {
    return resultHandler(req, res, result.error)
  }
  req.body = result.value
  next()
}