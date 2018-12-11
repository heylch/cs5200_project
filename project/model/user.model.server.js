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
// userModel.findFollowersByUser = findFollowersByUser;
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
userModel.findAllBooksByUser = findAllBooksByUser;
// userModel.addBookToUser = addBookToUser;
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
            user._books.forEach(function (bookId) {
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
            var index = user._books.indexOf(bookId);
            console.log("user server");
            console.log(bookId);
            user._books.splice(index, 1);
            return userModel.updateUser(userId,user);
        })
}


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
                console.log("addBooklist");
                console.log(booklistId);
            }
            return userModel.updateUser(userId,user);
        })
}
function addBook(userId, bookId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            console.log("addBook");
            console.log(user._books.indexOf(bookId));
            if(user._books.indexOf(bookId) <0){
                user._books.push(bookId);
            }
            console.log(user);

            // user.save();
            return userModel.updateUser(userId,user);
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
            var allFollowing = user._reader._followings;
            var specificFollowing = [];
            for (i =0; i < allFollowing.length; i++){
                if (allFollowing[i].type === usertype){
                    specificFollowing.push(allFollowing[i]);
                }
            }

            // console.log(usertype);
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
                if(user._reader._followings[u] == followingId) {
                    flag = '0';
                    break;
                }
            }
            if(flag === '1') {
                user._reader._followings.push(followingId);
                // user.save();
            }
            return userModel.updateUser(userId,user);
        })
}

//review
function addReview(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user._reader._reviews.push(reviewId);
            return userModel.updateUser(userId,user);
        });
}

function removeReview(userId, reviewId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._reader._reviews.indexOf(reviewId);
            user._reader._reviews.splice(index, 1);
            return userModel.updateUser(userId,user);
        })
}

//transaction
function addTransaction(userId, transactionId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user._transactions.push(transactionId);
            return userModel.updateUser(userId,user);
        })
}




function removeBooklist(userId, booklistId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user._booklists.indexOf(booklistId);
            user._booklists.splice(index, 1);
            return userModel.updateUser(userId,user);
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
            return userModel.updateUser(userId,user);
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
            return userModel.updateUser(userId,user);
        })
}

function createBookForUser(userId, book) {
    // book._author = userId;
    var bookTmp = null;
    return bookModel
        .createBook(book)
        .then(function (bookDoc) {
            bookTmp = bookDoc;
            console.log(bookTmp);
            userModel.addBook(userId, bookTmp._id)
                .then(function (userDoc) {
                    console.log("upload success");
                    return bookTmp;
                })
        })

}

function deleteBook(userId, bookId) {
    var bookTmp = null;
    return userModel.removeBook(userId, bookId);
    // return bookModel
    //     .remove({_id: bookId})
    //     .then(function (book) {
    //         bookTmp = book;
    //         // console.log(book);
    //         return userModel.removeBook(userId, bookId);
    //     })
    //     .then(function (userDoc) {
    //         return bookTmp;
    //     })
}

function findAllBooksByUser(userId) {
    return userModel.findById(userId)
        .populate('_books')
        .exec()
        .then(function (user) {
            return user._books;
        })
}