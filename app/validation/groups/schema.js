const Joi = require('joi');

const addGroups = Joi.object().keys({
    groups: Joi.object().keys({
        type: Joi.string().max(45).required(),
        name: Joi.string().max(64).required(),
        description: Joi.string().max(256).allow(null, ''),
    }).required()
}).required();

const updateGroups = Joi.object().keys({
    groups: Joi.object().keys({
        type: Joi.string().max(45).required(),
        name: Joi.string().max(64).required(),
        description: Joi.string().max(256).allow(null, ''),
    }).required()
}).required();

module.exports = {
    addGroups,
    updateGroups,
}