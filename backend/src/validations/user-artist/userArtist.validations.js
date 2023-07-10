const Joi = require('joi');

const registerArtistValidation = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    dob: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    artist: Joi.string().required(),
    bio: Joi.string().required(),
    website: Joi.string(),
    genres: Joi.array().items(Joi.string().required()).required(),
    majorAchievements: Joi.string().allow('').optional(),
    worksAt: Joi.string().allow('').optional(),
    performsAt: Joi.string().allow('').optional(),
    visitingCard: Joi.string().allow('').optional(),
});

const loginArtistValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})
module.exports = {
    loginArtistValidation,
    registerArtistValidation
}
