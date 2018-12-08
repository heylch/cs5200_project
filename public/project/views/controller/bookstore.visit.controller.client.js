(function () {
    angular
        .module("ITBook")
        .controller("bookstoreVisitController", bookstoreVisitController);

    function bookstoreVisitController(userService, bookService, $routeParams, user, $location) {
        var model = this;
        model.user = user;
        var bookstoreId = $routeParams["bid"];
        model.findBookstoreInfo = findBookstoreInfo;
        model.findBookstoreBooks = findBookstoreBooks;
        model.followBookstore = followBookstore;
        model.logout = logout;
        function init() {
            findBookstoreBooks();
            findBookstoreInfo();
        }
        init();

        function findBookstoreBooks() {
            bookService.findAllBooksByUser(bookstoreId)
                .then(function (response) {
                    model.books = response.data;
                })
        }

        function findBookstoreInfo() {
            userService.findUserById(bookstoreId)
                .then(function (response) {
                    model.bookstore = response.data;
                })
        }

        function followBookstore() {
            if(model.user._id !== bookstoreId) {
                userService.addFollowingByUser(model.user._id, bookstoreId)
                    .then(function (response) {
                        // userService.addFollowersByUser(bookstoreId, model.user._id)
                        //     .then(function (response) {
                                alert("follow scceuss");
                            // })

                    })
            }
            else{
                alert("cannot follow yourself");
            }
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