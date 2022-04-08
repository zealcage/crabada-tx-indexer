const schemas = require('./schema')
const resultHandler = require('../../controller/resultHandler')

getCompanyById = (req, res, next) => {
    const result = schemas.getCompanyById.validate(req.body, {
        stripUnknown: true,
        escapeHtml: true
    })
    if (result.error) {
        return resultHandler(req, res, result.error)
    }
    req.body = result.value
    next()
}

searchCompany = (req, res, next) => {
    const result = schemas.searchCompany.validate(req.body, {
        stripUnknown: true,
        escapeHtml: true
    })
    if (result.error) {
        return resultHandler(req, res, result.error)
    }
    req.body = result.value
    next()
}

searchFirmCompany = (req, res, next) => {
    const result = schemas.searchFirmCompany.validate(req.body, {
        stripUnknown: true,
        escapeHtml: true
    })
    if (result.error) {
        return resultHandler(req, res, result.error)
    }
    req.body = result.value
    next()
}

addCompany = (req, res, next) => {
    const result = schemas.addCompany.validate(req.body, {
        stripUnknown: true,
        escapeHtml: true
    })
    if (result.error) {
        return resultHandler(req, res, result.error)
    }
    req.body = result.value
    next()
}

updateCompany = (req, res, next) => {
    const result = schemas.updateCompany.validate(req.body, {
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
    searchCompany,
    searchFirmCompany,
    getCompanyById,
    addCompany,
    updateCompany
}
