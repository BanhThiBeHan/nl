const express = require("express");
const users = require("../controllers/users.controller");
const authJwt = require("../middlewares/authJwt");
const multer = require('../config/multer')

module.exports = (app) => {
    const router = express.Router();

    router.route("/test/all")
        .get(users.allAccess); 
    router.route("/test/user")
        .get([authJwt.verifyToken], users.userBoard);     
    router.route("/test/mod")
        .get([authJwt.verifyToken, authJwt.isModerator],users.moderatorBoard); 
    router.route("/test/admin")
        .get([authJwt.verifyToken, authJwt.isAdmin], users.adminBoard); 

    app.use("/api/users", router); 
};