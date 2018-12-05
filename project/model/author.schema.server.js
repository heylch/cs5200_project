var mongoose = require("mongoose");
var authorSchema = mongoose.Schema({
    _books:[{type: mongoose.Schema.Types.ObjectId, ref: "BookModel"}],
    name: String,
    rate: Number,
    numberOfRate: Number,
    _reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "ReviewModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "author"});
module.exports = authorSchema;