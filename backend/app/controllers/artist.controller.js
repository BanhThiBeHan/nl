const mongoose = require("mongoose");
const db = require('../models');
const Artist = db.artist;


exports.getAllArtist = async (req, res, next) => {
    try {
        const document = await Artist.find()
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Artist" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy getAllUsers' + error })
        )
    }
};

exports.createArtist = async (req, res, next) => {
    const artist = new Artist({
        url_image : req.body.url_image,
        name : req.body.name,
    })

    try {
        const document = await artist.save();
        return res.json({Message : 'da them artist thanh cong' + document});
    } catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể tao artist +++ ${error} ` })
        )
    }
}

exports.updateArtist = async (req, res, next) => {
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
        const document = await Artist.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Artist" }));
        }
        return res.send({ message: "đã update thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update Artist với id = ${req.params.id} +++ ${error} ` })
        )
    }
}

exports.findOneArtist = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    
    try {
        const document = await Artist.findOne(condition)
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy findOneArtist" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy findOneArtist' + error })
        )
    }
};


exports.deleteArtist = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Artist.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Artist" }));
        }
        return res.send({ message: "đã xóa Artist thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Artist với id = ${req.params.id} +++ ${error} ` })
        )
    }
}

exports.deleteAllArtist = async (req, res, next) => {
    try {
        const data = await Artist.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Artist đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Artist ++ ${error}` })
        )
    }
}



