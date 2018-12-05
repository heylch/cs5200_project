(function () {
    angular
        .module("Musiker")
        .controller("criticVisitController", criticVisitController);

    function criticVisitController(userService, reviewService, $routeParams, $location, user) {
        var model = this;
        model.user = user;
        var criticId = $routeParams["criticId"];
        model.findCriticInfo = findCriticInfo;
        model.findCriticReviews = findCriticReviews;
        model.followCritic = followCritic;
        model.logout = logout;
        function init() {
            findCriticReviews();
            findCriticInfo();
        }
        init();

        function findCriticReviews() {
            reviewService.findAllReviewsByUser(criticId)
                .then(function (response) {
                    model.reviews = response.data;
                })
        }

        function findCriticInfo() {
            userService.findUserById(criticId)
                .then(function (response) {
                    model.critic = response.data;
                })
        }
        
        function followCritic() {
            if (model.user._id != criticId) {
                userService.addFollowingByUser(model.user._id, criticId)
                    .then(function (response) {
                        userService.addFollowersByUser(criticId, model.user._id)
                            .then(function (response) {
                                alert("follow scceuss");
                            })

                    })
            }
            else {
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