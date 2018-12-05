const mongoose = require('mongoose');
const bookstoreSchema = mongoose.Schema({
    balance: Number,
    name: String,
}, {collection: 'reader'});
module.exports = bookstoreSchema;