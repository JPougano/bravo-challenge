const joi = require("joi");

const currencyValidationSchema = joi.object({
  currency: joi.string().required().max(6).min(3),
  rate: joi.number().required(),
});

module.exports = currencyValidationSchema;
