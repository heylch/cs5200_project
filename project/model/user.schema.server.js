var mongoose = require("mongoose");
const readerSchema = require('./reader.schema.server.js');
const publisherSchema = require('./publisher.schema.server.js');
const bookstoreSchema = require('./bookstore.schema.server.js');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    emali: String,
    // google: {
    //     id:    String,
    //     token: String
    // },
    avatar: {
        type: String,
        default: "/avatar/default-avatar.png",
    },
    type: {type: String, enum: ['READER', 'PUBLISHER', 'BOOKSTORE']},
    reader: readerSchema,
    publish : publisherSchema,
    bookstore: bookstoreSchema,
    books: [{type: mongoose.Schema.Types.ObjectId, ref:"Bookodel"}],
    booklist: [{type: mongoose.Schema.Types.ObjectId, ref:"BooklistModel"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref:"ReviewModel"}],
    transactions: [{type: mongoose.Schema.Types.ObjectId, ref:"TransactionModel"}],
    // isAdmin: Boolean
}, {collection: "user"});
module.exports = userSchema;