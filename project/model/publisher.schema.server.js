const mongoose = require('mongoose');
const publisherSchema = mongoose.Schema({
    name: String,
    _books:[{type:mongoose.Schema.Types.ObjectId, ref:"BookModel"}]
});
module.exports = publisherSchema;