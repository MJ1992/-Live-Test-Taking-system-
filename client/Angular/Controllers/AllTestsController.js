app.controller('AllTestsController', ['$http', 'DataSVC', '$routeParams','$window','$location','SocketSVC', function ($http, DataSVC, $routeParams,$window,$location,SocketSVC) {
    var main = this;
    this.tests = '';
    this.testId = '';
    this.isAdminUser = angular.fromJson($window.localStorage.currentUser).isAdmin;

    this.getId = function(data){
        main.testId = data;
    };


    this.startTest = function(){
        window.open('/tests/'+main.testId+'/StartTest', '_blank', "width="+screen.availWidth+",height="+screen.availHeight);
        $location.path('/tests');
    };



    this.getAllTests = function () {

        DataSVC.getAllTests().then(function successCallback(response) {

            console.log(response.data);
            main.tests = response.data.data;
            // M.toast({ html: response.data.message });
        }, function errorCallBack(response) {
            // M.toast({ html: response.data.message });
            console.log("Error");
        });


    };

    this.getAllTests();


    SocketSVC.on('result',function(data){
              
       $location.path('/tests/'+ data._id + '/result');
        $window.location.assign('/tests/'+ data._id + '/result');
    });

}]);