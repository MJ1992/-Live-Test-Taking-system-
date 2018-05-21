app.controller('ResultController', ['$scope', '$http', 'DataSVC', '$routeParams', '$location', 'SocketSVC', function ($scope, $http, DataSVC, $routeParams, $location, SocketSVC) {
var main = $scope;
$scope.testId = $routeParams.id;
$scope.userDetails = '';
$scope.testResultData = '';
$scope.correct = 0;
$scope.incorrect = 0;
$scope.unanswered = 0;
$scope.percentage = 0;
$scope.pointsScored = 0;
$scope.totalPoints = 0;

$scope.getResult = function() {
    DataSVC.getCurrentUserDetails().then(function successCallback(response) {
        $scope.userDetails = response.data.data;
        console.log($scope.userDetails);
        console.log($scope.testId);
        var testResultData = $scope.userDetails.TestsTaken.filter(function(test) {
           // console.log(test._id);
            return (test._id === $scope.testId);
            
                           
        });
        
        $scope.testResultData = testResultData[0];
        $scope.unanswered = $scope.testResultData.unanswered;
        $scope.correct= $scope.testResultData.correct;
        $scope.incorrect=  $scope.testResultData.incorrect;
        $scope.percentage=  $scope.testResultData.percentage;
        $scope.pointsScored=  $scope.testResultData.pointsScored;
        $scope.totalPoints=  $scope.testResultData.totalPoints;
               
        $scope.testResultData.questionsWithAnswers.forEach(function(qA) {
            if(qA.timeTaken == undefined){
                qA.timeTaken = '00:00';
            }else{
            var minutes = Math.floor(qA.timeTaken / 60000);
            var seconds = ((qA.timeTaken % 60000) / 1000).toFixed(0);
            qA.timeTaken = (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        }
        });

//pie
var ctxP = document.getElementById("pieChart").getContext('2d');
var myPieChart = new Chart(ctxP, {
    type: 'pie',
    data: {
        labels: ["Incorrect", "Correct",  "Not Answered"],
        datasets: [
            {
                data: [$scope.incorrect, $scope.correct,$scope.unanswered],
                backgroundColor: ["#F7464A", "#46BFBD",  "#949FB1", ],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1",  "#A8B3C5"]
            }
        ]
    },
    options: {
        responsive: true
    }    
});
            


    },function errorCallBack(response) {
        console.log("Error");
    });
};

    

// SocketSVC.on('result', function (data) {

//     $scope.$apply(function () {
//         $scope.testResultData = data;
//         $scope.unanswered = data.unanswered;
//         $scope.correct= data.correct;
//         $scope.incorrect=  data.incorrect;
//         $scope.percentage=  data.percentage;
//         $scope.pointsScored=  data.pointsScored;
//         $scope.totalPoints=  data.totalPoints;
               
//     });

    

// });

$scope.getResult();

}]);