var mongoose = require("mongoose");
var playlistSchema = mongoose.Schema({
    _owner: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    songlist:[{type: mongoose.Schema.Types.ObjectId, ref: "SongModel"}],
    name: String,
    description: String,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "playlist"});
module.exports = playlistSchema;