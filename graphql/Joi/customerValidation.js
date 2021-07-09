const Joi = require('joi');

module.exports = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    tel: Joi.string(),
    password: Joi.string(),
    dateofbirth: Joi.date(),
    activ: Joi.boolean(),
    annulation: Joi.boolean(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
    coach_id: Joi.number().integer(),
    seller_id: Joi.number().integer(),
    product_id: Joi.number().integer(),
});