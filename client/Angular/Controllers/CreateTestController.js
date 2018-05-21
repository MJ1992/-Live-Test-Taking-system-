app.controller('CreateTestController', ['$http', 'DataSVC', '$routeParams', '$location','$window', function ($http, DataSVC, $routeParams, $location,$window) {
    var main = this;


    this.data = {
        name: '',
        details: '',
        duration: ''
    };
//Check if user is admin or not.If not then redirect to dashboard
    if (!angular.fromJson($window.localStorage.currentUser).isAdmin){
        
            $location.path('/dashboard');
    }

    this.createTest = function (data) {

        DataSVC.CreateTest(data).then(function successCallback(response) {

            
            $location.path('/tests');
        }, function errorCallBack(response) {
            
            console.log("Error");
        });


    };

}]);