var mongoose = require("mongoose");
var transactionSchema = require("./transaction.schema.server");
var transactionModel = mongoose.model("TransactionModel", transactionSchema);
var bookModel = require("./book.model.server");
var userModel = require("./user.model.server");
var db = require("./database");

transactionModel.createTransaction = createTransaction;
transactionModel.findTransactionById = findTransactionById;
transactionModel.findTransactionBySeller = findTransactionBySeller;
transactionModel.findTransactionsByBuyer = findTransactionsByBuyer;
transactionModel.findAllTransactionsByUser = findAllTransactionsByUser;
transactionModel.updateTransaction = updateTransaction;
transactionModel.deleteTransaction = deleteTransaction;

module.exports = transactionModel;

function createTransaction(buyerId, sellerId, bookId, transaction) {
    // transaction._buyer = buyerId;
    // bookModel.findBookById(bookId)
    //     .then(function (book) {
    //         transaction._seller = book._publisher;
    //     })
    // transaction._book = bookId;
    // var sellerId = transaction._seller;
    // console.log(transaction);
    var transactionTemp = null;
    return transactionModel
        .create(transaction)
        .then(function (newtransaction) {
            transactionTemp = newtransaction;
            return userModel.addTransaction(buyerId, newtransaction._id);
        })
        .then(function (res1) {
            return userModel.addTransaction(sellerId, transactionTemp._id);
        })
        .then(function (res) {
            return transactionTemp;
        })
        .then(function (res) {
            return userModel.addBook(buyerId,bookId);
        })
        .then(function (res) {
            return userModel.findOne({_id:buyerId})
                .then(function (user) {
                    // console.log(user);
                    // console.log(user.type);
                    if(user.type ==='BOOKSTORE')
                        return bookModel.addBookstore(buyerId,bookId)
                })

        })
}


function findTransactionById(transactionId) {
    return transactionModel.findOne({_id: transactionId})
        .populate('_buyer')
        .populate('_seller')
        .populate('_book')
        .exec();
}

function findTransactionBySeller(sellerId) {
    return transactionModel.find({_seller: sellerId});
}

function findTransactionsByBuyer(buyerId) {
    return transactionModel.find({_buyer: buyerId});
}

function findAllTransactionsByUser(userId){
    return transactionModel.find({$or:[{_buyer:userId}, {_seller:userId}]})
        .populate('_book')
        .populate('_buyer')
        .populate('_seller')
        .exec();

}

function updateTransaction(transactionId, transaction){
    return transactionModel.updateOne({_id: transactionId},
        {$set: transaction});
}

function deleteTransaction(transactionId) {
    var transaction = null;
    return transactionModel.findOneAndRemove(transactionId)
        .then(function (transactionDoc) {
            transaction = transactionDoc;
            return userModel.deleteTransaction(transaction._buyer, transactionId);
        })
        .then(function (userDoc) {
            return userModel.deleteTransaction(transaction._seller, transactionId);
        })
}
