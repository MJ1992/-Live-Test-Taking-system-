app.controller('LoginController', ['$http', 'AuthSVC', '$routeParams', '$window', '$location', function($http, AuthSVC, $routeParams, $window, $location) {
    var main = this;
    this.message = '';
    this.data = { email: '', password: '' };
    this.error = '';
    this.Login = function(data) {


        AuthSVC.login(data).then(function successCallback(response) {
            console.log(response.data);
            if (!response.data.error) {
                console.log(response.data.data.token);

                $window.localStorage.currentUser = angular.toJson({ email: main.data.email, token: response.data.data.token, isAdmin: response.data.data.isAdmin });

                console.log($window.localStorage);
                console.log(angular.fromJson($window.localStorage.currentUser));
                $location.path('/dashboard');
            }else {
                main.error = response.data.data.message;
            }

        }, function errorCallBack(response) {
            console.log(response);
            console.log(response.message);
            
        });
        
    };
    
}]);