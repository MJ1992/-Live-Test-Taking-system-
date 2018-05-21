app.controller('AllUsersController', ['$http', 'DataSVC', '$routeParams','$location','$window', function ($http, DataSVC, $routeParams,$location,$window) {
    var main = this;
    this.users = '';
    //Check if user is admin or not.If not then redirect to dashboard
    if (!angular.fromJson($window.localStorage.currentUser).isAdmin){
        
        $location.path('/dashboard');
}

    this.getAllUsers = function () {

        DataSVC.getAllUsers().then(function successCallback(response) {

            console.log(response.data);
            main.users = response.data.data;
            // M.toast({ html: response.data.message });
        }, function errorCallBack(response) {
            // M.toast({ html: response.data.message });
            console.log("Error");
        });


    };

    this.getAllUsers();

}]);