app.controller('ResetController', ['$http', 'AuthSVC', '$routeParams', '$window', '$location', '$timeout', function($http, AuthSVC, $routeParams, $window, $location, $timeout) {
    var main = this;
    this.message = '';
    this.resetToken = $routeParams.token;
    this.data = { password: '', confirm: '' };
    this.resetTokenCheck = function(data) {


            AuthSVC.resetTokenValid(data).then(function successCallback(response) {
                console.log(response.data);
                if (response.data.error) {
                    main.message = response.data.message;
                    M.toast({ html: response.data.message });
                    $timeout(function() {
                        $location.path('/login');
                    }, 3000);


                }



            }, function errorCallBack(response) {
                console.log("Error");
            });
        },
        this.resetPassword = function(token, data) {


            AuthSVC.resetPassword(token, data).then(function successCallback(response) {
                console.log(response.data);
                if (response.data.error) {
                    main.message = response.data.message;
                    M.toast({ html: response.data.message });
                    $timeout(function() {
                        $location.path('/login');
                    }, 3000);


                } else {
                    M.toast({ html: response.data.message });
                    $timeout(function() {
                        $location.path('/login');
                    }, 1000);

                }



            }, function errorCallBack(response) {
                console.log("Error");
            });
        };
    this.resetTokenCheck(this.resetToken);
}]);