var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);
var booklistModel = require('./booklist.model.server');
var bookModel = require("./book.model.server");

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findAllUsers = findAllUsers;
userModel.deleteUserById = deleteUserById;
userModel.addBook = addBook;
userModel.removeBook = removeBook;
userModel.findFollowingByUser = findFollowingByUser;
userModel.findFollowingByTypeByUser = findFollowingByTypeByUser;
userModel.findFollowersByUser = findFollowersByUser;
userModel.addFollowingByUser = addFollowingByUser;
// userModel.addFollowersByUser = addFollowersByUser;
userModel.addReview = addReview;
userModel.removeReview = removeReview;
userModel.addTransaction = addTransaction;
userModel.addBooklist = addBooklist;
userModel.removeBooklist = removeBooklist;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.updateUserAvatar = updateUserAvatar;
userModel.removeFollowingUser = removeFollowingUser;
// userModel.removeFollowerUser  = removeFollowerUser;
userModel.deleteTransaction = deleteTransaction;
userModel.createBookForUser = createBookForUser;
userModel.deleteBook = deleteBook;
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
            user._booklists.forEach(function (booklistId) {
                booklistModel.deleteBooklist(booklistId);
            });
            user._publisher._books.forEach(function (bookId) {
                bookModel.deleteBook({_id:bookId});
                booklistModel.removeBookFromAllBooklists(bookId);
            });
            user._reader._followings.forEach(function (followingId) {
                userModel.removeFollowerUser(user._id, followingId);
            });
        })
}

//song

function removeBook(userId, bookId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._publisher._books.indexOf(bookId);
            user._publisher._books.splice(index, 1);
            user.save();
            // return playlistModel.removeSongFromAllPlaylists(songId);
        })
}

function addBook(userId, bookId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user._publisher._books.push(bookId);
            return user.save();
        });
}


//Follow
function findFollowingByUser(userId) {
    return userModel.findUserById(userId)
        .populate('_reader._followings')
        .exec()
        .then(function (user) {
           return user._reader._followings;
        })

}


function findFollowingByTypeByUser(userId, usertype){
    return userModel.findUserById(userId)
        .populate('_reader._followings')
        .exec()
        .then(function (user) {
            var allFollowing = user._reader_followings;
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


// function addFollowersByUser(userId, followerId) {
//     return userModel.findUserById(userId)
//         .then(function (user) {
//             var flag = '1';
//             for(var u in user.followers) {
//                 if(user.followers[u] == followerId) {
//                     flag = '0';
//                     break;
//                 }
//             }
//             if(flag === '1') {
//                 user.followers.push(followerId);
//                 user.save();
//             }
//             return user;
//         })
// }

function addFollowingByUser(userId, followingId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            var flag = '1';
            for(var u in user._reader._followings) {
                if(user._reader._followings[u] === followingId) {
                    flag = '0';
                    break;
                }
            }
            if(flag === '1') {
                user._reader._followings.push(followingId);
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
            user._reader._reviews.push(reviewId);
            return user.save();
        });
}

function removeReview(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._reader._reviews.indexOf(reviewId);
            user._reader._reviews.splice(index, 1);
            return user.save();
        })
}

//transaction
function addTransaction(userId, transactionId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user._transactions.push(transactionId);
            return user.save();
        })
}

//playlist
function addBooklist(userId, booklistId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var flag = '0';
            for(var u in user._booklists) {
                if(user._booklists[u] === booklistId) {
                    flag = '1';
                    break;
                }
            }
            if(flag === '0') {
                user._booklists.push(booklistId);
                user.save();
            }
            return user;
        })
}

function removeBooklist(userId, booklistId) {
    // return playlistModel.findById(playlistId)
    //     .then(function () {
    //         console.log("gagag");
    //     })
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._booklists.indexOf(booklistId);
            user._booklists.splice(index, 1);
            return user.save();
        })
        .then(function (userDoc) {
            return booklistModel.deleteBooklist(booklistId);
        })
}

function removeFollowingUser(userId, followingId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._reader._followings.indexOf(followingId);
            user._reader._followings.splice(index, 1);
            return user.save();
        })
}

// function removeFollowerUser(userId, followingId) {
//     return userModel
//         .findById(followingId)
//         .then(function (user) {
//             var index = user.followers.indexOf(userId);
//             user.followers.splice(index, 1);
//             return user.save();
//         })
// }

function deleteTransaction(userId, transactionId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index = user._transactions.indexOf(transactionId);
            user._transactions.splice(index, 1);
            return user.save();
        })
}

function createBookForUser(userId, book) {
    book._author = userId;
    var bookTmp = null;
    return bookModel
        .create(book)
        .then(function (bookDoc) {
            bookTmp = bookDoc;
            return userModel.addBook(userId, bookTmp._id)
        })
        .then(function (userDoc) {
            return bookTmp;
        })
}

function deleteBook(userId, bookId) {
    var bookTmp = null;
    return bookModel
        .remove({_id: bookId})
        .then(function (book) {
            bookTmp = book;
            return userModel.removeBook(userId, bookId);
        })
        .then(function (userDoc) {
            return bookTmp;
        })
}