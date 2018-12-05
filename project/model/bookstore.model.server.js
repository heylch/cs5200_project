var mongoose = require("mongoose");
var bookstoreSchema = require("./bookstore.schema.server");
var bookstoreModel = mongoose.model("BookstoreModel", bookstoreSchema);


bookstoreModel.findBookstoreById = findBookstoreById;
bookstoreModel.findBookstoreByBookstoreName = findBookstoreByBookstoreName;
bookstoreModel.updateBookstore = updateBookstore;
bookstoreModel.findAllBookstores = findAllBookstores;
bookstoreModel.createBookstoreFromApi = createBookstoreFromApi;
bookstoreModel.deleteBookstore = deleteBookstore;
bookstoreModel.getBookstoreBalance = getBookstoreBalance;
module.exports = bookstoreModel;

function deleteBookstore(bookstoreId) {
    return bookstoreModel.findOneAndRemove(bookstoreId)
        .then(function (bookstore) {
            return bookstore;
        })
}

function findBookstoreById(bookstoreId) {
    return bookstoreModel
        .findOne({_id: bookstoreId})
        .populate('_creator')
        .exec();
}

function findBookstoreByBookstoreName(bookstorename) {
    return bookstoreModel.find({name: bookstorename});
}



function updateBookstore(bookstoreId, bookstore) {
    return bookstoreModel
        .updateOne({_id: bookstoreId},
            {$set: bookstore});
}

function getBookstoreBalance(bookstoreId) {
    return bookstoreModel
        .findById(bookstoreId)
        .then(function (bookstore) {
            return bookstore.balance;
        })
}



function findAllBookstores() {
    return bookstoreModel
        .find()
        .populate('_creator')
        .exec();
}


function createBookstoreFromApi(bookstore) {
    return bookstoreModel.create(bookstore);
}

