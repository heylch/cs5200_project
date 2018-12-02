var mongoose = require("mongoose");
var transactionSchema = require("./transaction.schema.server");
var transactionModel = mongoose.model("TransactionModel", transactionSchema);
var songModel = require("./song.model.server");
var userModel = require("./user.model.server");
var db = require("./database");

transactionModel.createTransaction = createTransaction;
transactionModel.findTransactionById = findTransactionById;
transactionModel.findTransactionBySeller = findTransactionBySeller;
transactionModel.findTransactionsByBuyer = findTransactionsByBuyer;
transactionModel.updateTransaction = updateTransaction;
transactionModel.deleteTransaction = deleteTransaction;
module.exports = transactionModel;

function createTransaction(buyerId, songId, transaction) {
    transaction._buyer = buyerId;
    songModel.findSongById(songId)
        .then(function (song) {
            transaction._seller = song._creator;
        })
    transaction._song = songId;
    var sellerId = transaction._seller;
    console.log(transaction);
    var transactionTemp = null;
    return transactionModel
        .create(transaction)
        .then(function (newtransaction) {
            transactionTemp = newtransaction;
            return userModel.addTransaction(buyerId, newtransaction._id);
        })
        .then(function (res) {
            return userModel.addTransaction(sellerId, transactionTemp._id);
        })
        .then(function (res) {
            return transactionTemp;
        })
}


function findTransactionById(transactionId) {
    return transactionModel.findOne({_id: transactionId});
}

function findTransactionBySeller(sellerId) {
    return transactionModel.find({_seller: sellerId})
        .populate('_buyer')
        .exec();
}

function findTransactionsByBuyer(buyerId) {
    return transactionModel.find({_buyer: buyerId})
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