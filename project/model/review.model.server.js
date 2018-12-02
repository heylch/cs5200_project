var mongoose = require("mongoose");
var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("ReviewModel", reviewSchema);
var songModel = require("./song.model.server");
var userModel = require("./user.model.server");
var playlistModel = require("./playlist.model.server");
var db = require("./database");

reviewModel.createReviewForSong = createReviewForSong;
reviewModel.createReviewForPlaylist = createReviewForPlaylist;
reviewModel.createReviewForMusician = createReviewForMusician;
reviewModel.findReviewById = findReviewById;
reviewModel.findReviewBySongId = findReviewBySongId;
reviewModel.findReviewByPlaylistId = findReviewByPlaylistId;
reviewModel.findReviewByMusicianId = findReviewByMusicianId;
reviewModel.findAllReviewsByUser = findAllReviewsByUser;
reviewModel.deleteReview = deleteReview;
reviewModel.updateReview = updateReview;
reviewModel.findAllReviews= findAllReviews;

module.exports = reviewModel;

function createReviewForSong(userId, songId, review) {
    review._critic = userId;
    review._song = songId;
    var reviewId = null;
    var reviewTemp = null;
    return reviewModel
        .create(review)
        .then(function (newreview) {
            reviewTemp = newreview;
            reviewId = newreview._id;
            songModel.addReview(songId, newreview._id)
        })
        .then(function (r) {
            return userModel.addReview(userId, reviewId);
        })
        .then(function (res) {
            return reviewTemp;
        })
}

function createReviewForPlaylist(userId, playlistId, review) {
    review._critic = userId;
    review._song = playlistId;
    var reviewTemp = null;
    return reviewModel
        .create(review)
        .then(function (newreview) {
            reviewTemp = newreview;
            return playlistModel.addReview(playlistId, newreview._id)
        })
        .then(function (res) {
            return reviewTemp;
        })
}

function createReviewForMusician(userId, musicianId, review) {
    review._critic = userId;
    review._musician = musicianId;
    var reviewTemp = null;
    return reviewModel
        .create(review)
        .then(function (newreview) {
            reviewTemp = newreview;
            return userModel.addReview(musicianId, newreview._id)
        })
        .then(function (res) {
            return reviewTemp;
        })
}

function findReviewById(reviewId) {
    return reviewModel.findOne({_id: reviewId});
}


function findReviewBySongId(songId) {
    return reviewModel.find({_song: songId});
}

function findReviewByPlaylistId(playlistId) {
    return reviewModel.find({_playlist: playlistId});
}

function findReviewByMusicianId(musicianId) {
    return reviewModel.find({_musician: musicianId});
}


function findAllReviewsByUser(userId) {
    return reviewModel
        .find({_critic: userId})
        .populate('_song')
        .exec()
}

function deleteReview(reviewId, targetId) {
    var reviewTemp = null;
    return reviewModel
        .remove({_id: reviewId})
        .then(function (review) {
            reviewTemp = review;
            if(review.type === "FORSONG"){
                return songModel.removeReview(targetId, reviewId);
            } else if(review.type === "FORMUSICIAN"){
                return userModel.removeReview(targetId, reviewId);
            } else if(review.type === "FORPLAYLIST"){
                return playlistModel.removeReview(targetId, reviewId);
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
        .populate('_critic')
        .populate('_song')
        .exec();
}
