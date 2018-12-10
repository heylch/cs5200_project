var mongoose = require("mongoose");
const readerSchema = require('./reader.schema.server.js');
const publisherSchema = require('./publisher.schema.server.js');
const bookstoreSchema = require('./bookstore.schema.server.js');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    balance: {type:Number,default:0},
    avatar: {
        type: String,
        default: "/avatar/default-avatar.png",
    },
    type: {type: String, enum: ['READER', 'PUBLISHER', 'BOOKSTORE']},
    _reader: readerSchema,
    _publisher : publisherSchema,
    _bookstore: bookstoreSchema,
    _booklists: [{type: mongoose.Schema.Types.ObjectId, ref:"BooklistModel"}],
    _transactions: [{type: mongoose.Schema.Types.ObjectId, ref:"TransactionModel"}],
    _books: [{type: mongoose.Schema.Types.ObjectId, ref:"BookModel"}]
    // _followings: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
    // _reviews: [{type: mongoose.Schema.Types.ObjectId, ref:"ReviewModel"}]
}, {collection: "user"});
module.exports = userSchema;