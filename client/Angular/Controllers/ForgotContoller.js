app.controller('ForgotController', ['$http', 'AuthSVC', '$routeParams', '$window', '$location', function($http, AuthSVC, $routeParams, $window, $location) {
    var main = this;
    this.message = ''
    this.data = { email: '' };
    this.forgot = function(data) {


        AuthSVC.forgot(data).then(function successCallback(response) {
            console.log(response.data);

            main.message = response.data.message;
            M.toast({ html: response.data.message });



        }, function errorCallBack(response) {
            console.log("Error");
        });
    };
}]);