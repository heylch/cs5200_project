(function () {
    angular
        .module("Musiker")
        .service("searchService", searchService);

    function searchService($http) {

        var api = {
            "searchSong": searchSong,
        }

        return api;

        function searchSong(song) {
            return $http.get('https://music-api-pjheqeosjj.now.sh/api/search/song/netease?key='+song+'&limit=8&page=1')
                .then(function (response) {
                    return response;
                })
        }
    }
})();

















