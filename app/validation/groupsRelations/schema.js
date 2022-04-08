const Joi = require('joi');

const addGroupsRelation = Joi.object().keys({
    groupsRelation: Joi.object().keys({
        rootId: Joi.number().min(0).allow(null,''),
        parentId: Joi.number().min(0).allow(null,''),
        childId: Joi.number().min(0).required(),
    }).required()
}).required();

const updateGroupsRelation = Joi.object().keys({
    groupsRelation: Joi.object().keys({
        rootId: Joi.number().min(0).allow(null,''),
        parentId: Joi.number().min(0).allow(null,''),
        childId: Joi.number().min(0).required(),
    }).required()
}).required();

module.exports = {
    addGroupsRelation,
    updateGroupsRelation,
}