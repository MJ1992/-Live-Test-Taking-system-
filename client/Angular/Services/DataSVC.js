app.service('DataSVC', ['$http', function ($http) {
    var baseUrl = "http://localhost:4000/";

    this.getAllTests = function () {
            return $http({
                method: "GET",
                url: baseUrl + "tests",
                headers: {
                    'Content-Type': 'application/json'
                }


            });
        };
        this.getMyTests = function () {
            return $http({
                method: "GET",
                url: baseUrl + "tests/user/myTests",
                headers: {
                    'Content-Type': 'application/json'
                }


            });
        };
        this.getSingleTest = function (testID) {
            return $http({
                method: "GET",
                url: baseUrl + "tests/" + testID,
                headers: {
                    'Content-Type': 'application/json'
                }


            });
        };
        this.CreateTest = function (data) {
            return $http({
                method: "POST",
                url: baseUrl + "tests",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data

            });
        };
        this.UpdateTest = function (testID, data) {
            return $http({
                method: "PUT",
                url: baseUrl + "tests/" + testID,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data

            });
        };
        this.DeleteTest = function (testID) {
            return $http({
                method: "DELETE",
                url: baseUrl + "tests/" + testID,
                headers: {
                    'Content-Type': 'application/json'
                },


            });
        };
        this.addQuestion = function (id, data) {
            return $http({
                method: 'POST',
                url: baseUrl + "tests/" + id + '/addQues',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            });
        };
        this.deleteQuestion = function (testID,data) {
            return $http({
                method: 'DELETE',
                url: baseUrl + "tests/"+ testID+"/Question/" + data,
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        };
        this.editQuestion = function (data) {
            return $http({
                method: 'GET',
                url: baseUrl + "tests/Question/" + data + '/edit',
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        };


        this.updateQuestion = function (id, data) {
            return $http({
                method: 'PUT',
                url: baseUrl + "tests/Question/" + id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            });

        };
        this.getAllUsers = function(){
            return $http({
                method: 'GET',
                url: baseUrl + 'users',
                headers: {
                    'Content-type': 'application/json'
                }
            });
        };
        this.getParticularUser = function(userID){
            return $http({
                method: 'GET',
                url: baseUrl + 'users/'+ userID,
                headers: {
                    'Content-type': 'application/json'
                }
            });
        };
        this.getCurrentUserDetails = function(){
            return $http({
                method: 'GET',
                url: baseUrl + 'dashboard',
                headers: {
                    'Content-type': 'application/json'
                }
            });
        };
        
}]);