(function () {
    angular
        .module("ITBook")
        .controller("homeController", homeController);


    function homeController(bookService,user,$location,userService, $route, reviewService,searchService, booklistService,transactionService) {
        var model = this;
        model.rightPanel = 'readers';
        model.user = user;
        model.currentBooklistId = "";
        model.errorMessage = '1';
        model.share = "";
        model.realBook = '0';
        model.logout = logout;
        model.findPublishers = findPublishers;
        model.findBookstores = findBookstores;
        model.changeRightPanel = changeRightPanel;
        model.createBooklistForUser = createBooklistForUser;
        model.searchTrack = searchTrack;
        model.showDetails = showDetails;
        model.getAllBooksFromBooklist = getAllBooksFromBooklist;
        model.findFollowers = findFollowers;
        model.unFollow = unFollow;
        model.findAllBooksByUser = findAllBooksByUser;
        model.findReviewsByReader = findReviewsByReader;
        model.findUserAvatar = findUserAvatar;
        model.findTransactions = findTransactions;
        model.accecptTransaction = accecptTransaction;
        model.rejectTransaction = rejectTransaction;
        model.cancelTransaction = cancelTransaction;
        model.findAllUsers = findAllUsers;
        model.findAllBooks = findAllBooks;
        model.findAllReviews = findAllReviews;
        model.addBookToLocal = addBookToLocal;
        model.deleteBooklistForUser = deleteBooklistForUser;
        model.removeBookFromBooklist = removeBookFromBooklist;
        model.deleteBook = deleteBook;
        model.reviewBook = reviewBook;
        model.deleteTransaction = deleteTransaction;
        model.addBookToUser = addBookToUser;
        model.deleteReview = deleteReview;
        model.defaultMessage = defaultMessage;
        model.redirect = redirect;
        function init() {
            model.transactions = [];
            console.log("user");
            console.log(user);
            console.log(model.user);
            if(model.user.type ==="READER") {
                findPublishers();
                findBookstores();
                findReviewsByReader();
                // findTransactions();
            }
            findBooklists();
            findTransactions();
        }

        init();

        function defaultMessage() {
            model.errorMessage = '1';
        }

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                    });
        }

        function findPublishers() {
            userService.findFollowingByTypeByUser(user._id, 'PUBLISHER')
                .then(function (response) {
                    model.followingPublishers = response.data;
                    console.log(model.followingPublishers);
                })
        }

        function findBookstores() {
            userService.findFollowingByTypeByUser(user._id, 'BOOKSTORE')
                .then(function (response) {
                    model.followingBookstores = response.data;
                })
        }


        function findFollowers() {
            model.rightPanel = 'followers';
            userService.findFollowersByUser(user._id)
                .then(function (response) {
                    model.followers = response.data;
                    console.log(model.followers);
                })
        }

        function unFollow(followingid) {
            userService.unFollow(user._id, followingid)
                .then(function (response) {
                    if (response) {
                        findPublishers();
                        findBookstores();
                    }
                })
        }

        function findBooklists() {
            booklistService.findAllBooklistsByUser(user._id)
                .then(function (response) {
                    console.log("find booklists");
                    console.log(response);
                    model.booklists = response.data;

                });
        }

        function findTransactions(){

            transactionService.findAllTransactionsByUser(user._id)
                .then(function (response) {
                    model.transactions = response.data;
                })
        }

        function changeRightPanel(mode) {
            model.rightPanel = mode;
        }


        function searchTrack(book) {
            model.searchContent = "";
            searchService.searchBook(book)
                .then(function (response) {
                    model.search = JSON.parse(response.data).books;
                })
        }

        function showDetails(book) {
            searchService.searchBookDetail(book.isbn13)
                .then(function (response) {
                    console.log("showDetails");
                    console.log(response.data);
                    var book = JSON.parse(response.data);
                    var authors = book.authors.split(",");
                    book.author = authors[0];
                    model.book = book;
                    searchService.findBookByISBN(book.isbn13)
                        .then(function (response) {
                            console.log("home controller show details");
                            console.log(response);
                            if(response.data.length ===0)
                                addBookToLocal(book)
                                    .then(function (realBook) {
                                        model.realBook = realBook;
                                    });
                            else
                                model.realBook = response.data[0];
                        },function (err) {
                            console.log("add book to local");

                        })

                });
        }

        function createBooklistForUser(booklist, name ,description) {
            console.log(booklist);
            if (name === null || name === '' || typeof name === 'undefined'){
                model.errorMessage = "booklist name is required";
                return;
            }
            else if (description === null || description === '' || typeof description === 'undefined'){
                model.errorMessage = "description is required";
                return;
            }
            else{
                model.errorMessage = '1';
                console.log(model.share);
                if(model.share === 'Yes')
                    booklist.share = true;
                else
                    booklist.share = false;
                booklistService.createBooklistForUser(model.user._id, booklist)
                .then(function (response) {
                    var newBooklistId = response.data._id;
                    console.log("gagaga");
                    console.log(response);
                    userService.addBooklistToUser(model.user._id, newBooklistId)
                        .then(function (res) {
                            console.log(res);
                            console.log("hahahah");
                            init();
                        });
                })
            }

            $route.reload();

        }

        function getAllBooksFromBooklist(booklistId) {
            model.currentBooklistId = booklistId;
            booklistService.getAllBooksFromBooklist(booklistId)
                .then(function (response) {
                    console.log("getAllBooksFromBooklist");
                    console.log(response);
                    model.booksFromBooklist = response.data;
                    model.rightPanel = "booklist";
                })
        }

        function findUserAvatar(userId) {
            return userService.findUserById(userId)
                .then(function (response) {
                    return response.data.avatar;
                })
        }

        function findAllBooksByUser() {
            console.log("find books");
            model.rightPanel = 'my-books';
            bookService.findAllBooksByUser(model.user._id)
                .then(function (response) {
                    model.userBooks = response.data;
                    console.log("findbookById");
                    console.log(model.userBooks);
                })
        }

        function deleteReview(reiviewId) {
            reviewService
                .deleteReview(reiviewId)
                .then(function (res) {
                    if(res.data === "1"){
                        alert("delete success");
                        findReviewsByReader();
                    }else{
                        alert("delete fail");
                    }

                })
        }
        function findReviewsByReader() {
            reviewService.findAllReviewsByUser(model.user._id)
                .then(function (response) {
                    model.reviews = response.data;
                    console.log(model.reviews)
                })
        }

        function findTransactionsByUser() {
            if(user.type === 'READER')
                findTransactionsByBuyer();
            else if(user.type === 'PUBLISHER')
                findTransactionsBySeller();
            else{
                findTransactionsByBuyer();
                findTransactionsBySeller();
            }
        }

        function findTransactionsByBuyer() {
            model.rightPanel = 'transactions';
            console.log("findTransactionsByBuyer");
            transactionService.findTransactionsByBuyer(user._id)
                .then(function (response) {
                    console.log(response.data);
                    model.transactions.concat(response.data);
                });
            console.log(model.transactions)
        }

        function findTransactionsBySeller() {
            model.rightPanel = 'transactions';
            transactionService.findTransactionsBySeller(model.user._id)
                .then(function (response) {
                    console.log(response.data);
                    model.transactions.concat(response.data);
                });
            console.log(model.transactions)
        }

        function accecptTransaction(transaction) {
            transaction.status = 'DONE';
            transactionService.updateTransaction(transaction._id, transaction)
                .then(function (response) {
                    songService.addSongOwner(transaction._song, transaction._buyer._id, transaction.price)
                        .then(function (response) {
                            $location.url("/home");
                        })
                })
        }

        function rejectTransaction(transaction) {
            transaction.status = 'REJECTED';
            transactionService.updateTransaction(transaction._id, transaction)
                .then(function (response) {
                    $location.url("/home");
                })
        }

        function cancelTransaction(transaction) {
            transaction.status = 'CANCELED';
            transactionService.updateTransaction(transaction._id, transaction)
                .then(function (response) {
                    $location.url("/home");
                })
        }

        function deleteTransaction(transaction) {
            transactionService.deleteTransaction(transaction._id)
                .then(function (response) {
                    $route.reload();
                })
        }

        function addBookToLocal(book) {

            var newBook = {
                "title": book.title,
                "author": book.author,
                "image": book.image,
                "subTitle":book.subtitle,
                "publisher":book.publisher,
                "price": Number(book.price.split("$")[1]),
                "isbn13" : book.isbn13
            };
            console.log("home controller addBookToLocal");
            return bookService.createBookFromApi(newBook)
                .then(function(response){
                    // console.log(response);
                    model.realBook = response.data;
                    return response.data;
                })
        }

        function findAllUsers() {
            userService.findAllUsers()
                .then(function (response) {
                    model.allUsers = response.data;
                })
        }

        function findAllBooks() {
            bookService.findAllBooks()
                .then(function (response) {
                    model.allBooks = response.data;
                })
        }

        function findAllReviews() {
            reviewService.findAllReviews()
                .then(function (response) {
                    model.allReviews = response.data;
                })
        }

        function removeBookFromBooklist(bookId) {
            booklistService
                .removeBookFromBooklist(model.currentBooklistId, bookId)
                .then(function (res) {
                    if (res.data !== "0") {
                        getAllBooksFromBooklist(model.currentBooklistId);
                    }

                })
        }

        function deleteBooklistForUser(booklistId) {
            userService
                .deleteBooklistForUser(user._id, booklistId)
                .then(function (status) {
                }, function (err) {
                });
            $route.reload();
        }

        function deleteBook(bookId){
            userService
                .removeBook(user._id, bookId)
                .then(function (res) {
                    if (res.data !== "0")
                        findAllBooksByUser();
                })
        }

        function  reviewBook(reviewId) {
            reviewService
                .findReviewById(reviewId)
                .then(function (res) {
                    model.newreview = res.data;
                })
            model.rightPanel = 'edit-review';
        }

        function redirect(){
            $location.url("/home");
        }

        function addBookToUser(bookId) {
            userService
                .addBookToUser(user._id,bookId,user.type)
                .then(function(response){
                    if(user.type === 'BOOKSTORE')
                        alert("add book to Bookstore success!");
                    if(user.type === 'PUBLISHER')
                        alert("add book to Publisher success!");
                })
        }

    }

})();