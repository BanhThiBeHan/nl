const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        url_image: String,
        name: String,
    }
);

schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("country", schema);