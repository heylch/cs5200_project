const mongoose = require('mongoose');
const publisherSchema = mongoose.Schema({
    name: String,
});
module.exports = publisherSchema;