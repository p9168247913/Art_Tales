const express = require('express');
const artistRouter = express.Router();
const userController = require('../../controllers/user-artist/userArtist.controller');

artistRouter.post('/register', userController.registerUser);

artistRouter.post('/login', userController.loginUser);

artistRouter.get('/active', userController.getUnblockedArtists);

artistRouter.post('/block-artist', userController.blockArtist);

artistRouter.post('/unblock-artist', userController.unblockArtist);

artistRouter.get('/blocked', userController.getBlockedArtists);

module.exports = artistRouter;
