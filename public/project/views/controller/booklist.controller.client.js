(function () {
    angular
        .module("ITBook")
        .controller("booklistController", booklistController);

    function booklistController( booklistService,reviewService,userService,$routeParams,$location, user) {
        var model = this;
        model.user = user;
        model.errorPurchaseMessage = '1';
        model.errorReviewMessage = '1';
        model.errorFavouriteMessage = '1';
        model.findBooklistById = findBooklistById;
        model.reviewBooklist = reviewBooklist;
        model.getBooklist = getBooklist;
        model.addReviewToBooklist = addReviewToBooklist;
        model.deleteReview = deleteReview;
        model.getReview = getReview;
        model.defaultMessage = defaultMessage;
        // model.findBookReviews = findBookReviews;
        model.logout = logout;
        var booklistId = $routeParams["booklistId"];
        var hasreviewed = false;
        model.booklistId = "";
        function init() {

            findBooklistById();
            // findBookReviews();
            // getBooklist();

        }
        init();

        function getReview() {
            reviewService.isReviewedbybooklist(user._id, model.booklist._id)
                .then(function (response) {
                    if(response.data != "0"){
                        model.newreview = response.data;
                        hasreviewed = true;
                    }
                })
        }
        function findBooklistById() {

            booklistService.findBooklistById(booklistId)
                .then(function (response) {
                    model.booklist = response.data;
                    model.books = model.booklist._books;
                    model.reviews = model.booklist._reviews;
                    console.log(model.booklist);
                })
        }


        function reviewBooklist(review) {
            model.getReview();
            model.editreview = 'yes';
        }

        function addReviewToBooklist(title, comment){
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
                    reviewService.createReviewForBooklist(user._id, model.booklist._id, model.newreview)
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



        function getBooklistOwner() {
            bookService.getBookPublisher(bookId)
                .then(function (response) {
                    // console.log(response.data);
                    return model.creator = response.data;
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
                .deleteReviewForBooklist(model.newreview._id)
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