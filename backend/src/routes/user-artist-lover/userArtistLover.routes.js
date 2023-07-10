const express = require('express');
const artistLoverRouter = express.Router();
const userController = require("../../controllers/user-artist-lover/userArtistLover.controller")

artistLoverRouter.post('/register', userController.registerUser);

artistLoverRouter.post('/login', userController.loginUser);

artistLoverRouter.get('/active', userController.getUnblockedArtists);

artistLoverRouter.post('/block-artist-lover', userController.blockArtist);

artistLoverRouter.post('/unblock-artist-lover', userController.unblockArtist);

artistLoverRouter.get('/blocked', userController.getBlockedArtists);


module.exports = artistLoverRouter
