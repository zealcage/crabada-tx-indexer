const Joi = require('joi');

const addAlertTypes = Joi.object().keys({
    alertType: Joi.object().keys({
        name: Joi.string().max(64).required(),
        description: Joi.string().max(256).allow(null, ''),
    }).required()
}).required();

const updateAlertTypes = Joi.object().keys({
    alertType: Joi.object().keys({
        name: Joi.string().max(64).required(),
        description: Joi.string().max(256).allow(null, ''),
    }).required()
}).required();

module.exports = {
    addAlertTypes,
    updateAlertTypes,
}