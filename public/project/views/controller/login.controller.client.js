(function () {
    angular
        .module("Musiker")
        .controller("loginController", loginController);

    function loginController($location, $rootScope, userService) {
        var model = this;
        model.flag = false;
        model.errorRegisterMessage = '1';
        model.errorMessage = '1';
        model.login = login;
        model.toggle = toggle;
        model.register = register;
        model.defaultRegisterMessage = defaultRegisterMessage;
        model.defaultMessage = defaultMessage;
        function init() {
        }
        init();

        function login(user) {
            userService.findUserByCredentials(user.username, user.password)
                .then(function(response){
                    var userDoc = response.data;
                    if (!userDoc|| userDoc === false) {
                        model.errorMessage = "wrong username or password";
                    } else {
                        $rootScope.currentUser = userDoc;
                        $location.url("/home");
                    }
                }, function() {
                    model.errorMessage = "wrong username or password";
                });

        }

        function toggle() {
            if(model.flag == true) {
                model.flag = false;
            } else {
                model.flag = true;
            }
        }

        function defaultRegisterMessage() {
            model.errorRegisterMessage = '1';
        }

        function defaultMessage() {
            model.errorMessage = '1';
        }

        function register(user, username) {
            if (username === null || username === '' || typeof username === 'undefined'){
                model.errorRegisterMessage = "username is required";
                return;
            }
            else if (user.password === null || user.password === '' || typeof user.password === 'undefined'){
                model.errorRegisterMessage = "password is required";
                return;
            }
            else if (user.password === user.secondPassword && user.type != null) {
                userService.findUserByUsername(user.username)
                    .then(function (response) {
                        if (!response.data || response.data === "0") {
                            return userService.createUser(user);
                        } else {
                            model.errorRegisterMessage = "username already exist";
                        }
                    })
                    .then(function(response){
                        console.log(response.data);
                        if(response && response !== "exist") {
                            login(user);
                        }
                        else if(response !== "exist"){
                            model.errorRegisterMessage = response;//"something goes wrong";
                        }
                    });
            } else if(user.password !== user.secondPassword) {
                model.errorRegisterMessage = "password do not match";
                return;
            } else {
                model.errorRegisterMessage = "Please select your role";
            }
        }

    }
})();