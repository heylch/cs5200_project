(function () {
    angular
        .module("ITBook")
        .service("reviewService", reviewService);


    function reviewService($http) {

        var api =  {
            "createReviewForBook": createReviewForBook,
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

        function createReviewForBook(userId, bookId, review) {
            var url = "/projectapi/user/" + userId + "/book/" + bookId + "/review";
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

        function isReviewed(userId, bookId){
            var url = "/projectapi/userreview/"+ userId + "/" + bookId;
            return $http.get(url);
        }

        function findAllReviews(){
            var url = "/projectapi/reviews";
            return $http.get(url);
        }

    }

})();