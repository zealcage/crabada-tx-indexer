const privilegesSchema = require('./privilegesSchema')
const resultHandler = require('../../controller/resultHandler')

addPrivileges = (req, res, next) => {
    const result = privilegesSchema.addPrivileges.validate(req.body, {
      stripUnknown: true,
      escapeHtml: true
    })
    if (result.error) {
      return resultHandler(req, res, result.error)
    }
    req.body = result.value
    next()
  }