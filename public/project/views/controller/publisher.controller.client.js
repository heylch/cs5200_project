(function () {
    angular
        .module("ITBook")
        .controller("publisherController", publisherController);

    function publisherController(bookService, booklistService,reviewService,bookService,userService, transactionService,$routeParams,$location, user) {
        var model = this;
        model.userId = user.id;
        model.findAllPublishers = findAllPublishers;


        function init() {
            findAllPublishers();
        }
        init();

        function findAllPublishers() {
            userService.findAllUsers()
                .then(function (response) {
                    model.publishers = [];
                    for(i=0; i < response.data.length; i++){
                        if(response.data[i].type === 'PUBLISHER'){
                            console.log(response.data[i]);
                            model.publishers.push(response.data[i]);
                        }
                    }
                    return model.publishers;
                })
        }
    }
})();