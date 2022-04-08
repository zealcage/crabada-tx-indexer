const Joi = require('joi');

const addPlan = Joi.object().keys({
    plan: Joi.object().keys({
        name: Joi.string().trim().max(45).required(),
        desc: Joi.string().trim().max(128).allow('', null),
    }).required()
}).required();

const updatePlan = Joi.object().keys({
    plan: Joi.object().keys({
        name: Joi.string().trim().max(45).required(),
        desc: Joi.string().trim().max(128).allow('', null),
    }).required()
}).required();

module.exports = {
    addPlan,
    updatePlan,
}