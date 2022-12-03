const mongoose = require("mongoose");
const uri = require("../config").db.uri;

let bucket;
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "songs"
  });
});

exports.uploadMusic =  (req, res) => {
  res.status(200).send("File uploaded successfully");
}

exports.getSong = async (req, res) => {
    const file = bucket
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404)
          .json({
            err: "no files exist"
          });
      }
      bucket.openDownloadStreamByName(req.params.filename)
        .pipe(res);
    });
};






  
  