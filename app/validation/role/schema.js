const Joi = require('joi');

const addRole = Joi.object().keys({
    role: Joi.object().keys({
        name: Joi.string().max(64).required(),
        description: Joi.string().max(256).allow(null, '')
    }).required()
}).required();


const updateRole = Joi.object().keys({
    role: Joi.object().keys({
        id: Joi.number().min(0).required(),
        name: Joi.string().max(64).required(),
        description: Joi.string().max(256).allow(null, '')
    }).required()
}).required();

module.exports = {
    addRole,
    updateRole
}