const mongoose = require('mongoose');
const publishSchema = mongoose.Schema({
    profit: Number,
    name: String,
}, {collection: 'reader'});
module.exports = publishSchema;