var mongoose = require("mongoose");
var transactionSchema = mongoose.Schema({
    _reader: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _bookstore: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _publisher: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _book: {type: mongoose.Schema.Types.ObjectId, ref: "BookModel"},
    price: Number,
    amount: Number,
    // status: {type: String, enum: ['DONE', 'PENDING', 'REJECTED','CANCELED']},
    dateCreated: {type: Date, default: Date.now}

}, {collection: "transaction"});
module.exports = transactionSchema;