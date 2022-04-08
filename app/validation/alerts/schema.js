const Joi = require('joi');

const addAlerts = Joi.object().keys({
    alert: Joi.object().keys({
        level: Joi.string().max(32).required(),
        typeId: Joi.number().min(0).required(),
        description: Joi.string().max(256).allow(null, ''),
        isActive: Joi.string().required(),
        isDeleted: Joi.boolean().allow(null, ''),
        selectedUsers: Joi.array().allow(null),
        hours: Joi.array().allow(null),
        days: Joi.array().allow(null),
        months: Joi.array().allow(null),
        isAutoReset: Joi.boolean().allow(null, ''),
        statement: Joi.string().required(),
        sendEmail: Joi.boolean().required(),
        isSysAlert: Joi.boolean().required(),
        lastResetValue:Joi.allow(null),
        rules: Joi.array().items(
            Joi.object().keys({
                groupId: Joi.allow(null),
                operand: Joi.string().max(32).required(),
                meterValue: Joi.allow(null, ''),
                meterId: Joi.array().allow(null)
            }).required()),
    }).required()
}).required();

const updateAlerts = Joi.object().keys({
    alert: Joi.object().keys({
        id: Joi.number().min(0).required(),
        level: Joi.string().max(32).required(),
        isAutoReset: Joi.boolean().allow(null, ''),
        typeId: Joi.number().min(0).required(),
        description: Joi.string().max(256).allow(null, ''),
        isDeleted: Joi.boolean().allow(null, ''),
        selectedUsers: Joi.array().allow(null),
        hours: Joi.array().allow(null),
        days: Joi.array().allow(null),
        months: Joi.array().allow(null),
        statement: Joi.string().required(),
        isSysAlert: Joi.boolean().required(),
        sendEmail: Joi.boolean().required(),
        lastResetValue:Joi.allow(null),
        rules: Joi.array().items(
            Joi.object().keys({
                groupId: Joi.allow(null),
                operand: Joi.string().max(32).required(),
                meterValue: Joi.allow(null, ''),
                meterId: Joi.array().allow(null),
                id: Joi.number().allow(null),
            }).required()),
    }).required()
}).required();

module.exports = {
    addAlerts,
    updateAlerts,
}