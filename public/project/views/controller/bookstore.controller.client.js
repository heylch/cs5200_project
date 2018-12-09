(function () {
    angular
        .module("ITBook")
        .controller("bookstoreController", bookstoreController);

    function bookstoreController(bookService, booklistService,reviewService,bookService,userService, transactionService,$routeParams,$location, user) {
        var model = this;
        model.userId = user.id;
        model.findAllBookstore = findAllBookstore;
        model.logout = logout;
        model.user = user;


        function init() {
            findAllBookstore();
        }
        init();

        function findAllBookstore() {
            userService.findAllUsers()
                .then(function (response) {
                    model.bookstores = [];
                    for(i=0; i < response.data.length; i++){
                        if(response.data[i].type === 'BOOKSTORE'){
                            console.log(response.data[i]);
                            model.bookstores.push(response.data[i]);
                        }
                    }
                    return model.bookstores;
                })
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