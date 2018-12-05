const mongoose = require('mongoose');
const readerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    dob:Date,
    _reviews: [{type: mongoose.Schema.Types.ObjectId, ref:"ReviewModel"}],
    _followings: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}]
});
module.exports = readerSchema;