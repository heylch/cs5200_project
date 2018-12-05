(function() {
    angular
        .module("Musiker")
        .controller("exploreController", exploreController)

    function exploreController(user, songService, playlistService, reviewService,$location, userService) {
        var model = this;
        model.user = user;
        model.getAllSongs = getAllSongs;
        model.getAllReviews = getAllReviews;
        model.getPlaylist = getPlaylist;
        model.logout = logout;

        function init() {
            getAllSongs();
            getPlaylist();
            getAllReviews();
        }
        init();

        function getAllSongs() {
            songService.findAllSongs()
                .then(function (response) {
                    // console.log(response.data);
                    return model.songs = response.data;
                })
        }

        function getAllReviews() {
            reviewService.findAllReviews()
                .then(function (response) {
                    // console.log(response.data);
                    return model.reviews = response.data;
                })
        }

        // function addSongToPlaylist() {
        //     playlistService.addSongToPlaylist(model.playlistId, model.song._id)
        //         .then(function (response) {
        //             $location.url('/explore');
        //         })
        // }
        //
        // function favouriteSong(song) {
        //     model.favourite = "like";
        //     model.song = song;
        //     // console.log("song");
        //     // console.log(model.song);
        //
        // }
        //
        // function getSongCreator() {
        //     songService.getSongCreator(model.song._id)
        //         .then(function (response) {
        //             // console.log(response.data);
        //             return model.creator = response.data;
        //         })
        // }
        //
        function getPlaylist() {
            playlistService.findAllPlaylistsByUser(user._id)
                .then(function (response) {
                    // console.log(response);
                    model.playlists = response.data;
                    // console.log("model.playlists")
                    // console.log(model.playlists);
                });
        }

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                    });
        }
    }


})();