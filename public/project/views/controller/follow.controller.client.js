(function() {
    angular
        .module("Musiker")
        .controller("followController", followController)

    function followController($routeParams,$location, userService) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];

        //declare function
        model.searchUser = searchUser;
        model.followUser = followUser;
        model.logout = logout;
        //initial function
        function init() {
            userService.findFollowersByUser(model.userId)
                .then(function (response) {
                    if(response) {
                        model.followers = response.data;
                    }
                });

            userService.findFollowingByUser(model.userId)
                .then(function (response) {
                    if(response) {
                        model.followings = response.data;
                    }
                });
        }
        init();

        //functions
        function searchUser(userid) {
            userService.findUserByUsername(userid)
                .then(function (response) {
                    model.searchresult = response.data;
                })
        }

        function followUser() {
            userService.addFollowingByUser(model.userId, model.searchresult._id)
                .then(function (response) {
                })
            userService.addFollowersByUser(model.searchresult._id, model.userId)
                .then(function (response) {
                    alert("follow success");
                    init();
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