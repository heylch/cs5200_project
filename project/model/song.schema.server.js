var mongoose = require("mongoose");
var songSchema = mongoose.Schema({
    _creator: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    _owner: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    name: String,
    url: String,
    artist: String,
    cover: String,
    thridPartyId: String,
    playlists: [{type: mongoose.Schema.Types.ObjectId, ref: "PlaylistModel"}],
    coverUrl: String,
    description: String,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}],
    dateCreated: {type: Date, default: Date.now},
    price: {
        type: Number,
        default: 0,
    },

}, {collection: "song"});
module.exports = songSchema;