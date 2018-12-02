var app = require("../../express");
var transactionModel = require("../model/transaction.model.server");
app.post("/projectapi/transaction/:buyerId/song/:songId", createTransaction);

app.get("/projectapi/transaction/:transactionId", findTransactionById);
app.get("/projectapi/transaction/buyer/:buyerId", findTransactionsByBuyer);
app.get("/projectapi/transaction/seller/:sellerId", findTransactionsBySeller);

app.put("/projectapi/transaction/:transactionId", updateTransaction);
app.delete("/projectapi/transaction/:transactionId", deleteTransaction);

function createTransaction(req,res) {
    var transaction = req.body;
    transactionModel
        .createTransaction(req.params.buyerId,req.params.songId,transaction)
        .then(function (transaction) {
            res.json(transaction);
        });
}


function findTransactionById(req,res) {
    var transactionId = req.params.transactionId;
    transactionModel
        .findTransactionById(transactionId)
        .then(function (transaction) {
            res.json(transaction);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findTransactionsByBuyer(req,res) {
    var buyerId = req.params.buyerId;
    transactionModel
        .findTransactionsByBuyer(buyerId)
        .then(function (transactions) {
            res.json(transactions);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findTransactionsBySeller(req,res) {
    var sellerId = req.params.sellerId;
    transactionModel
        .findTransactionBySeller(sellerId)
        .then(function (transaction) {
            res.json(transaction);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}


function updateTransaction(req, res){
    var transactionId = req.params.transactionId;
    var newtransaction = req.body;
    transactionModel
        .updateTransaction(transactionId,newtransaction)
        .then(function (transaction) {
            res.json(transaction);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteTransaction(req, res) {
    var transactionId = req.params.transactionId;
    transactionModel
        .deleteTransaction(transactionId)
        .then(function (transaction) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}