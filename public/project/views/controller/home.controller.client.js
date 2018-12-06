(function () {
    angular
        .module("ITBook")
        .controller("homeController", homeController);


    function homeController(bookService,user,$location,userService, $route, reviewService,searchService, booklistService,transactionService) {
        var model = this;
        model.rightPanel = 'readers';
        model.user = user;
        model.currentBooklistId = "";
        model.errorMessage = '1';
        model.logout = logout;
        model.findMusicians = findMusicians;
        model.findCritics = findCritics;
        model.changeRightPanel = changeRightPanel;
        model.createBooklistForUser = createBooklistForUser;
        model.searchTrack = searchTrack;
        model.showDetails = showDetails;
        model.getAllBooksFromBooklist = getAllBooksFromBooklist;
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
        model.findAllBooks = findAllBooks;
        model.findAllReviews = findAllReviews;
        model.addSongToLocal = addSongToLocal;
        model.deleteBooklistForUser = deleteBooklistForUser;
        model.removeBookFromBooklist = removeBookFromBooklist;
        model.deleteBook = deleteBook;
        model.reviewBook = reviewBook;
        model.deleteTransaction = deleteTransaction;
        model.findCritics = findCritics;
        model.defaultMessage = defaultMessage;
        function init() {
            console.log(model.user);
            // if (model.user.type === 'MUSICIAN') {
            //     model.rightPanel = 'my-songs';
            //     findSongsByMusician();
            //     findCritics();
            // }
            // if (model.user.type === 'PUBLISHER') {
            //     model.rightPanel = 'transactions';
            //     findTransactionsByPublisher();
            // }
            // findMusicians();
            // findCritics();
            findBooklists();
            // if (model.user.type === 'CRITIC') {
            //     model.rightPanel = 'my-reviews';
            //     findMusicians();
            //     findBooklists()
            //     findReviewsByCritic();
            // }
            //
            // if (model.user.type === 'ADMIN') {
            //     findCritics();
            //     findAllUsers();
            //     findAllSongs();
            //     findAllReviews();
            // }
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

        function findBooklists() {
            booklistService.findAllBooklistsByUser(user._id)
                .then(function (response) {
                    console.log("find booklists");
                    console.log(response);
                    model.booklists = response.data;
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

        function showDetails(book) {
            model.book = book;
        }

        function createBooklistForUser(booklist, name ,description) {
            console.log(booklist);
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
                booklistService.createBooklistForUser(model.user._id, booklist)
                .then(function (response) {
                    var newBooklistId = response.data._id;
                    console.log("gagaga");
                    console.log(response);
                    userService.addBooklistToUser(model.user._id, newBooklistId)
                        .then(function (res) {
                            console.log(res);
                            console.log("hahahah");
                            init();
                        });
                })
            }

            $route.reload();

        }

        function getAllBooksFromBooklist(booklistId) {
            model.currentBooklistId = bookId;
            booklistService.getAllBooksFromBooklist(booklistId)
                .then(function (response) {
                    model.books = response.data;
                    model.rightPanel = "booklist";
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

        function findAllBooks() {
            bookService.findAllBooks()
                .then(function (response) {
                    model.allBooks = response.data;
                })
        }

        function findAllReviews() {
            reviewService.findAllReviews()
                .then(function (response) {
                    model.allReviews = response.data;
                })
        }

        function removeBookFromBooklist(bookId) {
            booklistService
                .removeBookFromBooklist(model.currentBooklistId, bookId)
                .then(function (res) {
                    if (res.data !== "0") {
                        getAllBooksFromBooklist(model.currentBooklistId);
                    }

                })
        }

        function deleteBooklistForUser(booklistId) {
            userService
                .deleteBooklistForUser(user.id, playlistId)
                .then(function (status) {
                }, function (err) {
                });
            $route.reload();
        }

        function deleteBook(bookId){
            userService
                .removeBook(user.id, bookId)
                .then(function (res) {
                    if (res.data !== "0")
                        findSongsByMusician();
                })
        }

        function  reviewBook(reviewId) {
            reviewService
                .findReviewById(reviewId)
                .then(function (res) {
                    model.newreview = res.data;
                })
            model.rightPanel = 'edit-review';
        }
    }

})();