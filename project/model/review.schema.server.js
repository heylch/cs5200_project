var mongoose = require("mongoose");
var reviewSchema = mongoose.Schema({
    _critic: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    _song: {type: mongoose.Schema.Types.ObjectId, ref: "SongModel"},
    _playlist: {type: mongoose.Schema.Types.ObjectId, ref: "PlaylistModel"},
    _musician: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    type: {type: String, enum: ['FORSONG', 'FORPLAYLIST', 'FORMUSICIAN']},
    title: String,
    comment: String,
    rating: Number,
    dateCreated: {type: Date, default: Date.now}

}, {collection: "review"});
module.exports = reviewSchema;