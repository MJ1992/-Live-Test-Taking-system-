app.controller('DashboardController', ['$http', 'DataSVC', '$routeParams', '$window','$location', function ($http, DataSVC, $routeParams, $window,$location) {
    var main = this;
    this.currentUser = '';
    this.userData = '';
    this.averageScore = '';
    this.averagePercentage = '';
    this.numberOfTestTaken = '';
    if(angular.fromJson($window.localStorage.currentUser)){
        this.currentUser = angular.fromJson($window.localStorage.currentUser).email;

    }else {
        this.currentUser = $location.search().email;
        $window.localStorage.currentUser = angular.toJson({ email: $location.search().email, token: $location.search().token,isAdmin: $location.search().admin });

    }
    if(angular.fromJson($window.localStorage.currentUser).isAdmin){
        $location.path('/users');
    }
    if(!angular.fromJson($window.localStorage.currentUser)){
        $location.path('/login');
    }

    this.currentUserDetails = function () {

        DataSVC.getCurrentUserDetails().then(function successCallback(response) {

            console.log(response.data);
            main.userData = response.data.data;
            main.numberOfTestTaken = main.userData.TestsTaken.length;
            var totalScored = 0;
            var totalScore = 0;

            main.userData.TestsTaken.forEach(function (test) {
                totalScore += test.totalPoints;
                totalScored += test.pointsScored;

            });
            if(main.numberOfTestTaken == 0){
                main.averageScore = 0;
            main.averagePercentage = 0;


            }else {
                main.averageScore = (totalScore / (main.numberOfTestTaken)).toFixed(2);
            main.averagePercentage = (totalScored * 100 / totalScore).toFixed(2);

            }
            


            //bar-chart
            var ctxB = document.getElementById("barChart").getContext('2d');
            var data = [];
            var labels = [];
            main.userData.TestsTaken.forEach(function (test) {
                data.push(test.percentage);
                labels.push(test.testId.name);
            });
            var myBarChart = new Chart(ctxB, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '% Percentage',
                        data: data,
                        backgroundColor: '#3F729B',
                        borderColor: '#3F729B',

                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });




        }, function errorCallBack(response) {

            console.log("Error");
        });


    };


    this.currentUserDetails();

}]);