var app = require("../../express");
var booklistModel = require("../model/booklist.model.server");

app.post("/projectapi/user/:userId/booklist", createBooklistForUser);
app.get("/projectapi/booklist", findBooklistByBooklistName);
app.get("/projectapi/user/:userId/booklist", findAllBooklistsByUser);
app.get("/projectapi/booklist/:booklistId", findBooklistById);
app.put("/projectapi/booklist/:booklistId", updateBooklist);
app.delete("/projectapi/booklist/:booklistId", deleteBooklist);
app.put("/projectapi/booklist/:booklistId/book/:bookId", addBookToBooklist);
app.put("/projectapi/booklist/:booklistId/book/:bookId/remove", removeBookFromBooklist);
app.get("/projectapi/booklist/:booklistId/book", getAllBooksFromBooklist);
app.get("/projectapi/share/booklist",findAllSharedBooklists);
function removeBookFromBooklist(req,res) {
    var booklistid = req.params.booklistId;
    var bookid = req.params.bookId;
    booklistModel
        .removeBookFromBooklist(booklistid,bookid)
        .then(function (list) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function createBooklistForUser(req,res) {
    var booklist = req.body;
    var userId = req.params.userId;
    booklist._owner = userId;
    booklistModel
        .createBooklistForUser(userId, booklist)
        .then(function (list) {
            res.json(list);
        });
}

function findBooklistById(req,res) {
    var listId = req.params.booklistId;
    booklistModel
        .findBooklistById(listId)
        .then(function (list) {
            return res.json(list);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findBooklistByBooklistName(req, res) {
    var listname = req.query.booklistname;
    booklistModel
        .findBooklistByBooklistName(listname)
        .then(function (list) {
            if (list === null)
                return res.send("0");
            else
                return res.json(list);

        }, function (err) {
            return res.sendStatus(404).send(err);
        });
}

function findAllSharedBooklists(req,res){
    booklistModel
        .findAllSharedBooklists()
        .then(function (lists) {
            // console.log(lists);
            res.json(lists);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}
function findAllBooklistsByUser(req, res) {
    // console.log("gagagagagag");
    var userId = req.params.userId;
    // console.log(userId);
    booklistModel
        .findAllBooklistsByUserId(userId)
        .then(function (lists) {
            res.json(lists);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateBooklist(req, res){
    var listId = req.params.booklistId;
    var newlist = req.body;
    booklistModel
        .updateBooklist(listId,newlist)
        .then(function (list) {
            res.json(list);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteBooklist(req, res) {
    var booklistId = req.params.booklistId;
    booklistModel
        .deleteBooklist(booklistId)
        .then(function (list) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function addBookToBooklist(req,res) {
    var booklistId = req.params.booklistId;
    var bookId = req.params.bookId;
    console.log("booklist server");
    booklistModel
        .addBookToBooklist(booklistId, bookId)
        .then(function (list) {
            res.json(list);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function getAllBooksFromBooklist(req,res){
    var booklistId = req.params.booklistId;
    booklistModel
        .getAllBooksFromBooklist(booklistId)
        .then(function (booklist) {
            res.json(booklist)
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}