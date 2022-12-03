const db = require('../models')
const Favorite = db.favorite;
const favoriteController = require('../controllers/favorite.controller');

exports.checkDuplicateFavorite = (req, res, next) => {

  Favorite.findOne({
    id_user: req.body.id_user, 
    id_music: req.body.id_music,
  }).exec((err, favorite) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (favorite) {
      favoriteController.deleteFavorite(req, res, next, favorite.id)
      return;
    }
   next();
  });
};


