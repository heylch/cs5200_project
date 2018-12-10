var mongoose = require("mongoose");
var reviewSchema = mongoose.Schema({
    _reader: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _book: {type: mongoose.Schema.Types.ObjectId, ref: "BookModel"},
    _booklist: {type: mongoose.Schema.Types.ObjectId, ref: "BooklistModel"},
    type: {type: String, enum: ['BOOK', 'BOOKLIST']},
    title: String,
    comment: String,
    dateCreated: {type: Date, default: Date.now}

}, {collection: "review"});
module.exports = reviewSchema;