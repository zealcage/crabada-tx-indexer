const Joi = require('joi');

const addTimePrice = Joi.object().keys({
    timePrice: Joi.object().keys({
        groupId: Joi.number().min(0).required(),
        time: Joi.date().required(),
        rate: Joi.string().max(8).required(),
    }).required()
}).required();

const updateTimePrice = Joi.object().keys({
    timePrice: Joi.object().keys({
        groupId: Joi.number().min(0).required(),
        time: Joi.date().required(),
        rate: Joi.string().max(8).required(),
    }).required()
}).required();

module.exports = {
    addTimePrice,
    updateTimePrice,
}