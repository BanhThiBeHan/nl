const express = require("express");
const country = require('../controllers/country.controller');

module.exports = (app) => {
    const router = express.Router();
    router.route('/')
        .get(country.getAllCountry)
        .post(country.createCountry)
        .delete(country.deleteAllCountry)

    router.route('/:id')
        .get(country.findOneCountry)
        .put(country.updateCountry)
        .delete(country.deleteCountry)

    app.use("/api/country", router); 
};