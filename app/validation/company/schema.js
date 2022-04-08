const Joi = require('joi');

const getCompanyById = Joi.object().keys({
    id: Joi.number().min(1).required()
}).required();

const searchCompany = Joi.object().keys({
    company: Joi.object().keys({
        limit: Joi.number().min(1),
        companyLong: Joi.object().keys({
            value: Joi.string().trim().max(15).allow(null, ''),
            searchType: Joi.string().trim().valid('fullText', 'startsWith', 'contains', null),
        }),
        district: Joi.object().keys({
            value: Joi.string().trim().max(15).allow(null, ''),
            searchType: Joi.string().trim().valid('fullText', 'startsWith', 'contains', null),
        }),
        province: Joi.object().keys({
            value: Joi.string().trim().max(15).allow(null, ''),
            searchType: Joi.string().trim().valid('fullText', 'startsWith', 'contains', null),
        }),
    }).required()
}).required();

const searchFirmCompany = Joi.object().keys({
    company: Joi.object().keys({
        pageSize: Joi.number().min(1).max(100),
        page: Joi.number().min(0),
        companyLong: Joi.object().keys({
            value: Joi.string().trim().max(15).allow(null, ''),
            searchType: Joi.string().trim().valid('fullText', 'startsWith', 'contains', null),
        }),
        district: Joi.object().keys({
            value: Joi.string().trim().max(15).allow(null, ''),
            searchType: Joi.string().trim().valid('fullText', 'startsWith', 'contains', null),
        }),
        province: Joi.object().keys({
            value: Joi.string().trim().max(15).allow(null, ''),
            searchType: Joi.string().trim().valid('fullText', 'startsWith', 'contains', null),
        }),
    }).required()
}).required();

const addCompany = Joi.object().keys({
    company: Joi.object().keys({
        companyLong: Joi.string().trim().max(150).required(),
        province: Joi.string().trim().max(45).required(),
        district: Joi.string().trim().max(45).required(),
        address1: Joi.string().trim().max(100).allow(null, ''),
        address2: Joi.string().trim().max(100).allow(null, ''),
        phone1: Joi.string().trim().max(20).allow(null, ''),
        phone2: Joi.string().trim().max(20).allow(null, ''),
        fax: Joi.string().trim().max(20).allow(null, ''),
        email1: Joi.string().trim().max(30).allow(null, ''),
        email2: Joi.string().trim().max(30).allow(null, ''),
        authorizedPerson: Joi.string().trim().max(60).allow(null, ''),
        taxNo: Joi.string().trim().max(45).allow(null, ''),
        taxOffice: Joi.string().trim().max(45).allow(null, ''),
    }).required()
}).required();

const updateCompany = Joi.object().keys({
    company: Joi.object().keys({
        id: Joi.number().min(1).required(),
        companyLong: Joi.string().trim().max(150).required(),
        province: Joi.string().trim().max(45).required(),
        district: Joi.string().trim().max(45).required(),
        address1: Joi.string().trim().max(100).allow(null, ''),
        address2: Joi.string().trim().max(100).allow(null, ''),
        phone1: Joi.string().trim().max(20).allow(null, ''),
        phone2: Joi.string().trim().max(20).allow(null, ''),
        fax: Joi.string().trim().max(20).allow(null, ''),
        email1: Joi.string().trim().max(30).allow(null, ''),
        email2: Joi.string().trim().max(30).allow(null, ''),
        authorizedPerson: Joi.string().trim().max(60).allow(null, ''),
        taxNo: Joi.string().trim().max(45).allow(null, ''),
        taxOffice: Joi.string().trim().max(45).allow(null, ''),
    }).required()
}).required();

module.exports = {
    searchCompany,
    searchFirmCompany,
    getCompanyById,
    addCompany,
    updateCompany
}