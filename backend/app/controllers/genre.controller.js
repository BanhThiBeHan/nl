const mongoose = require("mongoose");
const db = require('../models');
const Genre = db.genre;


exports.getAllGenre = async (req, res, next) => {
    try {
        const document = await Genre.find()
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Genre" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy getAllUsers' + error })
        )
    }
};

exports.createGenre = async (req, res, next) => {
    const genre = new Genre({
        name : req.body.name,
        url_image : req.body.url_image,
    })

    try {
        const document = await genre.save();
        return res.json({Message : 'da them genre thanh cong' + document});
    } catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể tao Genre +++ ${error} ` })
        )
    }
}

exports.findOneGenre = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    
    try {
        const document = await Genre.findOne(condition)
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy findOneGenre" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy findOneGenre' + error })
        )
    }
};

exports.updateGenre = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(
            res.status(400).json({ Message: "thông tin không thế thay đổi" })
        )
    }
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Genre.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Genre" }));
        }
        return res.send({ message: "đã update thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update Genre với id = ${req.params.id} +++ ${error} ` })
        )
    }
}

exports.deleteGenre = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Genre.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Genre" }));
        }
        return res.send({ message: "đã xóa Genre thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Genre với id = ${req.params.id} +++ ${error} ` })
        )
    }
}

exports.deleteAllGenre = async (req, res, next) => {
    try {
        const data = await Genre.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Genre đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Genre ++ ${error}` })
        )
    }
}



