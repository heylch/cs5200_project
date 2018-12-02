var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("ProjectUserModel", userSchema);
var playlistModel = require('./playlist.model.server');
var songModel = require("./song.model.server");

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findAllUsers = findAllUsers;
userModel.deleteUserById = deleteUserById;
userModel.addSong = addSong;
userModel.removeSong = removeSong;
userModel.findFollowingByUser = findFollowingByUser;
userModel.findFollowingByTypeByUser = findFollowingByTypeByUser;
userModel.findFollowersByUser = findFollowersByUser;
userModel.addFollowingByUser = addFollowingByUser;
userModel.addFollowersByUser = addFollowersByUser;
userModel.addReview = addReview;
userModel.removeReview = removeReview;
userModel.addTransaction = addTransaction;
userModel.addPlaylist = addPlaylist;
userModel.removePlaylist = removePlaylist;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.updateUserAvatar = updateUserAvatar;
userModel.removeFollowingUser = removeFollowingUser;
userModel.removeFollowerUser  = removeFollowerUser;
userModel.deleteTransaction = deleteTransaction;
userModel.createSongForUser = createSongForUser;
userModel.deleteSong = deleteSong;
module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function updateUser(userId, user) {
    return userModel.updateOne({_id: userId},
        {$set: user});
}

function updateUserAvatar(userId, avatarUrl) {
    return userModel.updateOne({_id: userId},
        {avatar: avatarUrl});
}

function createUser(user) {
    var promise = playlistModel.findPlaylistById("88888");
    var promise2 = songModel.findSongById("88888");
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function deleteUserById(userId) {
    return userModel.findOneAndRemove({_id: userId})
        .then(function (user) {
            user.playlists.forEach(function (playlistId) {
                playlistModel.deletePlaylist(playlistId);
            });
            user.songs.forEach(function (songId) {
                songModel.deleteSong({_id:songId});
                playlistModel.removeSongFromAllPlaylists(songId);
            });
            user.following.forEach(function (followingId) {
                userModel.removeFollowerUser(user._id, followingId);
            });
            user.followers.forEach(function (followerId) {
                userModel.removeFollowingUser(followerId, user._id);
            })
        })
}

//song

function removeSong(userId, songId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.songs.indexOf(songId);
            user.songs.splice(index, 1);
            user.save();
            return playlistModel.removeSongFromAllPlaylists(songId);
        })
}

function addSong(userId, songId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.songs.push(songId);
            return user.save();
        });
}


//Follow
function findFollowingByUser(userId) {
    return userModel.findUserById(userId)
        .populate('following')
        .exec()
        .then(function (user) {
           return user.following;
        })

}

function findFollowersByUser(userId) {
    return userModel.findUserById(userId)
        .populate('followers')
        .exec()
        .then(function (user) {
            return user.followers;
        })

}

function findFollowingByTypeByUser(userId, usertype){
    return userModel.findUserById(userId)
        .populate('following')
        .exec()
        .then(function (user) {
            var allFollowing = user.following;
            var specificFollowing = [];
            for (i =0; i < allFollowing.length; i++){
                if (allFollowing[i].type === usertype){
                    specificFollowing.push(allFollowing[i]);
                }
            }
            // console.log("specificFollowing");
            // console.log(specificFollowing);
            return specificFollowing;
            // var f = _.where(following,{type: usertype});
            // console.log("artist");
            // console.log(f);
            // return f;
        })
}


function addFollowersByUser(userId, followerId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            var flag = '1';
            for(var u in user.followers) {
                if(user.followers[u] == followerId) {
                    flag = '0';
                    break;
                }
            }
            if(flag === '1') {
                user.followers.push(followerId);
                user.save();
            }
            return user;
        })
}

function addFollowingByUser(userId, followingId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            var flag = '1';
            for(var u in user.following) {
                if(user.following[u] == followingId) {
                    flag = '0';
                    break;
                }
            }
            if(flag === '1') {
                user.following.push(followingId);
                user.save();
            }
            return user;
        })
}

//review
function addReview(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.reviews.push(reviewId);
            return user.save();
        });
}

function removeReview(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.reviews.indexOf(reviewId);
            user.reviews.splice(index, 1);
            return user.save();
        })
}

//transaction
function addTransaction(userId, transactionId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.transactions.push(transactionId);
            return user.save();
        })
}

//playlist
function addPlaylist(userId, playlistId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var flag = '0';
            for(var u in user.playlists) {
                if(user.playlists[u] == playlistId) {
                    flag = '1';
                    break;
                }
            }
            if(flag === '0') {
                user.playlists.push(playlistId);
                user.save();
            }
            return user;
        })
}

function removePlaylist(userId, playlistId) {
    // return playlistModel.findById(playlistId)
    //     .then(function () {
    //         console.log("gagag");
    //     })
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.playlists.indexOf(playlistId);
            user.playlists.splice(index, 1);
            return user.save();
        })
        .then(function (userDoc) {
            return playlistModel
                .findById(playlistId);
        })
        .then(function (playlist) {
            playlist.songlist.forEach(function (songId) {
                return songModel
                    .removePlaylistFromSong(playlistId, songId)
            });
        })
        .then(function (songDoc) {
            return playlistModel.deletePlaylist(playlistId);
        })
}

function removeFollowingUser(userId, followingId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.following.indexOf(followingId);
            user.following.splice(index, 1);
            return user.save();
        })
}

function removeFollowerUser(userId, followingId) {
    return userModel
        .findById(followingId)
        .then(function (user) {
            var index = user.followers.indexOf(userId);
            user.followers.splice(index, 1);
            return user.save();
        })
}

function deleteTransaction(userId, transactionId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index = user.transactions.indexOf(transactionId);
            user.transactions.splice(index, 1);
            return user.save();
        })
}

function createSongForUser(userId, song) {
    song._user = userId;
    var songTmp = null;
    return songModel
        .create(song)
        .then(function (songDoc) {
            songTmp = songDoc;
            return userModel.addSong(userId, songTmp._id)
        })
        .then(function (userDoc) {
            return songTmp;
        })
}

function deleteSong(userId, songId) {
    var songTmp = null;
    return songModel
        .remove({_id: songId})
        .then(function (song) {
            songTmp = song;
            return userModel.removeSong(userId, songId);
        })
        .then(function (userDoc) {
            return songTmp;
        })
}