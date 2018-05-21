app.controller('SingleTestController', ['$http', 'DataSVC', '$routeParams', "$location",'$window', function ($http, DataSVC, $routeParams, $location,$window) {
    var main = this;
    this.testID = $routeParams.id;
    this.test = '';
    if (!angular.fromJson($window.localStorage.currentUser).isAdmin){
        
        $location.path('/dashboard');
}
    this.testData = {
        name: '',
        details: '',
        duration: ''
    };
    this.quesData = {
        quesStatement: '',
        options: {
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: ''
        },
        points: '',
        answer: ''
    };
    this.quesID = '';

    this.getTest = function () {

        DataSVC.getSingleTest(main.testID).then(function successCallback(response) {

            console.log(response.data);
            main.test = response.data.data;
            main.testData.name = response.data.data.name;
            main.testData.details = response.data.data.details;
            main.testData.duration = response.data.data.duration;
            // M.toast({ html: response.data.message });
        }, function errorCallBack(response) {
            // M.toast({ html: response.data.message });
            console.log("Error");
        });


    };

    this.addQuestion = function (data) {
            DataSVC.addQuestion(main.testID, data).then(function successCallback(response) {
                console.log(response.data);
                main.getTest();
                main.quesData = {
                    quesStatement: '',
                    options: {
                        optionA: '',
                        optionB: '',
                        optionC: '',
                        optionD: ''
                    },
                    points: '',
                    answer: ''
                };
            }, function errorCallBack(response) {
                console.log(response);
            });

        };
        this.editQuestion = function (data) {
            main.quesID = data;
            DataSVC.editQuestion(data).then(function successCallback(response) {
                console.log(response.data);

                main.quesData = {
                    quesStatement: response.data.data.quesStatement,
                    options: {
                        optionA: response.data.data.options.optionA,
                        optionB: response.data.data.options.optionB,
                        optionC: response.data.data.options.optionC,
                        optionD: response.data.data.options.optionD
                    },
                    points: response.data.data.points,
                    answer: response.data.data.answer
                };
            }, function errorCallBack(response) {
                console.log(response);
            });

        };
        this.updateQuestion = function (data) {
            DataSVC.updateQuestion(main.quesID, data).then(function successCallback(response) {
                console.log(response.data);
                main.getTest();
            }, function errorCallBack(response) {
                console.log(response);
            });
        };

        this.deleteQuestion = function (data) {
            DataSVC.deleteQuestion(main.testID,data).then(function successCallback(response) {
                console.log(response.data);
                main.getTest();

            }, function errorCallBack(response) {
                console.log(response);
            });

        };
        this.deleteTest = function () {
            DataSVC.DeleteTest(main.testID).then(function successCallback(response) {
                console.log(response.data);
                $location.path('/tests');


            }, function errorCallBack(response) {
                console.log(response);
            });
        };
        this.UpdateTest = function (data) {
            DataSVC.UpdateTest(main.testID, data).then(function successCallback(response) {
                console.log(response.data);
                main.getTest();
                $location.path('/tests/' + main.testID);


            }, function errorCallBack(response) {
                console.log(response);
            });
        };


    this.getTest();

}]);