var mongoose = require("mongoose");
var booklistSchema = mongoose.Schema({
    _owner: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _books:[{type: mongoose.Schema.Types.ObjectId, ref: "BookModel"}],
    name: String,
    share: Boolean,
    _reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "booklist"});
module.exports = booklistSchema;

// description: String,