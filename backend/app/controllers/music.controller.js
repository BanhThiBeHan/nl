const mongoose = require("mongoose");
const db = require('../models');
const Music = db.music;


exports.getAllMusic = async (req, res, next) => {
    try {
        document = await Music.find().populate({
            path: 'artist singer genre country',
            select: 'id name',
        }).sort({createdAt: -1})

        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Music" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy Music' + error })
        )
    }
};

exports.getMusicPage = async (req, res, next) => {
    const { page } = req.params
    try {
        document = await Music.find()
            .populate({
                path: 'artist singer genre country',
                select: 'id name',
            })
            .sort({
                createdAt: -1
            })
            .limit(5)
            .skip(5 * page)


        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Music" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy Music' + error })
        )
    }
};


exports.getMusicTypePage = async (req, res, next) => {
    const { page, type, id } = req.params
    try {
        let document
        switch (type) {
            case 'genre':
                document = await Music.find({ genre: { $gte: id } })
                    .populate({
                        path: 'artist singer genre country',
                        select: 'id name',
                    })
                    .sort({
                        createdAt: -1
                    })
                    .limit(5)
                    .skip(5 * page)
                break;
            case 'artist':
                document = await Music.find({ artist: { $gte: id } })
                    .populate({
                        path: 'artist singer genre country',
                        select: 'id name',
                    })
                    .sort({
                        createdAt: -1
                    })
                    .limit(5)
                    .skip(5 * page)
                break;
            case 'singer':
                document = await Music.find({ singer: { $gte: id } })
                    .populate({
                        path: 'artist singer genre country',
                        select: 'id name',
                    })
                    .sort({
                        createdAt: -1
                    })
                    .limit(5)
                    .skip(5 * page)
                break;
            case 'country':
                document = await Music.find({ country: { $gte: id } })
                    .populate({
                        path: 'artist singer genre country',
                        select: 'id name',
                    })
                    .sort({
                        createdAt: -1
                    })
                    .limit(5)
                    .skip(5 * page)
                break;

            default:
                break;
        }

        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Music" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy Music' + error })
        )
    }
};

exports.createMusic = async (req, res, next) => {
    const music = new Music({
        id_user: req.body.id_user,
        name: req.body.name,
        time : req.body.time,
        artist: req.body.artist,
        singer: req.body.singer,
        genre: req.body.genre,
        country: req.body.country,
        view: 0,
        url: req.body.url,
        imgmusic: req.body.imgmusic,

    })

    try {
        document = await music.save();
        return res.json({ Message: 'da them music thanh cong' + document });
    } catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể tao music +++ ${error} ` })
        )
    }
}


exports.findOneMusic = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    try {
        document = await Music.findOne(condition).populate({
            path: 'artist singer genre country',
            select: 'id name',
        })

        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Music" }));
        }
        return res.json(document);
    } catch (error) {
        return next(
            res.status(500).json({ Message: 'không  thể  lấy Music' + error })
        )
    }
};

exports.updateMusic = async (req, res, next) => {
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
        document = await Music.findByIdAndUpdate(condition, req.body, {
            new: true
        });
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Music" }));
        }
        return res.send({ message: "đã update thành công", body: req.body });
    }
    catch (error) {
        console.log(error);
        return next(
            res.status(500).json({ Message: ` không thể update Musiic với id = ${req.params.id} +++ ${error} ` })
        )
    }
}

exports.deleteMusic = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        document = await Music.findOneAndDelete(condition);
        if (!document) {
            return next(res.status(404).json({ Message: "không thể tìm thấy Music" }));
        }
        return res.send({ message: "đã xóa Music thành công" });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` không thể xóa Music với id = ${req.params.id} +++ ${error} ` })
        )
    }
}

exports.deleteAllMusic = async (req, res, next) => {
    try {
        const data = await Music.deleteMany({});
        return res.send({ message: `${data.deletedCount}  Music đã xóa thành công` });
    }
    catch (error) {
        return next(
            res.status(500).json({ Message: ` có lỗi khi đang xóa tất cả Music ++ ${error}` })
        )
    }
}



