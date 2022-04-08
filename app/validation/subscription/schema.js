const Joi = require('joi');

const addSubscription = Joi.object().keys({
    subcription: Joi.object().keys({
        name: Joi.string().trim().max(45).required(),
        desc: Joi.string().trim().max(128).allow('', null),
    }).required()
}).required();

const updateSubscription = Joi.object().keys({
    subcription: Joi.object().keys({
        name: Joi.string().trim().max(45).required(),
        desc: Joi.string().trim().max(128).allow('', null),
    }).required()
}).required();

module.exports = {
    addSubscription,
    updateSubscription,
}