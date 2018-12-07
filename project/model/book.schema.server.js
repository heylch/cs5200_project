var mongoose = require("mongoose");
var bookSchema = mongoose.Schema({
    _bookstore: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    url: String,
    thridPartyId:String,
    author: String,
    _publisher: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    title: String,
    subTitle:String,
    image:String,
    isbn13 : Number,
    _reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}],
    publisher: String,
    price: {
        type: Number,
        default: 0,
    },

}, {collection: "book"});
module.exports = bookSchema;
//    description: String,
// playlists: [{type: mongoose.Schema.Types.ObjectId, ref: "PlaylistModel"}],
// dateCreated: {type: Date, default: Date.now},