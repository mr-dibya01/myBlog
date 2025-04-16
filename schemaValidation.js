const Joi = require('joi');


const blogValidationSchema = Joi.object({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(10).required(),
});


module.exports=blogValidationSchema;