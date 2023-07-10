const mongoose = require('mongoose');

const userArtistSchema = new mongoose.Schema({
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
    artist: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    genres: [
        {
            type: String,
            required: true
        }
    ],
    majorAchievements: {
        type: String
    },
    worksAt: {
        type: String
    },
    performsAt: {
        type: String
    },
    visitingCard: {
        type: String
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

const UserArtistModel = mongoose.model('UserArtist', userArtistSchema);
module.exports = UserArtistModel