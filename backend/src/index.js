const express = require('express');
require("dotenv").config();
const cors = require("cors");
const connection = require('./config/config');
const artistRouter = require('./routes/user-artist/userArtist.routes');
const artistLoverRouter = require('./routes/user-artist-lover/userArtistLover.routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use("/artist", artistRouter);

app.use("/artist-lover", artistLoverRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to Mongo Atlas");
        console.log(`Server started on port ${process.env.port}`);
    } catch (err) {
        console.log(err)
        console.log("Couldn't connect to Mongo Atlas");
    }
});