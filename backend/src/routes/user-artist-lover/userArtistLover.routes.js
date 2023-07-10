const express = require('express');
const artistLoverRouter = express.Router();
const userController = require("../../controllers/user-artist-lover/userArtistLover.controller")

artistLoverRouter.post('/register', userController.registerUser);

artistLoverRouter.post('/login', userController.loginUser);

artistLoverRouter.get('/active', userController.getUnblockedArtists);

artistLoverRouter.post('/block', userController.blockArtist);

artistLoverRouter.post('/unblock', userController.unblockArtist);

artistLoverRouter.get('/blocked', userController.getBlockedArtists);

artistLoverRouter.get('/', userController.getAllArtistLovers);

module.exports = artistLoverRouter
