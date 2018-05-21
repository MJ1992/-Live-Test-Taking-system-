app.controller('SignUpController', ['$http', 'AuthSVC', '$routeParams', '$window', '$location', function($http, AuthSVC, $routeParams, $window, $location) {
    var main = this;
    this.message = '';
    this.error = '';
    this.data = {  password: '', email: '', mobile: '', isAdmin: false };
    this.SignUp = function(data) {

        AuthSVC.SignUp(data).then(function successCallback(response) {
            console.log(response.data);
            if (!response.data.error) {

                console.log(response.data.data.token);
                $window.localStorage.currentUser = angular.toJson({ email: main.data.email, token: response.data.data.token, isAdmin: response.data.data.isAdmin });
                console.log($window.localStorage);
                $location.path('/dashboard');
            }else {
                main.error = response.data.message;
            }
            main.message = response.data.message;
            

        }, function errorCallBack(response) {
            console.log("Error");
        });
    };
}]);