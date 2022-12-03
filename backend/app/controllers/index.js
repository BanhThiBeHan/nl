const auth = require('./auth.controller')
const user = require('./users.controller')
const genre = require('./genre.controller')
const artist = require('./artist.controller')
const singer = require('./singer.controller')
const country = require('./country.controller')
const music = require('./music.controller')
const image = require('./image.controller')
const song = require('./song.controller')
const favorite = require('./favorite.controller')


module.exports = {
    auth,
    user,
    genre,
    artist,
    singer,
    country,
    music,
    image,
    song,
    favorite,
}
