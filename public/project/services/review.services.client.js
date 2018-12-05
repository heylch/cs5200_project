(function () {
    angular
        .module("Musiker")
        .service("reviewService", reviewService);


    function reviewService($http) {

        var api =  {
            "createReviewForSong": createReviewForSong,
            "createReviewForMusician": createReviewForMusician,
            "createReviewForPlaylist": createReviewForPlaylist,

            // "findReviewByPlaylistId": findReviewByPlaylistId,
            // "findReviewByMusicianId": findReviewByMusicianId,
            // "findReviewBySongId":findReviewByPlaylistId,
            "findAllReviewsByUser": findAllReviewsByUser,
            "findReviewById": findReviewById,
            "updateReview": updateReview,
            "deleteReview": deleteReview,
            "isReviewed": isReviewed,
            "findAllReviews": findAllReviews
        };

        return api;


        function findReviewById(reviewId) {
            var url = "/projectapi/search/review/" + reviewId;
            console.log(url);
            return $http.get(url);
        }

        function findAllReviewsByUser(userId) {
            var url = "/projectapi/user/" + userId + "/review";
            return $http.get(url);
        }

        function createReviewForSong(userId, songId, review) {
            var url = "/projectapi/user/" + userId + "/song/" + songId + "/review";
            return $http.post(url,review);
        }

        function createReviewForMusician(userId, musicianId, review) {
            var url = "/projectapi/user/" + userId + "/musician/" + musicianId + "/review";
            return $http.post(url,review);
        }

        function createReviewForPlaylist(userId, playlistId, review) {
            var url = "/projectapi/user/" + userId + "/playlist/" + playlistId + "/review";
            return $http.post(url,review);
        }

        function updateReview(reviewId,review){
            var url = "/projectapi/review/" + reviewId;
            return $http.put(url,review);
        }

        function deleteReview(reviewId){
            var url = "/projectapi/review/" + reviewId;
            return $http.delete(url);
        }

        function isReviewed(userId, songId){
            var url = "/projectapi/userreview/"+ userId + "/" + songId;
            return $http.get(url);
        }

        function findAllReviews(){
            var url = "/projectapi/reviews";
            return $http.get(url);
        }

    }

})();