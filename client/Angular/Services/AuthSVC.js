app.service('AuthSVC', ['$http', function ($http) {
    var baseUrl = "http://localhost:4000/";
    this.login = function (data) {
        return $http({
            method: "POST",
            url: baseUrl + "login",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data

        });
    };

    this.SignUp = function (data) {
        return $http({
            method: "POST",
            url: baseUrl + "register",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data

        });
    };
    this.logOut = function () {
        return $http({
            method: "GET",
            url: baseUrl + "logout",
            headers: {
                'Content-Type': 'application/json'
            },


        });
    };

    this.forgot = function (data) {
        return $http({
            method: "POST",
            url: baseUrl + "forgot",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data


        });
    };
    this.resetTokenValid = function (token) {
        return $http({
            method: "GET",
            url: baseUrl + "reset/" + token,
            headers: {
                'Content-Type': 'application/json'
            }


        });
    };
    this.resetPassword = function (token, data) {
        return $http({
            method: "POST",
            url: baseUrl + "reset/" + token,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data


        });
    };


}]);