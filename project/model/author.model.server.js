var mongoose = require("mongoose");
var authorSchema = require("./author.schema.server");
var authorModel = mongoose.model("AuthorModel", authorSchema);
var bookModel = require("./book.model.server");

authorModel.createAuthorFromApi = createAuthorFromApi;
authorModel.findAuthorById = findAuthorById;
authorModel.findAuthorByName = findAuthorByName;
authorModel.deleteAuthor = deleteAuthor;
authorModel.updateAuthor = updateAuthor;
authorModel.addReview = addReview;
authorModel.addBookToAuthor = addBookToAuthor;
authorModel.removeBookFromAuthor = removeBookFromAuthor;
authorModel.getAllBooksFromAuthor = getAllBooksFromAuthor;
authorModel.removeReview = removeReview;
// authorModel.removeBookFromAllAuthors = removeBookFromAllAuthors;


module.exports = authorModel;

function createAuthorFromApi(author) {
    return authorModel.create(author);
}
function findAuthorById(authorId) {
    return authorModel.findOne({_id: authorId});
}

function findAuthorByName(authorname) {
    return authorModel.find({name: authorname});
}


function deleteAuthor(authorId) {
    return authorModel
        .remove({_id: authorId})
        .then(function (authors) {
            return authors;
        });
}

function updateAuthor(authorId,author) {
    return authorModel
        .updateOne({_id: authorId},
            {$set: author});
}


//book
function addBookToAuthor(authorId,bookId) {
    return authorModel.findAuthorById(authorId)
        .then(function (list) {
            var flag = '0';
            for(var i = 0; i < list._books.length; i ++) {
                if(list._books[i] == bookId) {
                    flag = '1';
                    break;
                }
            }
            if(flag === '0') {
                list._books.push(bookId);
            }
            return list.save();
        })
}

function removeBookFromAuthor(authorId, bookId) {
    return authorModel
        .findById(authorId)
        .then(function (list) {
            var index = list._books.indexOf(bookId);
            list._books.splice(index, 1);
            return list.save();
        })
}

// function removeBookFromAllAuthors(bookId){
//     return authorModel.find()
//         .then(function (allAuthors) {
//             allAuthors
//                 .forEach(function (author) {
//                         removeBookFromAuthor(author._id, bookId);
//                     }
//                 )
//         })
// }

function getAllBooksFromAuthor(authorId) {
    return authorModel
        .findById(authorId)
        .populate('_books')
        .exec()
        .then(function (author) {
            return author._books;
        });

}

//review
function addReview(authorId, reviewId) {
    return authorModel
        .findById(authorId)
        .then(function (list) {
            list._reviews.push(reviewId);
            return list.save();
        });
}

function removeReview(authorId, reviewId) {
    return authorModel
        .findById(authorId)
        .then(function (author) {
            var index = author._reviews.indexOf(reviewId);
            author._reviews.splice(index, 1);
            return author.save();
        })
}



