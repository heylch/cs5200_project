(function () {
    angular
        .module("ITBook")
        .controller("publisherVisitController", publisherVisitController);

    function publisherVisitController(userService, songService, $routeParams, user, $location) {
        var model = this;
        model.user = user;
        var publisherId = $routeParams["publisherId"];
        model.findPublisherInfo = findPublisherInfo;
        model.findPublisherBooks = findPublisherBooks;
        // model.followPublisher = followPublisher;
        model.logout = logout;
        function init() {
            findPublisherBooks();
            findPublisherInfo();
        }
        init();

        function findPublisherBooks() {
            bookService.findAllBooksByUser(musicianId)
                .then(function (response) {
                    model.songs = response.data;
                })
        }

        function findPublisherInfo() {
            userService.findUserById(musicianId)
                .then(function (response) {
                    model.musician = response.data;
                })
        }
        
        function followMusician() {
            if(model.user._id != musicianId) {
                userService.addFollowingByUser(model.user._id, musicianId)
                    .then(function (response) {
                        userService.addFollowersByUser(musicianId, model.user._id)
                            .then(function (response) {
                                alert("follow scceuss");
                            })

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