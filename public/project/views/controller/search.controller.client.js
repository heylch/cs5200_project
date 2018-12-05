(function () {
    angular
        .module("Musiker")
        .controller("searchController", searchController);

    function searchController(searchService) {
        var model = this;

        model.searchTrack = searchTrack;
        model.showDetails = showDetails;
        model.test = "gagagag";
        function searchTrack(song) {
            searchService.searchSong(song)
                .then(function (response) {
                    model.search = response.data.songList;
                })
        }

        function showDetails(song) {
            model.song = song;
        }
    }
})();