(function() {
    angular
        .module("ITBook")
        .controller("exploreController", exploreController);

    function exploreController(bookService,user, booklistService, reviewService,$location, userService) {
        var model = this;
        model.user = user;
        // model.getAllBooks = getAllBooks;
        model.getAllReviews = getAllReviews;
        model.getBooklist = getBooklist;
        model.logout = logout;
        model.getAllBooksFromBooklist = getAllBooksFromBooklist;
        model.getAllNewBooks = getAllNewBooks;

        function init() {
            getAllNewBooks();
            getBooklist();
            getAllReviews();
        }
        init();


        function getAllNewBooks() {
            bookService.findAllNewBooks()
                .then(function (response) {
                    // console.log(response.data);
                    return model.books = response.data;
                })
        }
        // function getAllSongs() {
        //     songService.findAllSongs()
        //         .then(function (response) {
        //             // console.log(response.data);
        //             return model.songs = response.data;
        //         })
        // }

        function getAllReviews() {
            reviewService.findAllReviews()
                .then(function (response) {
                    // console.log(response.data);
                    return model.reviews = response.data;
                })
        }

        function getBooklist() {
            booklistService.findAllSharedBooklists()
                .then(function (response) {
                    // console.log(response);
                    model.booklists = response.data;
                    // console.log("model.booklists")
                    // console.log(model.booklists);
                });
        }
        function getAllBooksFromBooklist(booklistId) {
            model.currentBooklistId = booklistId;
            booklistService.getAllBooksFromBooklist(booklistId)
                .then(function (response) {
                    console.log("getAllBooksFromBooklist");
                    console.log(response);
                    model.booksFromBooklist = response.data;
                    // console.log("getAllSongsFromPlaylist");
                    // console.log(model.books);
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