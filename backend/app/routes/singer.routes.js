const express = require("express");
const singer = require('../controllers/singer.controller');

module.exports = (app) => {
    const router = express.Router();
    router.route('/')
        .get(singer.getAllSinger)
        .post(singer.createSinger)
        .delete(singer.deleteAllSinger)

    router.route('/:id')
        .get(singer.findOneSinger)
        .put(singer.updateSinger)
        .delete(singer.deleteSinger)

    app.use("/api/singer", router);
};