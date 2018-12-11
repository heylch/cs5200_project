var mongoose = require("mongoose");
var booklistSchema = require("./booklist.schema.server");
var booklistModel = mongoose.model("BooklistModel", booklistSchema);
var bookModel = require("./book.model.server");

booklistModel.createBooklistForUser = createBooklistForUser;
booklistModel.findBooklistById = findBooklistById;
booklistModel.findListByListName = findListByListName;
booklistModel.findAllBooklistsByUserId = findAllBooklistsByUserId;
booklistModel.deleteBooklist = deleteBooklist;
booklistModel.updateBooklist = updateBooklist;
booklistModel.addReview = addReview;
booklistModel.removeReviewForBooklist =removeReviewForBooklist;
booklistModel.addBookToBooklist = addBookToBooklist;
booklistModel.removeBookFromBooklist = removeBookFromBooklist;
booklistModel.getAllBooksFromBooklist = getAllBooksFromBooklist;
booklistModel.removeBookFromAllBooklists = removeBookFromAllBooklists;
booklistModel.findAllSharedBooklists =findAllSharedBooklists;

module.exports = booklistModel;

function createBooklistForUser(userId, booklist) {
    booklist._owner = userId;
    return booklistModel
        .create(booklist)
        .then(function (list) {
            return list;
        });
}

function findBooklistById(booklistId) {
    return booklistModel.findOne({_id: booklistId})
        .populate('_books')
        .populate('_owner')
        .populate('_reviews')
        .exec();
}

function findListByListName(booklistname) {
    return booklistModel.find({name: booklistname});
}

function findAllBooklistsByUserId(userId) {
    return booklistModel
        .find({_owner: userId})
        .populate('_owner')
        .exec();
}
function findAllSharedBooklists(){
    return booklistModel
        .find({share: true})
        .populate('_owner')
        .exec();
}

function findAllShareBooklist() {
    return booklistModel
        .find({_share: true})
        .populate('_owner')
        .exec();
}

function deleteBooklist(booklistId) {
    return booklistModel
        .remove({_id: booklistId})
        .then(function (booklists) {
            return booklists;
        });
}

function updateBooklist(booklistId,booklist) {
    return booklistModel
        .updateOne({_id: booklistId},
            {$set: booklist});
}


//book
function addBookToBooklist(booklistId,bookId) {
    return booklistModel.findBooklistById(booklistId)
        .then(function (list) {
            var flag = '0';
            for(var i = 0; i < list._books.length; i ++) {
                if(list._books[i]._id == bookId) {
                    flag = '1';
                    break;
                }
            }
            if(flag === '0') {
                list._books.push(bookId);
            }
            return booklistModel.updateBooklist(booklistId,list);
        })
}

function removeBookFromBooklist(booklistId, bookId) {
    return booklistModel
        .findById(booklistId)
        .then(function (list) {
            var index = list._books.indexOf(bookId);
            list._books.splice(index, 1);
            return booklistModel.updateBooklist(booklistId,list);
        })
}

function removeBookFromAllBooklists(bookId){
    return booklistModel.find()
        .then(function (allBooklists) {
            allBooklists
                .forEach(function (booklist) {
                        removeBookFromBooklist(booklist._id, bookId);
                    }
                )
        })
}

function getAllBooksFromBooklist(booklistId) {
    return booklistModel
        .findById(booklistId)
        .populate('_books')
        .exec()
        .then(function (booklist) {
            return booklist._books;
        });

}


//review
function addReview(booklistId, reviewId) {
    return booklistModel
        .findBooklistById(booklistId)
        .then(function (list) {
            list._reviews.push(reviewId);
            return booklistModel.updateBooklist(booklistId,list);
        });
}

function removeReviewForBooklist(booklistId, reviewId) {
    return booklistModel
        .findBooklistById(booklistId)
        .then(function (list) {
            var index = list._reviews.indexOf(reviewId);
            list._reviews.splice(index, 1);
            return booklistModel.updateBooklist(booklistId,list);
        })
}


