var mongoose = require("mongoose");
var bookSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _bookstore: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    name: String,
    url: String,
    thridPartyId:String,
    _author: {type: mongoose.Schema.Types.ObjectId, ref: "AuthorModel"},
    title: String,
    subTitle:String,
    imageUrl:String,
    isbn13 : Number,
    _reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}],
    price: {
        type: Number,
        default: 0,
    },

}, {collection: "book"});
module.exports = bookSchema;
//    description: String,
// playlists: [{type: mongoose.Schema.Types.ObjectId, ref: "PlaylistModel"}],
// dateCreated: {type: Date, default: Date.now},