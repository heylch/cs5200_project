const mongoose = require('mongoose');
const readerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    dob:Date,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref:"ReviewModel"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}]
});
module.exports = readerSchema;