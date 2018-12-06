(function () {
    angular
        .module("ITBook")
        .service("searchService", searchService);

    function searchService($http) {

        var api = {
            "searchBook": searchBook,
        }

        return api;

        function searchBook(book) {
            // return $http.get('https://music-api-pjheqeosjj.now.sh/api/search/song/netease?key='+song+'&limit=8&page=1')
            //     .then(function (response) {
            //         return response;
            //     })
            return $http.get('https://api.itbook.store/1.0/search/{book}')
                .then(function (response) {
                    return response;
                })
        }
    }
})();

















