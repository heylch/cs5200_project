var mongoose = require("mongoose");
var songSchema = require("./song.schema.server");
var songModel = mongoose.model("SongModel", songSchema);
// var userModel = require("./user.model.server");

songModel.findSongById = findSongById;
songModel.findSongBySongName = findSongBySongName;
songModel.findAllSongsByUser = findAllSongsByUser;
songModel.updateSong = updateSong;
songModel.getSongUrl = getSongUrl;
songModel.getSongCreator = getSongCreator;
songModel.findAllSongs = findAllSongs;
songModel.addReview = addReview;
songModel.removeReview = removeReview;
songModel.findSongByThridPartyId = findSongByThridPartyId;
songModel.createSongFromApi = createSongFromApi;
songModel.findSongByIdWithReview = findSongByIdWithReview;
songModel.addPlaylistToSong = addPlaylistToSong;
songModel.removePlaylistFromSong = removePlaylistFromSong;
songModel.deleteSong = deleteSong;
module.exports = songModel;

function deleteSong(songId) {
    return songModel.findOneAndRemove(songId)
        .then(function (song) {
            return song;
        })
}

function findSongById(songId) {
    return songModel
        .findOne({_id: songId})
        .populate('_creator')
        .exec();
}

function findSongBySongName(songname) {
    return songModel.find({name: songname});
}

function findAllSongsByUser(userId) {
    return songModel.find({_creator: userId});
}



function updateSong(songId, song) {
    return songModel
        .updateOne({_id: songId},
            {$set: song});
}

function getSongUrl(songId) {
    return songModel
        .findById(songId)
        .then(function (song) {
            return song.url;
        })
}

function getSongCreator(songId) {
    return songModel
        .findById(songId)
        .populate('_creator')
        .exec();
    // .then(function (song) {
    //     return song._creator
    //         .populate('_creator')
    //         .exec();
    // })
}

function addPlaylistToSong(playlistId, songId) {
    return songModel
        .findById(songId)
        .then(function (song) {
            song.playlists.push(playlistId);
            return song.save();
        });
}

function removePlaylistFromSong(playlistId, songId) {
    return songModel
        .findById(songId)
        .then(function (song) {
            var index = song.playlists.indexOf(playlistId);
            song.playlists.splice(index,1);
            return song.save();
        })
}

//review
function addReview(songId,rId) {
    return songModel
        .findById(songId)
        .then(function (song) {
            song.reviews.push(rId);
            return song.save();
        });
}


function removeReview(songId, reviewId) {
    return songModel
        .findById(songId)
        .then(function (song) {
            var index = song.reviews.indexOf(reviewId);
            song.reviews.splice(index, 1);
            return song.save();
        })
}

function findAllSongs() {
    return songModel
        .find()
        .populate('_creator')
        .exec();
}

function findSongByThridPartyId(thirdPartyId) {
    return songModel.findOne({'thridPartyId': thirdPartyId});
}

function createSongFromApi(song) {
    return songModel.create(song);
}

function findSongByIdWithReview(songId) {
    return songModel.find({_id: songId})
        .populate('reviews')
        .exec();
}