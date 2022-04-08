const Joi = require('joi');

const addAlertUsers = Joi.object().keys({
    alertUsers: Joi.array().items(
        Joi.object().keys({
            alertId: Joi.number().min(0).required(),
            userId: Joi.string().min(0).required(),
        }).required(),
    ).required(),
}).required();

const updateAlertUsers = Joi.object().keys({
    alertUsers: Joi.array().items(
        Joi.object().keys({
            alertId: Joi.number().min(0).required(),
            userId: Joi.string().min(0).required(),
        }).required(),
    ).required(),
}).required();

const deleteAlertUsers = Joi.object().keys({
    id: Joi.number().min(0).required(),
}).required();

module.exports = {
    addAlertUsers,
    updateAlertUsers,
    deleteAlertUsers,
}