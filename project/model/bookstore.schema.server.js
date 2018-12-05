const mongoose = require('mongoose');
const bookstoreSchema = mongoose.Schema({
    name: String,
});
module.exports = bookstoreSchema;