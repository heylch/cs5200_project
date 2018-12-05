const mongoose = require('mongoose');
const readerSchema = mongoose.Schema({
    balance: Number,
    firstName: String,
    lastName: String,
    dob: Date
}, {collection: 'reader'});
module.exports = readerSchema;