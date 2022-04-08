const Joi = require('joi');

const addAlertHistory = Joi.object().keys({
    alertHistory: Joi.object().keys({
        alertId: Joi.number().min(0).required(),
        alertDeviceType: Joi.string().max(32).required(),
        time: Joi.date().required(),
        description: Joi.string().max(256).min(0).required(),
        userId: Joi.array().items(
            Joi.number().min(0).required()).allow(null),
    }).required()
}).required();

module.exports = {
    addAlertHistory,
}