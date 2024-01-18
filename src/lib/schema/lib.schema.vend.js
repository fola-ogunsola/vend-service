const Joi = require('joi').extend(require('@joi/date'));

const processVending = Joi.object().keys({
    tariff_type_id: Joi.string().required(),
    phone_number: Joi.string()
    .regex(new RegExp('^(\\+[0-9]{2,}[0-9]{4,}[0-9]*)(x?[0-9]{1,})?$'))
    .messages({
    //   'string.pattern.base': 'Phone number must contain +countryCode and extra required digits',
      'string.empty': 'Phone Number is not allowed to be empty'
    }).required(),
    amount: Joi.number().required(),
    ref_number: Joi.string().required()
})

export default{
    processVending
}