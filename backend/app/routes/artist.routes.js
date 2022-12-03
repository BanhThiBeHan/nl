const express = require("express");
const artist = require('../controllers/artist.controller');

module.exports = (app) => {
    const router = express.Router();
    router.route('/')
        .get(artist.getAllArtist)
        .post(artist.createArtist)
        .delete(artist.deleteAllArtist)

    router.route('/:id')
        .get(artist.findOneArtist)
        .put(artist.updateArtist)
        .delete(artist.deleteArtist)

    app.use("/api/artist", router); 
};