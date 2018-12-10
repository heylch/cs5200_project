var app = require("../../express");
var bookModel = require("../model/book.model.server");
var userModel = require("../model/user.model.server");
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});
var fs = require('fs');
var request = require('request');

app.post("/projectapi/user/:userId/book", createBookForUser);
app.get("/projectapi/book", findBookByBookName);
app.get("/projectapi/user/:userId/book", findAllBooksByUser);
app.get("/projectapi/search/book/:bookId", findBookById);
app.put("/projectapi/book/:bookId", updateBook);
app.post("/projectapi/upload", upload.single('myFile'), uploadBook);
app.delete("/projectapi/user/:userId/book/:bookId", deleteBook);
app.get("/projectapi/books", findAllBooks);
app.get("/projectapi/book/:bookId/publisher", getBookPublisher);
app.put("/projectapi/book/:bookId/bookstore/:bookstoreId/price/:priceNum", addBookBookstore);
app.put("/projectapi/book/:bookId/bookstore/:publisherId/price/:priceNum", addBookPublisher);
app.post("/projectapi/book/api", createBookFromApi);
app.get("/projectapi/review/book/:bookId", findBookByIdWithReview);
// app.put("/projectapi/book/:bookId/booklist/:booklistId", addBooklistToBook);
app.get("/projectapi/search/thirdparty",searchFromThirdPary);
app.get("/projectapi/search/thirdparty/detail",searchFromThirdParyDetail);
app.get("/projectapi/book/isbn",findBookByISBN);

function findBookByIdWithReview(req, res) {
    var bookId = req.params.bookId;
    bookModel.findBookByIdWithReview(bookId)
        .then(function (books) {
            res.json(books);
        }, function (err) {
            res.sendStatus(500).send(err);;
        })
}

function uploadBook(req, res) {
    // console.log("uploadbook0");
    var myFile = req.file;
    var userId = req.body.userId;
    var image = req.body.image;
    var title = req.body.title;
    var isbn13 = req.body.isbn;
    var price = req.body.price;
    var author =req.body.author;
    var originalname = myFile.originalname; // file name on user's computer
    var index = originalname.indexOf(".");
    originalname = originalname.substring(0, index);
    if(title === "") {
        title = originalname;
    }
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;
    // console.log("uploadbook1");
    var book= { "url":'/public/uploads/' + filename,
        "_publisher": userId,
        "title": title,
        "image" : image,
        "isbn13": isbn13,
        "price":price,
        "author":author,
    };

    userModel.createBookForUser(userId,book)
        .then(function () {
            var callbackUrl = "/#!/home";
            res.redirect(callbackUrl);
        })
}

function createBookForUser(req,res) {
    var book = req.body;
    var userId = req.params.userId;
    userModel
        .createBookForUser(userId, book)
        .then(function (book) {
            res.json(book);
        });
}

function findBookById(req,res) {
    var bookId = req.params.bookId;
    bookModel
        .findBookById(bookId)
        .then(function (book) {
            res.json(book);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findBookByBookName(req, res) {
    var bookname = req.query.bookname;
    bookname += ".mp3";
    bookModel
        .findBookByBookName(bookname)
        .then(function (book) {
            if (book === null)
                return res.send("0");
            else
                return res.json(book);

        }, function (err) {
            return res.sendStatus(404).send(err);
        });
}

function findAllBooksByUser(req, res) {
    var userId = req.params.userId;
    // console.log(userId);
    userModel
        .findAllBooksByUser(userId)
        .then(function (books) {
            res.json(books);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateBook(req, res){
    var bookId = req.params.bookId;
    var book = req.body;
    bookModel
        .updateBook(bookId,book)
        .then(function (book) {
            res.json(book);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteBook(req, res) {
    var bookId = req.params.bookId;
    var userId = req.params.userId;
    // bookModel.findBookById(bookId)
    //     .then(function (book) {
    //         var filePath = __dirname + '/../../';
    //         filePath += book.url;
    //         fs.unlinkSync(filePath);
    //     });
    userModel
        .deleteBook(userId, bookId)
        .then(function (book) {
            res.json(book);
            console.log("remove book from user success");
        }, function (err) {
            res.sendStatus(500).send(err);
        });
}

function findAllBooks(req, res) {
    return bookModel.findAllBooks()
        .then(function (books) {
            res.json(books);
        }, function (err) {
            res.sendStatus(500).send(err);
        })
}

function getBookPublisher(req,res) {
    var bookId = req.params.bookId;
    return bookModel
        .getBookCreator(bookId)
        .then(function (publisher) {
            res.json(publisher);
        }, function (err) {
            res.sendStatus(500).send(err);
        })
}

function addBookPublisher(req, res) {
    var bookId = req.params.bookId;
    var publisherId = req.params.publisherId;
    var priceNum = req.params.priceNum;
    return bookModel.findBookById(bookId)
        .then(function (book) {
            book._publisher = publisherId;
            book.price = priceNum;
            return bookModel.updateBook(book._id, book);
        })
        .then(function (bookDoc) {
            res.json(bookDoc);
        })
}
function addBookBookstore(req, res) {
    var bookId = req.params.bookId;
    var bookstoreId = req.params.bookstoreId;
    var priceNum = req.params.priceNum;
    return bookModel.findBookById(bookId)
        .then(function (book) {
            book._publisher = bookstoreId;
            book.price = priceNum;
            return bookModel.updateBook(book._id, book);
        })
        .then(function (bookDoc) {
            res.json(bookDoc);
        })
}

// function addBooklistToBook(req,res) {
//     var bookId = req.params.bookId;
//     var booklistId = req.params.booklistId;
//     return bookModel
//         .addBooklistToBook(booklistId,bookId)
//         .then(function (book) {
//             res.json(book);
//         });
// }

function createBookFromApi(req, res) {
    var book = req.body;
    // bookModel
    //     .findOne({thridPartyId: book.thridPartyId})
    //     .then(
    //         function (user) {
    //             if (user) {//.length !== 0
    //                 res.json(user);
    //             } else {
    //                 bookModel.createBookFromApi(book)
    //                     .then(function (bookTmp) {
    //                         res.json(bookTmp);
    //                     })
    //             }
    //         })
    // console.log("create book from api server1");
    // console.log(book);
    bookModel.createBookFromApi(book)
        .then(function(bookTmp){
            // console.log("create book from api server2");
            // console.log(bookTmp);
            res.json(bookTmp);
        })
}

function searchFromThirdPary(req,res) {
    var bookname = req.query.bookname;
    request('https://api.itbook.store/1.0/search/'+bookname, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(body); // Print the google web page.
            res.json(body);
        }
    })

}


function searchFromThirdParyDetail(req,res) {
    var bookisbn = req.query.bookisbn;
    request('https://api.itbook.store/1.0/books/'+bookisbn, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body); // Print the google web page.
            res.json(body);
        }
    })

}

function findBookByISBN(req,res) {
    var bookisbn = req.query.bookisbn;
    bookModel.findBookByISBN(bookisbn)
        .then(function (book) {
            res.json(book);
        },function (err) {
            res.json(err);
        })
}