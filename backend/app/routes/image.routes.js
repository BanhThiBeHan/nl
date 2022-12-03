const express = require("express");
const image = require("../controllers/image.controller");
const multer = require('../config/multer')
module.exports = (app) => {
    const router = express.Router();

    router.route("/uploadImage")
        .post(multer.Image.single("image"),image.uploadImage)
        
    router.route('/:filename')
        .get(image.getImage)

    app.use("/api/image", router); 
};