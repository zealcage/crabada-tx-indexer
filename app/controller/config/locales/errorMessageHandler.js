//const userError = require('../../errorController')
const tr = require('./tr')
const en = require('./en')

function getLanguage(req) {
    const language = req.acceptsLanguages('tr', 'en');
    console.warn("\x1b[33m%s\x1b[0m%s\x1b[33m%s", 'WARNING: ', 'Browser accept-language: ', language)
    if (!language) return tr
    if (language === 'tr') return tr
    else if (language === 'en') return en
    else return en
}

function resultHandler(req, result) {
    try {
        if (result && result.error) {
            if (result.errorPath) {
                if (result.error === 'validation-error' || result.error === 'unauthorized' ) {
                    if (result.field) {
                        result.message = getLanguage(req)[result.errorPath][result.error + '.' + result.field]
                        //delete result.field
                    } else
                        result.message = getLanguage(req)[result.errorPath][result.error]
                } else
                    result.message = getLanguage(req)[result.errorPath][result.error]
                delete result.errorPath
            }
            return result
        } else if (result && result.isJoi) {
            //  This part is for joi
            //userError.addError(req, result, 77, req.path + '(Validation)', 0)
            result.error = 'validation-error'
            result.isJoi = true
            return result
        } else
            return result
    } catch (error) {
        //console.warn("\x1b[33m%s\x1b[0m%s\x1b[31m%s", 'WARNING: ', 'Unhandled result status: ', result.status ? result.status : result.error)
        return result
    }
}

module.exports = resultHandler;