var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("ReviewModel", reviewSchema);
var bookModel = require("./book.model.server");
var userModel = require("./user.model.server");
var booklistModel = require("./booklist.model.server");
var db = require("./database");

reviewModel.createReviewForBook = createReviewForBook;
reviewModel.createReviewForBooklist = createReviewForBooklist;
// reviewModel.createReviewForAuthor = createReviewForAuthor;
reviewModel.findReviewById = findReviewById;
reviewModel.findReviewByBookId = findReviewByBookId;
reviewModel.findReviewByBooklistId = findReviewByBooklistId;
reviewModel.findReviewByAuthorId = findReviewByAuthorId;
reviewModel.findAllReviewsByUser = findAllReviewsByUser;
reviewModel.deleteReview = deleteReview;
reviewModel.updateReview = updateReview;
reviewModel.findAllReviews= findAllReviews;

module.exports = reviewModel;


function createReviewForBook(userId, bookId, review) {
    review._reader = userId;
    review._book = bookId;
    review.type = "BOOK";
    var reviewId = null;
    var reviewTemp = null;
    return reviewModel
        .create(review)
        .then(function (newreview) {
            // console.log("create review for book in model step1");
            reviewTemp = newreview;
            reviewId = newreview._id;
            bookModel.addReview(bookId, newreview._id)
                .then(function (res1) {
                    userModel.addReview(userId, reviewId)
                        .then(function (res2) {
                            return reviewTemp;
                        })
                })
        });
}

// function createReviewForBook(userId, bookId, review) {
//     review._reader = userId;
//     review._book = bookId;
//     review.type = "BOOK";
//     var reviewId = null;
//     var reviewTemp = null;
//     return reviewModel
//         .create(review)
//         .then(function (newreview) {
//             // console.log("create review for book in model step1");
//             reviewTemp = newreview;
//             reviewId = newreview._id;
//             return bookModel.addReview(bookId, newreview._id)
//         })
//         .then(function (res) {
//             // console.log("create review for book in model step2");
//             return userModel.addReview(userId, reviewId);
//         })
//         .then(function (res) {
//             // console.log("create review for book in model step3");
//             return reviewTemp;
//         })
// }

function createReviewForBooklist(userId, booklistId, review) {
    review._reader = userId;
    review._booklist = booklistId;
    review.type = "BOOKLIST"
    var reviewTemp = null;
    return reviewModel
        .create(review)
        .then(function (newreview) {
            reviewTemp = newreview;
            booklistModel.addReview(booklistId, newreview._id)
                .then(function (res) {
                    return reviewTemp;
                })
        })

}



function findReviewById(reviewId) {
    return reviewModel.findOne({_id: reviewId});
}


function findReviewByBookId(bookId) {
    return reviewModel.find({_book: bookId});
}

function findReviewByBooklistId(booklistId) {
    return reviewModel.find({_booklist: booklistId});
}

function findReviewByAuthorId(authorId) {
    return reviewModel.find({_author: authorId});
}


function findAllReviewsByUser(userId) {
    return reviewModel
        .find({_reader: userId})
        .populate('_book')
        .populate('_booklist')
        .exec();
}

function deleteReview(reviewId, targetId) {
    var reviewTemp = null;
    return reviewModel
        .remove({_id: reviewId})
        .then(function (review) {
            reviewTemp = review;
            if(review.type === "BOOK"){
                return bookModel.removeReview(targetId, reviewId);
            } else if(review.type === "AUTHOR"){
                return authorModel.removeReview(targetId, reviewId);
            } else if(review.type === "BOOKLIST"){
                return booklistModel.removeReview(targetId, reviewId);
            }

        })
        .then(function (res) {
            return reviewTemp;
        })
}

function updateReview(reviewId, review) {
    return reviewModel
        .updateOne({_id: reviewId},
            {$set: review});
}

function findAllReviews() {
    return reviewModel
        .find()
        .populate('_reader')
        .populate('_book')
        .populate('_booklist')
        .populate('_author')
        .exec();
}
