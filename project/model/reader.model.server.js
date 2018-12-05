var mongoose = require("mongoose");
var readerSchema = require("./reader.schema.server");
var readerModel = mongoose.model("ReaderModel", readerSchema);
// var userModel = require("./user.model.server");

readerModel.findReaderById = findReaderById;
readerModel.findReaderByReaderName = findReaderByReaderName;
readerModel.updateReader = updateReader;
readerModel.findAllReaders = findAllReaders;
readerModel.createReaderFromApi = createReaderFromApi;
readerModel.deleteReader = deleteReader;
readerModel.getReaderBalance = getReaderBalance;
module.exports = readerModel;

function deleteReader(readerId) {
    return readerModel.findOneAndRemove(readerId)
        .then(function (reader) {
            return reader;
        })
}

function findReaderById(readerId) {
    return readerModel
        .findOne({_id: readerId})
        .populate('_creator')
        .exec();
}

function findReaderByReaderName(readername) {
    return readerModel.find({name: readername});
}



function updateReader(readerId, reader) {
    return readerModel
        .updateOne({_id: readerId},
            {$set: reader});
}

function getReaderBalance(readerId) {
    return readerModel
        .findById(readerId)
        .then(function (reader) {
            return reader.balance;
        })
}



function findAllReaders() {
    return readerModel
        .find()
        .populate('_creator')
        .exec();
}


function createReaderFromApi(reader) {
    return readerModel.create(reader);
}

