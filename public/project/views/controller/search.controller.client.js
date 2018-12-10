(function () {
    angular
        .module("ITBook")
        .controller("searchController", searchController);

    function searchController(searchService) {
        var model = this;

        model.searchTrack = searchTrack;
        model.showDetails = showDetails;
        model.test = "gagagag";
        function searchTrack(book) {
            model.searchContent = "";
            searchService.searchBook(book)
                .then(function (response) {
                    model.search = JSON.parse(response.data).books;
                })
        }

        function showDetails(book) {
            searchService.searchBookDetail(book.isbn13)
                .then(function (response) {
                    console.log("showDetails");
                    console.log(response.data);
                    var book = JSON.parse(response.data);
                    var authors = book.authors.split(",");
                    book.author = authors[0];
                    model.book = book;

                });
        }
    }
})();