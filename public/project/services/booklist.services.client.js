(function () {
    angular
        .module("ITBook")
        .service("booklistService", booklistService);


    function booklistService($http) {

        var api =  {
            "createBooklistForUser": createBooklistForUser,
            "findBooklistById": findBooklistById,
            "findBooklistByBooklistName":findBooklistByBooklistName,
            "findAllBooklistsByUser": findAllBooklistsByUser,
            "updateBooklist": updateBooklist,
            "deleteBooklist": deleteBooklist,
            "addBookToBooklist":addBookToBooklist,
            "getAllBooksFromBooklist":getAllBooksFromBooklist,
            "removeBookFromBooklist": removeBookFromBooklist,
            "findAllSharedBooklists":findAllSharedBooklists
        };

        return api;


        function findBooklistById(booklistId) {
            var url = "/projectapi/booklist/" + booklistId;
            return $http.get(url);
        }

        function findAllBooklistsByUser(userId) {
            // console.log(userId);
            var url = "/projectapi/user/" + userId + "/booklist";
            return $http.get(url);
        }
        function findAllSharedBooklists() {
            // console.log(userId);
            var url = "/projectapi/share/booklist";
            return $http.get(url);
        }


        function createBooklistForUser(userId, booklist) {
            var url = "/projectapi/user/" + userId + "/booklist";
            return $http.post(url,booklist);
        }


        function findBooklistByBooklistName(booklistname) {
            var url = "/projectapi/booklist?booklistname="+booklistname;
            return $http.get(url);
        }

        function updateBooklist(booklistId,booklist){
            var url = "/projectapi/booklist/" + booklistId;
            return $http.put(url,booklist);
        }

        function deleteBooklist(booklistId){
            var url = "/projectapi/booklist/" + booklistId;
            return $http.delete(url);
        }

        function addBookToBooklist(booklistId, bookId) {
            // console.log(booklistId);
            var url = "/projectapi/booklist/" + booklistId + "/book/" + bookId;
            return $http.put(url);
        }

        function getAllBooksFromBooklist(booklistId) {
            var url = "/projectapi/booklist/" + booklistId + "/book/";
            return $http.get(url);
        }
        function removeBookFromBooklist(booklistId,bookId) {
            var url = "/projectapi/booklist/" + booklistId + "/book/" + bookId +"/remove";
            return $http.put(url);
        }


    }

})();