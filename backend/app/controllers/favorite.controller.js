const mongoose = require("mongoose");
const db = require('../models');
const { populate } = require("../models/favorite.models");
const Favorite = db.favorite;


exports.getFavoriteUser = async (req, res, next) => {
    const { id } = req.params;


    try {
        const document = await Favorite.find({ id_user: id })
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Favorite" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy getAllFavorite' + error })
        )
    }
};

exports.createFavorite = async (req, res, next) => {
    const favorite = new Favorite({
        id_user: req.body.id_user,
        id_music: req.body.id_music
    })

    try {
        const document = await favorite.save();
        return res.json({ Message: 'da them Favorite thanh cong' + document });
    } catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể tao Favorite +++ ${error} ` })
        )
    }
}

// tra
exports.deleteFavorite = async (req, res, next, id) => {
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Favorite.findOneAndDelete(condition);
        return res.json({code : 225});
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Favorite với id = ${req.params.id} +++ ${error} ` })
        )
    }
}

exports.deleteAllFavorite = async (req, res, next) => {
    try {
        const data = await Favorite.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Favorite đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Favorite ++ ${error}` })
        )
    }
}



