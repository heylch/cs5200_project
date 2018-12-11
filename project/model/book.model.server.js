var mongoose = require("mongoose");
var bookSchema = require("./book.schema.server");
var bookModel = mongoose.model("BookModel", bookSchema);
// var userModel = require("./user.model.server");

bookModel.findBookById = findBookById;
bookModel.findBookByBookName = findBookByBookName;
bookModel.findAllBooksByAuthor = findAllBooksByAuthor;
bookModel.findAllBooksByBookstore = findAllBooksByBookstore;
bookModel.getBookPublisher = getBookPublisher;
bookModel.getBookBookstore = getBookBookstore;
bookModel.getBookAuthor = getBookAuthor;
bookModel.updateBook = updateBook;
bookModel.getBookUrl = getBookUrl;
bookModel.findAllBooks = findAllBooks;
bookModel.addReview = addReview;
bookModel.removeReview = removeReview;
bookModel.createBookFromApi = createBookFromApi;
bookModel.findBookByIdWithReview = findBookByIdWithReview;
bookModel.deleteBook = deleteBook;
bookModel.getBookISBN = getBookISBN;
bookModel.findBookByThridPartyId = findBookByThridPartyId;
bookModel.findBookByISBN = findBookByISBN;
bookModel.setPublisher = setPublisher;
bookModel.addBookstore = addBookstore;
bookModel.findAllNewBooks = findAllNewBooks;
bookModel.createBook = createBook;
module.exports = bookModel;

function findBookByThridPartyId(thirdPartyId) {
    return bookModel.findOne({'thridPartyId': thirdPartyId});
}
function deleteBook(bookId) {
    return bookModel.findOneAndRemove(bookId)
        .then(function (book) {
            return book;
        })
}

function findBookById(bookId) {
    return bookModel
        .findOne({_id: bookId})
        .populate('_publisher')
        .populate('_bookstore')
        .populate('_reviews')
        .exec();

}
function findBookByBookName(bookname) {
    return bookModel.find({name: bookname});
}


function findAllBooksByAuthor(authorId) {
    return bookModel.find({_author: authorId});
}

function findAllBooksByBookstore(bookstoreId) {
    return bookModel.find({_bookstore: bookstoreId});
}


function updateBook(bookId, book) {
    return bookModel
        .updateOne({_id: bookId},
            {$set: book});
}

function getBookUrl(bookId) {
    return bookModel
        .findById(bookId)
        .then(function (book) {
            return book.url;
        })
}

function getBookISBN(bookId) {
    return bookModel
        .findById(bookId)
        .then(function (book) {
            return book.isbn13;
        })
}

function getBookBookstore(bookId) {
    return bookModel
        .findById(bookId)
        .populate('_bookstore')
        .exec();

}
function getBookPublisher(bookId) {
    return bookModel
        .findById(bookId)
        .populate('_publisher')
        .exec();

}
function getBookAuthor(bookId) {
    return bookModel
        .findById(bookId)
        .populate('_author')
        .exec();
}





//review
function addReview(bookId,rId) {
    return bookModel
        .findById(bookId)
        .then(function (book) {
            book._reviews.push(rId);
            // console.log(book);
            return bookModel.updateBook(bookId,book);
        });


}


function removeReview(bookId, reviewId) {
    return bookModel
        .findById(bookId)
        .then(function (book) {
            var index = book._reviews.indexOf(reviewId);
            book._reviews.splice(index, 1);
            return bookModel.updateBook(bookId,book);
        })
}

function findAllBooks() {
    return bookModel
        .find()
        .populate('_publisher')
        .exec();
}



function createBookFromApi(book) {
    return bookModel.create(book);
}

function findBookByIdWithReview(bookId) {
    return bookModel.find({_id: bookId})
        .populate('_reviews')
        .exec();
}

function findBookByISBN(bookISBN) {
    return bookModel.find({isbn13:bookISBN});
}

function setPublisher(userId,bookId) {
    return bookModel.findOne({_id: bookId})
        .then(function (book) {
            book._publisher = userId;
            return bookModel.updateBook(bookId,book);
        })
}

function addBookstore(userId,bookId) {
    return bookModel.findOne({_id:bookId})
        .then(function (book) {
            console.log(book);
            console.log(book._bookstore.indexOf(userId));
            if(book._bookstore.indexOf(userId) < 0)
                book._bookstore.push(userId);
            return bookModel.updateBook(bookId,book);
        })
}

function findAllNewBooks() {
    return bookModel.find({new:true})
        .populate('_publisher')
        .exec();

}

function createBook(book) {
    return bookModel.create(book);
}