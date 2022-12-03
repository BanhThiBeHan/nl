const mongoose = require("mongoose");
const db = require('../models');
const Country = db.country;


exports.getAllCountry = async (req, res, next) => {
    try {
        const document = await Country.find()
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Country" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy getAllCountry' + error })
        )
    }
};

exports.findOneCountry = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    
    try {
        const document = await Country.findOne(condition)
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy findOneCountry" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy findOneCountry' + error })
        )
    }
};

exports.createCountry = async (req, res, next) => {
    const country = new Country({
        url_image : req.body.url_image,
        name : req.body.name,
    })

    try {
        const document = await country.save();
        return res.json({Message : 'da them Country thanh cong' + document});
    } catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể tao Country +++ ${error} ` })
        )
    }
}

exports.updateCountry = async (req, res, next) => {
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
        const document = await Country.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Country" }));
        }
        return res.send({ message: "đã update thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update Country với id = ${req.params.id} +++ ${error} ` })
        )
    }
}

exports.deleteCountry = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Country.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Country" }));
        }
        return res.send({ message: "đã xóa Country thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Country với id = ${req.params.id} +++ ${error} ` })
        )
    }
}

exports.deleteAllCountry = async (req, res, next) => {
    try {
        const data = await Country.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Country đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Country ++ ${error}` })
        )
    }
}



