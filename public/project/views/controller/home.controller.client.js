(function () {
    angular
        .module("Musiker")
        .controller("homeController", homeController);


    function homeController(songService,user,$location,userService, $route, reviewService,searchService, playlistService,transactionService) {
        var model = this;
        model.rightPanel = 'musicians';
        model.user = user;
        model.currentPlaylistId = "";
        model.errorMessage = '1';
        model.logout = logout;
        model.findMusicians = findMusicians;
        model.findCritics = findCritics;
        model.findCritics = findCritics;
        model.changeRightPanel = changeRightPanel;
        model.createPlaylistForUser = createPlaylistForUser;
        model.searchTrack = searchTrack;
        model.showDetails = showDetails;
        model.getAllSongsFromPlaylist = getAllSongsFromPlaylist;
        model.findFollowers = findFollowers;
        model.unFollow = unFollow;
        model.findSongsByMusician = findSongsByMusician;
        model.findReviewsByCritic = findReviewsByCritic;
        model.findMusicianAvatar = findMusicianAvatar;
        model.findTransactionsByPublisher = findTransactionsByPublisher;
        model.findTransactionsByMusician = findTransactionsByMusician;
        model.accecptTransaction = accecptTransaction;
        model.rejectTransaction = rejectTransaction;
        model.cancelTransaction = cancelTransaction;
        model.findAllUsers = findAllUsers;
        model.findAllSongs = findAllSongs;
        model.findAllReviews = findAllReviews;
        model.addSongToLocal = addSongToLocal;
        model.deletePlaylistForUser = deletePlaylistForUser;
        model.removeSongFromPlaylist = removeSongFromPlaylist;
        model.deleteSong = deleteSong;
        model.reviewSong = reviewSong;
        model.deleteTransaction = deleteTransaction;
        model.findCritics = findCritics;
        model.defaultMessage = defaultMessage;
        function init() {
            if (model.user.type === 'MUSICIAN') {
                model.rightPanel = 'my-songs';
                findSongsByMusician();
                findCritics();
            }
            if (model.user.type === 'PUBLISHER') {
                model.rightPanel = 'transactions';
                findTransactionsByPublisher();
            }
            findMusicians();
            findCritics();
            findPlaylists();
            if (model.user.type === 'CRITIC') {
                model.rightPanel = 'my-reviews';
                findMusicians();
                findPlaylists();
                findReviewsByCritic();
            }

            if (model.user.type === 'ADMIN') {
                findCritics();
                findAllUsers();
                findAllSongs();
                findAllReviews();
            }
        }

        init();

        function defaultMessage() {
            model.errorMessage = '1';
        }

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                    });
        }

        function findMusicians() {
            userService.findFollowingByTypeByUser(user._id, 'MUSICIAN')
                .then(function (response) {
                    model.followingMusicians = response.data;
                    // console.log(model.followingMusicians);
                })
        }

        function findCritics() {
            userService.findFollowingByTypeByUser(user._id, 'CRITIC')
                .then(function (response) {
                    model.followingCritics = response.data;
                    // console.log(model.followingMusicians);
                })
        }

        function findCritics() {
            userService.findFollowingByTypeByUser(user._id, 'CRITIC')
                .then(function (response) {
                    model.followingCritics = response.data;
                    // console.log(model.followingMusicians);
                })
        }

        function findFollowers() {
            model.rightPanel = 'followers';
            userService.findFollowersByUser(user._id)
                .then(function (response) {
                    model.followers = response.data;
                    console.log(model.followers);
                })
        }

        function unFollow(followingid) {
            userService.unFollow(user._id, followingid)
                .then(function (response) {
                    if (response) {
                        findMusicians();
                        findCritics();
                    }
                })
        }

        function findPlaylists() {
            playlistService.findAllPlaylistsByUser(user._id)
                .then(function (response) {
                    // console.log(response);
                    model.playlists = response.data;
                    // console.log("model.playlists")
                    // console.log(model.playlists);
                });
        }

        function changeRightPanel(mode) {
            model.rightPanel = mode;
        }


        function searchTrack(song) {
            searchService.searchSong(song)
                .then(function (response) {
                    model.search = response.data.songList;
                })
        }

        function showDetails(song) {
            model.song = song;
        }

        function createPlaylistForUser(playlist, name ,description) {
            if (name === null || name === '' || typeof name === 'undefined'){
                model.errorMessage = "playlist name is required";
                return;
            }
            else if (description === null || description === '' || typeof description === 'undefined'){
                model.errorMessage = "description is required";
                return;
            }
            else{
                model.errorMessage = '1';
                playlistService.createPlaylistForUser(model.user._id, playlist)
                .then(function (response) {
                    var newPlaylistId = response.data._id;
                    console.log(response);
                    userService.addPlaylistToUser(model.user._id, newPlaylistId)
                        .then(function (response) {
                            console.log("hahahah");
                            init();
                        });
                })
            }

            $route.reload();

        }

        function getAllSongsFromPlaylist(playlistId) {
            model.currentPlaylistId = playlistId;
            playlistService.getAllSongsFromPlaylist(playlistId)
                .then(function (response) {
                    model.songs = response.data;
                    model.rightPanel = "songlist";
                    // console.log("getAllSongsFromPlaylist");
                    // console.log(model.songs);
                })
        }

        function findMusicianAvatar(musicianId) {
            return userService.findUserById(musicianId)
                .then(function (response) {
                    return response.data.avatar;
                })
        }

        function findSongsByMusician() {
            model.rightPanel = 'my-songs';
            songService.findAllSongsByUser(model.user._id)
                .then(function (response) {
                    model.musicianSongs = response.data;
                    console.log("findSongById");
                    console.log(model.musicianSongs);
                })
        }

        function findReviewsByCritic() {
            model.rightPanel = 'my-reviews';
            reviewService.findAllReviewsByUser(model.user._id)
                .then(function (response) {
                    model.reviews = response.data;
                })
        }

        function findTransactionsByPublisher() {
            model.rightPanel = 'transactions';
            transactionService.findTransactionsByBuyer(model.user._id)
                .then(function (response) {
                    model.transactions = response.data;
                })
            console.log(model.transactions)
        }

        function findTransactionsByMusician() {
            model.rightPanel = 'transactions';
            transactionService.findTransactionsBySeller(model.user._id)
                .then(function (response) {
                    model.transactions = response.data;
                })
            console.log(model.transactions)
        }

        function accecptTransaction(transaction) {
            transaction.status = 'DONE';
            transactionService.updateTransaction(transaction._id, transaction)
                .then(function (response) {
                    songService.addSongOwner(transaction._song, transaction._buyer._id, transaction.price)
                        .then(function (response) {
                            $location.url("/home");
                        })
                })
        }

        function rejectTransaction(transaction) {
            transaction.status = 'REJECTED';
            transactionService.updateTransaction(transaction._id, transaction)
                .then(function (response) {
                    $location.url("/home");
                })
        }

        function cancelTransaction(transaction) {
            transaction.status = 'CANCELED';
            transactionService.updateTransaction(transaction._id, transaction)
                .then(function (response) {
                    $location.url("/home");
                })
        }

        function deleteTransaction(transaction) {
            transactionService.deleteTransaction(transaction._id)
                .then(function (response) {
                    $route.reload();
                })
        }

        function addSongToLocal(song) {
            var newSong = {
                "name": song.name,
                "artist": song.artists[0].name,
                "cover": song.album.cover,
                "thridPartyId": "" + song.id,
                "_owner": model.user._id,
                "url": "http://music.163.com/#/song?id=" + song.id
            };
            alert("successfully added to local database!")
            return songService.createSongFromApi(newSong)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllUsers() {
            userService.findAllUsers()
                .then(function (response) {
                    model.allUsers = response.data;
                })
        }

        function findAllSongs() {
            songService.findAllSongs()
                .then(function (response) {
                    model.allSongs = response.data;
                })
        }

        function findAllReviews() {
            reviewService.findAllReviews()
                .then(function (response) {
                    model.allReviews = response.data;
                })
        }

        function removeSongFromPlaylist(songId) {
            playlistService
                .removeSongFromPlaylist(model.currentPlaylistId, songId)
                .then(function (res) {
                    if (res.data !== "0") {
                        getAllSongsFromPlaylist(model.currentPlaylistId);
                    }

                })
        }

        function deletePlaylistForUser(playlistId) {
            userService
                .deletePlaylistForUser(user._id, playlistId)
                .then(function (status) {
                }, function (err) {
                });
            $route.reload();
        }

        function deleteSong(songId){
            userService
                .removeSong(user._id, songId)
                .then(function (res) {
                    if (res.data !== "0")
                        findSongsByMusician();
                })
        }

        function  reviewSong(reviewId) {
            reviewService
                .findReviewById(reviewId)
                .then(function (res) {
                    model.newreview = res.data;
                })
            model.rightPanel = 'edit-review';
        }
    }

})();