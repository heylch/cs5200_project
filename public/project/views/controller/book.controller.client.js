(function () {
    angular
        .module("ITBook")
        .controller("bookController", bookController);

    function bookController(bookService, booklistService,reviewService,userService, transactionService,$routeParams,$location, user) {
        var model = this;
        model.user = user;
        model.errorPurchaseMessage = '1';
        model.errorReviewMessage = '1';
        model.errorFavouriteMessage = '1';
        model.findBookInfo = findBookInfo;
        model.addBook = addBook;
        model.reviewBook = reviewBook;
        model.editBook = editBook;
        model.updateBook = updateBook;
        model.addBookToBooklist = addBookToBooklist;
        model.favouriteBook = favouriteBook;
        model.getBookCreator = getBookCreator;
        model.getBooklist = getBooklist;
        model.deleteBook = deleteBook;
        model.addReviewToBook = addReviewToBook;
        model.deleteReview = deleteReview;
        model.getReview = getReview;
        model.purchaseBook = purchaseBook;
        model.cancelPurchase = cancelPurchase;
        model.defaultMessage = defaultMessage;
        model.findBookReviews = findBookReviews;
        model.logout = logout;
        var bookId = $routeParams["bookId"];
        var hasreviewed = false;
        model.favourite = "no";
        model.buy = "no";
        model.booklistId = "";
        function init() {
            findBookInfo();
            findBookReviews();
            getBooklist();
        }
        init();

        function getReview() {
            reviewService.isReviewed(user._id, model.book._id)
                .then(function (response) {
                    if(response.data != "0"){
                        model.newreview = response.data;
                        hasreviewed = true;
                    }
                })
        }
        function findBookInfo() {
            bookService.findBookById(bookId)
                .then(function (response) {
                    model.book = response.data;
                    // console.log(model.book);
                })
        }

        function addBook(book) {

        }

        function editBook() {
            model.edit = 'yes';
        }

        function reviewBook(review) {
            model.getReview();
            model.editreview = 'yes';
        }

        function addReviewToBook(title, comment){
            if (title === null || title === '' || typeof title === 'undefined'){
                model.errorReviewMessage = "title is required";
                return;
            }
            else if (comment === null || comment === '' || typeof comment === 'undefined'){
                model.errorReviewMessage = "review is required";
                return;
            }

            else if(model.newreview.title && model.newreview.comment){
                model.errorReviewMessage = '1';
                if(hasreviewed === true){
                    reviewService.updateReview(model.newreview._id, model.newreview)
                        .then(function (res) {
                            alert("success")
                            $location.url('/explore');
                        })
                }
                else{
                    reviewService.createReviewForBook(user._id, model.book._id, model.newreview)
                        .then(function (res) {
                            alert("success")
                            $location.url('/explore');
                        })
                }
            }
        }

        function defaultMessage() {
            model.errorPurchaseMessage = '1';
            model.errorReviewMessage = '1';
            model.errorFavouriteMessage = '1';

        }

        function purchaseBook(price) {
            if(model.book._owner) {
                model.errorPurchaseMessage = "Alreay purchased by another publisher";
            } else if(!price) {
                model.errorPurchaseMessage = "Please offer your price";
            }
            else {
                var transaction = {};
                transaction._buyer = model.user._id;
                transaction._seller = model.book._publisher._id;
                transaction._book = model.book._id;
                transaction.price = price;
                transaction.status = "PENDING";
                transactionService.createTransaction(model.user._id, model.book._id, transaction)
                    .then(function (response) {
                        $location.url('/explore');
                    })
            }
        }

        function cancelPurchase() {
            model.buy = "no";
        }

        function addBookToBooklist(booklist) {
            if (booklist === null || booklist === '' || typeof booklist === 'undefined'){
                model.errorFavouriteMessage = "please select booklist";
                return;
            }
            else{
                model.errorFavouriteMessage = '1';
                booklistService.addBookToBooklist(model.booklistId, bookId)
                    .then(function (response) {
                        alert("add to booklist success");
                        $location.url('/home');
                    })

                // bookService.addBooklistToBook(model.booklistId, bookId)
                //     .then(function (response) {
                //         alert("add to booklist success");
                //         $location.url('/home');
                //     })
            }

        }

        function favouriteBook(option) {
            model.favourite = option;

        }

        function getBookCreator() {
            bookService.getBookPublisher(bookId)
                .then(function (response) {
                    // console.log(response.data);
                    return model.creator = response.data;
                })
        }

        function updateBook(bookname) {
            model.book.title = bookname;
            bookService.updateBook(model.book._id, model.book)
                .then(function (response) {
                    model.edit = 'no';
                    return init();
                })
        }

        function deleteBook(bookId) {
            return bookService.deleteBook(user._id, bookId)
                .then(function (response) {
                    alert("success")
                    $location.url("/home");
                })
        }

        function getBooklist() {
            booklistService.findAllBooklistsByUser(user._id)
                .then(function (response) {
                    console.log(response);
                    model.booklists = response.data;
                });
        }

        function findBookReviews() {
            bookService.findBookByIdWithReview(bookId)
                .then(function (response) {
                    // console.log(response.data);
                    model.reviews = response.data[0].reviews;
                })
        }

        function deleteReview() {
            reviewService
                .deleteReview(model.newreview._id)
                .then(function (res) {
                    if(res.data === "1"){
                        alert("delete success");
                        $location.url('/home');
                    }else{
                        alert("delete fail");
                    }

                })
        }

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                    });
        }
    }
})();