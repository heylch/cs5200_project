var mongoose = require("mongoose");
var reviewSchema = mongoose.Schema({
    _reader: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _book: {type: mongoose.Schema.Types.ObjectId, ref: "BookModel"},
    _booklist: {type: mongoose.Schema.Types.ObjectId, ref: "BooklistModel"},
    _author: {type: mongoose.Schema.Types.ObjectId, ref: "AuthorModel"},
    type: {type: String, enum: ['BOOK', 'BOOKLIST', 'AUTHOR']},
    title: String,
    text: String,
    dateCreated: {type: Date, default: Date.now}

}, {collection: "review"});
module.exports = reviewSchema;