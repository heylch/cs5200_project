var mongoose = require("mongoose");
var playlistSchema = require("./playlist.schema.server");
var playlistModel = mongoose.model("PlaylistModel", playlistSchema);
var songModel = require("./song.model.server");

playlistModel.createPlaylistForUser = createPlaylistForUser;
playlistModel.findPlaylistById = findPlaylistById;
playlistModel.findListByListName = findListByListName;
playlistModel.findAllPlaylistsByUserId = findAllPlaylistsByUserId;
playlistModel.deletePlaylist = deletePlaylist;
playlistModel.updatePlaylist = updatePlaylist;

playlistModel.addReview = addReview;
playlistModel.addSongToPlaylist = addSongToPlaylist;
playlistModel.removeSongFromPlaylist = removeSongFromPlaylist;
playlistModel.getAllSongsFromPlaylist = getAllSongsFromPlaylist;
playlistModel.removeSongFromAllPlaylists = removeSongFromAllPlaylists;


module.exports = playlistModel;

function createPlaylistForUser(userId, playlist) {
    playlist.owner = userId;
    return playlistModel
        .create(playlist)
        .then(function (list) {
            return list;
        });
}

function findPlaylistById(playlistId) {
    return playlistModel.findOne({_id: playlistId});
}

function findListByListName(playlistname) {
    return playlistModel.find({name: playlistname});
}

function findAllPlaylistsByUserId(userId) {
    return playlistModel
        .find({_owner: userId})
        .populate('_owner')
        .exec();
}

function deletePlaylist(playlistId) {
    return playlistModel
        .remove({_id: playlistId})
        .then(function (playlists) {
            return playlists;
        });
}

function updatePlaylist(playlistId,playlist) {
    return playlistModel
        .updateOne({_id: playlistId},
            {$set: playlist});
}


//song
function addSongToPlaylist(playlistId,songId) {
    return playlistModel.findPlaylistById(playlistId)
        .then(function (list) {
            var flag = '0';
            for(var i = 0; i < list.songlist.length; i ++) {
                if(list.songlist[i] == songId) {
                    flag = '1';
                    break;
                }
            }
            if(flag === '0') {
                list.songlist.push(songId);
            }
            return list.save();
        })
}

function removeSongFromPlaylist(playlistId, songId) {
    return playlistModel
        .findById(playlistId)
        .then(function (list) {
            var index = list.songlist.indexOf(songId);
            list.songlist.splice(index, 1);
            return list.save();
        })
}

function removeSongFromAllPlaylists(songId){
    return playlistModel.find()
        .then(function (allPlaylists) {
            allPlaylists
                .forEach(function (playlist) {
                    removeSongFromPlaylist(playlist._id, songId);
                }
            )
        })
}

function getAllSongsFromPlaylist(playlistId) {
    return playlistModel
        .findById(playlistId)
        .populate('songlist')
        .exec()
        .then(function (playlist) {
            return playlist.songlist;
        });

}

//review
function addReview(playlistId, reviewId) {
    return playlistModel
        .findById(playlistId)
        .then(function (list) {
            list.reviews.push(reviewId);
            return list.save();
        });
}