
const Joi = require('joi');

const registerArtistLoverValidation = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    dob: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    artistLover: Joi.string().required(),

});

const loginArtistLoverValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})
module.exports = {
    registerArtistLoverValidation,
    loginArtistLoverValidation
}
