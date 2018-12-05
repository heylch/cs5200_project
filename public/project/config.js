(function () {
    angular
        .module("Musiker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/search", {
                templateUrl: "views/templates/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/play", {
                templateUrl: "views/templates/play.html"
            })
            .when("/", {
                templateUrl: "views/templates/login.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/explore", {
                templateUrl: "views/templates/explore.html",
                controller: "exploreController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/profile", {
                templateUrl: "views/templates/profile.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/user/:uid", {
            templateUrl: "views/templates/home.html",
            controller: "homeController",
            controllerAs: "model",
            resolve: {
                user: checkLogin
            }
        })
            .when("/home", {
                templateUrl: "views/templates/home.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/user/:uid/follow", {
                templateUrl: "views/templates/follow.html",
                controller: "followController",
                controllerAs: "model"
            })
            .when("/user/:uid/edit", {
                templateUrl: "views/templates/admin-edit-user.html",
                controller: "adminEditUserController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/review/:rid/edit", {
                templateUrl: "views/templates/admin-edit-review.html",
                controller: "adminEditReviewController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/song/:songId", {
                templateUrl: "views/templates/song.html",
                controller: "songController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/musician/:musicianId", {
                templateUrl: "views/templates/musician-visit.html",
                controller: "musicianVisitController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/critic/:criticId", {
                templateUrl: "views/templates/critic-visit.html",
                controller: "criticVisitController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })

        function checkLogin(userService, $q, $location) {
            var deferred = $q.defer();
            userService
                .checkLogin()
                .then(function (user) {
                    if(user === '0') {
                        deferred.reject();
                        $location.url("/");
                    } else {
                        deferred.resolve(user);
                    }
                })
            return deferred.promise;
        }
    }
}());

