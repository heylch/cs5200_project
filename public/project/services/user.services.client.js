(function () {
    angular
        .module("ITBook")
        .service("userService", userService);

    function userService($http) {

        var api =  {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername":findUserByUsername,
            "findUserByCredentials": login,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "removeBook":removeBook,
            "addBook":addBook,
            "findFollowingByUser":findFollowingByUser,
            "findFollowingByTypeByUser":findFollowingByTypeByUser,
            "logout": logout,
            "findFollowersByUser":findFollowersByUser,
            "addFollowingByUser":addFollowingByUser,
            "addFollowersByUser":addFollowersByUser,
            "unFollow": unFollow,
            "findAllUsers": findAllUsers,
            "checkLogin": checkLogin,
            "deleteBooklistForUser":deleteBooklistForUser,
            "addBooklistToUser":addBooklistToUser,
            "addBookToUser":addBookToUser,
        };

        return api;

        function login(username, password) {
            var url = "/projectapi/login";
            // /user?username=alice&password=alice
            return $http.post(url, {username: username, password: password});
        }

        function findUserById(userId) {
            var url = "/projectapi/user/" + userId;
            return $http.get(url);

        }

        function createUser(user) {
            var url = "/projectapi/user";
            return $http.post(url,user);
        }

        function findUserByUsername(username) {
            var url = "/projectapi/user?username="+username;
            return $http.get(url);
        }

        function updateUser(userId,user){
            var url = "/projectapi/user/" + userId;
            return $http.put(url,user);
        }

        function deleteUser(userId){
            var url = "/projectapi/user/" + userId;
            return $http.delete(url);
        }

        function logout(user) {
            return $http.post("/projectapi/logout");
        }

        function removeBook(userId, bookId) {
            var url = "/projectapi/user/" + userId + "/book/" + bookId;
            return $http.delete(url);
        }

        function addBooklistToUser(userId, booklistId) {
            console.log(booklistId);
            var url = "/projectapi/user/" + userId + "/booklist/" + booklistId;
            return $http.put(url);
        }

        function deleteBooklistForUser(userId, booklistId) {
            var url = "/projectapi/user/" + userId + "/booklist/" + booklistId;
            return $http.delete(url);
        }

        function addBook(userId, bookId) {
            var url = "/projectapi/user/" + userId + "/book/" + bookId;
            return $http.post(url);
        }

        function findFollowingByUser(userId) {
            var url = "/projectapi/user/" + userId + "/following";
            return $http.get(url);
        }

        function findFollowingByTypeByUser(userId, type) {
            var url = "/projectapi/user/" + userId + "/following/" + type;
            return $http.get(url);
        }

        function findFollowersByUser(userId) {
            var url = "/projectapi/user/" + userId + "/follower";
            return $http.get(url);
        }

        function addFollowingByUser(userId, followingId) {
            var url = "/projectapi/user/" + userId + "/following/" + followingId;
            return $http.put(url);
        }

        function addFollowersByUser(userId, followerId) {
            var url = "/projectapi/user/" + userId + "/follower/" + followerId;
            return $http.put(url);
        }
        function unFollow(userId, followingId) {
            var url = "/projectapi/user/" + userId + "/unfollowuser/" + followingId;
            return $http.put(url);
        }

        function findAllUsers() {
            var url = "/projectapi/users";
            return $http.get(url);
        }



        function checkLogin() {
            return $http
                .get("/projectapi/checkLogin")
                .then(function (response) {
                    return response.data;
                })
        }

        function addBookToUser(userId,bookId,userType) {
            var url = "/projectapi/user/" + userId + "/book/" + bookId+"/type/"+userType;
            return $http.put(url);
        }

    }

})();