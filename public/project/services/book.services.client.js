(function () {
    angular
        .module("ITBook")
        .service("bookService", bookService);


    function bookService($http) {

        var api =  {
            "createBookForUser": createBookForUser,
            "findBookById": findBookById,
            "findBookByBookName":findBookByBookName,
            "findAllBooksByUser": findAllBooksByUser,
            "updateBook": updateBook,
            "deleteBook": deleteBook,
            "findAllBooks": findAllBooks,
            "getBookCreator":getBookCreator,
            "addBookOwner": addBookOwner,
            // "addBooklistToBook": addBooklistToBook,
            "createBookFromApi": createBookFromApi,
            "findBookByIdWithReview": findBookByIdWithReview,
            "findAllNewBooks":findAllNewBooks
        };
        return api;

        function findBookByIdWithReview(bookId) {
            var url = "/projectapi/review/book/" + bookId;
            return $http.get(url);
        }

        function findBookById(bookId) {
            var url = "/projectapi/search/book/" + bookId;
            return $http.get(url);
        }

        function findAllBooksByUser(userId) {
            var url = "/projectapi/user/" + userId + "/book";
            return $http.get(url);
        }

        function createBookForUser(userId, book) {
            var url = "/projectapi/user/" + userId + "/book";
            return $http.post(url, book);
        }

        function createBookFromApi(book) {
            var url = "/projectapi/book/api";
            return $http.post(url, book);
        }

        function findBookByBookName(bookname) {
            var url = "/projectapi/book?bookname="+bookname;
            return $http.get(url);
        }

        function updateBook(bookId,book){
            var url = "/projectapi/book/" + bookId;
            return $http.put(url, book);
        }

        function deleteBook(userId, bookId){
            var url = "/projectapi/user/" + userId + "/book/" + bookId;
            return $http.delete(url);
        }

        function findAllBooks() {
            var url = "/projectapi/books";
            return $http.get(url);
        }

        function getBookCreator(bookId) {
            var url = "/projectapi/book/" + bookId + "/creator";
            return $http.get(url);
        }
        function addBookOwner(bookId, ownerId, price) {
            var url = "/projectapi/book/" + bookId + "/owner/" + ownerId + "/price/" + price;
            console.log(url);
            return $http.put(url);
        }

        function findAllNewBooks(){
            var url = "/projectapi/book/new"
            return $http.get(url);
        }

        // function addBooklistToBook(booklistId, bookId) {
        //     var url = "/projectapi/book/" + bookId + "/booklist/" + booklistId;
        //     console.log(url);
        //     return $http.put(url);
        // }

    }

})();