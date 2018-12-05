(function () {
    angular
        .module("Musiker")
        .controller("adminEditUserController", adminEditUserController);

    function adminEditUserController($routeParams, $location, userService,user) {
        //declare controller
        var model = this;
        //variable from path
        model.adminId = user._id;
        model.userId = $routeParams["uid"];
        model.errorMessage = '1';
        //declare function
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.showPassword = showPassword;
        model.defaultMessage = defaultMessage;
        model.logout = logout;

        //initial function
        function init() {
            userService.findUserById(model.userId)
                .then(function (response) {
                    model.editUser = response.data;
                    console.log(model.editUser);
                });
        }
        init();

        //functions
        function updateUser(user,username, password,firstname,lastname){
            if (username === null || username === '' || typeof username === 'undefined'){
                model.errorMessage = "username is required";
                return;
            }
            else if (password === null || password === '' || typeof password === 'undefined'){
                model.errorMessage = "password is required";
                return;
            }
            else if (firstname === null || firstname === '' || typeof firstname === 'undefined'){
                model.errorMessage = "firstname is required";
                return;
            }
            else if (lastname === null || lastname === '' || typeof lastname === 'undefined'){
                model.errorMessage = "lastname is required";
                return;
            }
            else{
                model.errorMessage = '1';
                userService.updateUser(model.userId, user)
                    .then(function (response) {
                        alert("update scceuss");
                        return;
                    });
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

        function defaultMessage() {
            model.errorMessage = '1';
        }

        function unregister(){
            userService.deleteUser(model.userId);
            $location.url("/home");
        }

        function showPassword() {
            var pass=document.getElementById("pass");
            var passbtn = document.getElementById("passbtn");
            if(pass.type === "text"){
                pass.type = "password";
                passbtn.innerHTML = "Show Password";
            }else{
                pass.type = "text";
                passbtn.innerHTML = "Hide Password";
            }

        }


    }
})();