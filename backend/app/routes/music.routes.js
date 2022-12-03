const express = require("express");
const music = require('../controllers/music.controller');

module.exports = (app) => {
    const router = express.Router();
    router.route('/')
        .get(music.getAllMusic)
        .post(music.createMusic)
        .delete(music.deleteAllMusic)

    router.route('/:id')
        .get(music.findOneMusic)
        .put(music.updateMusic)
        .delete(music.deleteMusic)

    router.route('/:type/:id/:page')
        .get(music.getMusicTypePage)

    router.route('/:page')
        .get(music.getMusicPage)
    app.use("/api/music", router);
};