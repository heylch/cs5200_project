var bookModel = require( "../model/book.model.server");
var booklistModel = require( "../model/booklist.model.server");
var app = require("../../express");
var reviewModel = require("../model/review.model.server");
var userModel = require("../model/user.model.server");

app.post("/projectapi/user/:userId/book/:bookId/review", createReviewForBook);
app.post("/projectapi/user/:userId/booklist/:booklistId/review", createReviewForBooklist);
app.get("/projectapi/search/review/:reviewId", findReviewById);
app.get("/projectapi/reviews", findAllReviews);
app.get("/projectapi/book/:bookId/review", findReviewByBookId);
app.get("/projectapi/user/:userId/review", findAllReviewsByUser);
app.put("/projectapi/review/:reviewId", updateReview);
app.delete("/projectapi/review/:reviewId", deleteReview);
app.delete("/projectapi/listreview/:reviewId", deleteReviewForBooklist);
app.get("/projectapi/userreview/:userId/:bookId", isReviewed);
app.get("/projectapi/listreview/:userId/:booklistId", isReviewedbybooklist);



function findReviewById(req,res) {
    var reviewId = req.params.reviewId;
    reviewModel
        .findById(reviewId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}


function findReviewByBookId(req,res) {
    var bookId = req.params.bookId;
    reviewModel
        .findReviewByBookId(bookId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}


function findAllReviewsByUser(req, res) {
    var userId = req.params.userId;
    reviewModel
        .findAllReviewsByUser(userId)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}
function createReviewForBook(req,res) {
    var review = req.body;
    var userId = req.params.userId;
    var bookId = req.params.bookId;
    // console.log(bookId);
    // console.log(userId);
    reviewModel
        .createReviewForBook(userId, bookId,review)
        .then(function (review) {
            res.json(review);
        });
}
function createReviewForBooklist(req,res) {
    var review = req.body;
    var userId = req.params.userId;
    var booklistId = req.params.booklistId;
    reviewModel
        .createReviewForBooklist(userId, booklistId,review)
        .then(function (review) {
            res.json(review);
        });
}


function updateReview(req, res){
    var reviewId = req.params.reviewId;
    var newreview = req.body;
    reviewModel
        .updateReview(reviewId,newreview)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteReview(req, res) {
    var reviewId = req.params.reviewId;
    var bookId = "";
    var userId = "";
    reviewModel.findById(reviewId)
        .then(function (review) {
            bookId = review._book;
            userId = review._reader;
            reviewModel
                .remove({_id: reviewId})
                .then(function (review) {
                    return bookModel
                        .removeReview(bookId,reviewId)
                        .then(function () {
                            return userModel
                                .removeReview(userId,reviewId)
                                .then(function () {
                                    res.send("1")
                                })
                        })

                }, function (err) {
                    res.send("0");
                });
        })

}
function deleteReviewForBooklist(req, res) {
    var reviewId = req.params.reviewId;
    var booklistId = "";
    var userId = "";
    reviewModel.findById(reviewId)
        .then(function (review) {
            booklistId = review._booklist;
            userId = review._reader;
            reviewModel
                .remove({_id: reviewId})
                .then(function (review) {
                    return booklistModel
                        .removeReviewForBooklist(booklistId,reviewId)
                        .then(function () {
                            return userModel
                                .removeReview(userId,reviewId)
                                .then(function () {
                                    res.send("1")
                                })
                        })

                }, function (err) {
                    res.send("0");
                });
        })

}

function isReviewedbybooklist(req,res){
    var userId = req.params.userId;
    var booklistId = req.params.booklistId;
    reviewModel
        .findReviewByBooklistId(booklistId)
        .then(function (reviews) {
            if(reviews) {
                reviews.forEach(function(review) {
                    if(review._reader == userId){
                        res.json(review);
                        return;
                    }
                });
            }
            res.send("0");
        })
}
function isReviewed(req,res){
    var userId = req.params.userId;
    var bookId = req.params.bookId;
    reviewModel
        .findReviewByBookId(bookId)
        .then(function (reviews) {
            if(reviews) {
                reviews.forEach(function(review) {
                    if(review._reader == userId){
                        res.json(review);
                        return;
                    }
                });
            }
            res.send("0");
        })
}

function findAllReviews(req, res) {
    return reviewModel.findAllReviews()
        .then(function (reviews) {
            res.json(reviews);
        }, function (err) {
            res.sendStatus(500).send(err);
        })
}