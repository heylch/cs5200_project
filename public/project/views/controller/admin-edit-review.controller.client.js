(function () {
    angular
        .module("Musiker")
        .controller("adminEditReviewController", adminEditReviewController);

    function adminEditReviewController($routeParams, $location, reviewService,user, userService) {
        var model = this;
        //variable from path
        model.adminId = user._id;
        model.reviewId = $routeParams["rid"];
        model.errorReviewMessage = '1';
        //declare function
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.defaultMessage = defaultMessage;
        model.logout = logout;

        //initial function
        function init() {
            reviewService
                .findReviewById(model.reviewId)
                .then(function (response) {
                    console.log(response);
                    model.review = response.data;
                    console.log(model.editReview);
                    model.editReview = {
                        "_critic": model.review._critic,
                        "_song": model.review._song,
                        "_playlist": model.review._playlist,
                        "_musician": model.review._musician,
                        "type": model.review.type,
                        "title": model.review.title,
                        "comment": model.review.comment,
                        "rating": model.review.rating,
                        "dateCreated": model.review.dateCreated
                    }
                });

        }
        init();

        //functions

        // function initReview() {
        //
        // }

        function defaultMessage() {
            model.errorReviewMessage = '1';
        }

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                    });
        }

        function updateReview(review, title, comment, rating){
            if (title === null || title === '' || typeof title === 'undefined'){
                model.errorReviewMessage = "title is required";
                return;
            }
            else if (comment === null || comment === '' || typeof comment === 'undefined'){
                model.errorReviewMessage = "review is required";
                return;
            }
            else if (rating === null || rating === '' || typeof rating === 'undefined'){
                model.errorReviewMessage = "rating required";
                return;
            }
            else{
                model.errorReviewMessage = '1';
                reviewService.updateReview(model.reviewId, review)
                    .then(function (response) {
                        alert("update scceuss");
                        $location.url("/home");
                        return;
                    });
            }

        }

        function deleteReview(){
            reviewService.deleteReview(model.reviewId)
                .then(function (response) {
                    alert("delete scceuss")
                    $location.url("/home");
                });
        }

    }
})();