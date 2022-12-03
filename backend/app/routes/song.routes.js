const express = require("express");
const song = require("../controllers/song.controller");
const multer = require('../config/multer')
module.exports = (app) => {
    const router = express.Router();

    router.route("/uploadSong")
        .post(multer.Music.single("song"),song.uploadMusic)
        
    router.route('/:filename')
        .get(song.getSong)

    app.use("/api/song", router); 
};