(function () {
    angular
        .module("ITBook")
        .controller("publisherVisitController", publisherVisitController);

    function publisherVisitController(userService, bookService, $routeParams, user, $location) {
        var model = this;
        model.user = user;
        var publisherId = $routeParams["pid"];
        model.findPublisherInfo = findPublisherInfo;
        model.findPublisherBooks = findPublisherBooks;
        model.followPublisher = followPublisher;
        model.logout = logout;
        function init() {
            findPublisherBooks();
            findPublisherInfo();
        }
        init();

        function findPublisherBooks() {
            bookService.findAllBooksByUser(publisherId)
                .then(function (response) {
                    // console.log(response.data);
                    model.books = response.data;
                })
        }

        function findPublisherInfo() {
            userService.findUserById(publisherId)
                .then(function (response) {
                    model.publisher = response.data;
                })
        }
        
        function followPublisher() {
            if(model.user._id !== publisherId) {
                userService.addFollowingByUser(model.user._id, publisherId)
                    .then(function (response) {
                                alert("follow scceuss");

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