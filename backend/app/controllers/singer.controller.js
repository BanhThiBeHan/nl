const mongoose = require("mongoose");
const db = require('../models');
const Singer = db.singer;


exports.getAllSinger = async (req, res, next) => {
    try {
        const document = await Singer.find()
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Singer" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy getAllSinger' + error })
        )
    }
};

exports.createSinger = async (req, res, next) => {
    const singer = new Singer({
        url_image : req.body.url_image,
        name : req.body.name,
    })

    try {
        const document = await singer.save();
        return res.json({Message : 'da them singer thanh cong' + document});
    } catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể tao Singer +++ ${error} ` })
        )
    }
}


exports.findOneSinger = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    
    try {
        const document = await Singer.findOne(condition)
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy findOneSinger" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy findOneSinger' + error })
        )
    }
};

exports.updateSinger = async (req, res, next) => {
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
        const document = await Singer.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Singer" }));
        }
        return res.send({ message: "đã update thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update Singer với id = ${req.params.id} +++ ${error} ` })
        )
    }
}

exports.deleteSinger = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Singer.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Singer" }));
        }
        return res.send({ message: "đã xóa Singer thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Singer với id = ${req.params.id} +++ ${error} ` })
        )
    }
}

exports.deleteAllSinger = async (req, res, next) => {
    try {
        const data = await Singer.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Singer đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Singer ++ ${error}` })
        )
    }
}



