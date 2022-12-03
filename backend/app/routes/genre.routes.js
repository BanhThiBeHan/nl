const express = require("express");
const genre = require('../controllers/genre.controller');

module.exports = (app) => {
    const router = express.Router();
    router.route('/')
        .get(genre.getAllGenre)
        .post(genre.createGenre)
        .delete(genre.deleteAllGenre)

    router.route('/:id')
        .get(genre.findOneGenre)
        .put(genre.updateGenre)
        .delete(genre.deleteGenre)

    app.use("/api/genre", router);
};