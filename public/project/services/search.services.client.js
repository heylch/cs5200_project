(function () {
    angular
        .module("ITBook")
        .service("searchService", searchService);

    function searchService($http) {

        var api = {
            "searchBook": searchBook,
            "searchBookDetail":searchBookDetail,
            "findBookByISBN":findBookByISBN
        };

        return api;

        function searchBook(book) {
            return $http.get('/projectapi/search/thirdparty?bookname='+book)
                .then(function (response) {
                    return response;
                })
        }


        function searchBookDetail(isbn) {
            return $http.get('/projectapi/search/thirdparty/detail?bookisbn='+isbn)
                .then(function (response) {
                    // console.log('searchserver');
                    // console.log(response);
                    // console.log(response.authors);
                    return response;
                })
        }

        function findBookByISBN(isbn) {
            return $http.get('/projectapi/book/isbn?bookisbn='+isbn);
        }
    }
})();

















