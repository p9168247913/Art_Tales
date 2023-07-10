const mongoose = require('mongoose');

const userArtistLoverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
    },
    artistLover: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, {
    versionKey: false
});

const UserArtistLoverModel = mongoose.model('User_Artist_Lover', userArtistLoverSchema);
module.exports = UserArtistLoverModel