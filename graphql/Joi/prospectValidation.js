const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    age: Joi.number().integer().required(),
    phonenumber: Joi.string().required(),
    date: Joi.date(),
    objectif: Joi.string(),
    experience: Joi.string(),
    invest: Joi.string(),
    sexe: Joi.string(),
    seller_id: Joi.number().integer()
});