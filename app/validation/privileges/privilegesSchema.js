const Joi = require('joi');

const addPrivileges = Joi.object().keys({
    privileges: Joi.object().keys({
        name: Joi.string().trim().max(45).required(),
        desc: Joi.string().trim().max(128).allow('', null),
    }).required()
}).required();

module.exports = {
    addPrivileges,
}