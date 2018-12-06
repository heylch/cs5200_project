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
            searchService.searchBook(book)
                .then(function (response) {
                    model.search = JSON.parse(response.data).books;
                    // var books = JSON.parse(response.data);
                    // console.log(books);
                })
        }

        function showDetails(book) {
            model.book = book;
        }
    }
})();