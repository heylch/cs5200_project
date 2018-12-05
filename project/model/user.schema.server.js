var mongoose = require("mongoose");
const readerSchema = require('./reader.schema.server.js');
const publisherSchema = require('./publisher.schema.server.js');
const bookstoreSchema = require('./bookstore.schema.server.js');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    emali: String,
    balance: Number,
    avatar: {
        type: String,
        default: "/avatar/default-avatar.png",
    },
    type: {type: String, enum: ['READER', 'PUBLISHER', 'BOOKSTORE']},
    reader: readerSchema,
    publish : publisherSchema,
    bookstore: bookstoreSchema,
    booklists: [{type: mongoose.Schema.Types.ObjectId, ref:"BooklistModel"}],
    transactions: [{type: mongoose.Schema.Types.ObjectId, ref:"TransactionModel"}]
}, {collection: "user"});
module.exports = userSchema;