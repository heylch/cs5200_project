(function () {
    angular
        .module("ITBook")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/search", {
                templateUrl: "views/templates/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/user-search", {
                templateUrl: "views/templates/user-search.html",
                controller: "searchController",
                controllerAs: "model"
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
            .when("/publisher", {
                templateUrl: "views/templates/publisher.html",
                controller: "publisherController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/publisher/:pid", {
                templateUrl: "views/templates/publisher-visit.html",
                controller: "publisherVisitController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/bookstore", {
                templateUrl: "views/templates/bookstore.html",
                controller: "bookstoreController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/bookstore/:bid", {
                templateUrl: "views/templates/bookstore-visit.html",
                controller: "bookstoreVisitController",
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
            .when("/book/:bookId", {
                templateUrl: "views/templates/book.html",
                controller: "bookController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/booklist/:booklistId",{
                templateUrl: "views/templates/booklist.html",
                controller: "booklistController",
                controllerAs: "model",
                resolve: {
                    user: checkLogin
                }
            })
            .when("/publisher/:publisherId", {
                templateUrl: "views/templates/publisher-visit.html",
                controller: "publisherVisitController",
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

