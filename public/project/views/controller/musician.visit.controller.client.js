(function () {
    angular
        .module("Musiker")
        .controller("musicianVisitController", musicianVisitController);

    function musicianVisitController(userService, songService, $routeParams, user, $location) {
        var model = this;
        model.user = user;
        var musicianId = $routeParams["musicianId"];
        model.findMusicianInfo = findMusicianInfo;
        model.findMusicianSongs = findMusicianSongs;
        model.followMusician = followMusician;
        model.logout = logout;
        function init() {
            findMusicianSongs();
            findMusicianInfo();
        }
        init();

        function findMusicianSongs() {
            songService.findAllSongsByUser(musicianId)
                .then(function (response) {
                    model.songs = response.data;
                })
        }

        function findMusicianInfo() {
            userService.findUserById(musicianId)
                .then(function (response) {
                    model.musician = response.data;
                })
        }
        
        function followMusician() {
            if(model.user._id != musicianId) {
                userService.addFollowingByUser(model.user._id, musicianId)
                    .then(function (response) {
                        userService.addFollowersByUser(musicianId, model.user._id)
                            .then(function (response) {
                                alert("follow scceuss");
                            })

                    })
            }
            else{
                alert("cannot follow yourself");
            }
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