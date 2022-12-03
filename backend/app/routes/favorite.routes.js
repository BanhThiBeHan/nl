const express = require("express");
const favorite = require('../controllers/favorite.controller');
const withoutDuplicates = require("../middlewares/withoutDuplicates");

module.exports = (app) => {
    const router = express.Router();
    router.route('/')
        .post( [withoutDuplicates.checkDuplicateFavorite],favorite.createFavorite)
        .delete(favorite.deleteAllFavorite)

    router.route('/:id')
        .get(favorite.getFavoriteUser)
        .delete(favorite.deleteFavorite)

    app.use("/api/favorite", router);
};