//var app = angular.module('SupDesk', ['ngRoute']);
app.config(function($routeProvider,$locationProvider) {
    $routeProvider.when('/tests', {
        templateUrl: 'Views/tests.html',
        controller: "AllTestsController",
        controllerAs: "testsCtrl"
    }).when('/tests/:id', {
        templateUrl: 'Views/SingleTest.html',
        controller: "SingleTestController",
        controllerAs: "sTestCtrl"
    }).when('/tests/:id/StartTest', {
        templateUrl: 'Views/startTest.html',
        controller: "StartTestController",
        controllerAs: "startTestCtrl"
    }) 
    .when('/tests/:id/result', {
        templateUrl: 'Views/result.html',
        controller: "ResultController",
        controllerAs: "resultCtrl"
    })
    .when('/users', {
        templateUrl: 'Views/AllUsers.html',
        controller: "AllUsersController",
        controllerAs: "usersCtrl"
    }).when('/users/:id', {
        templateUrl: 'Views/SingleUser.html',
        controller: "SingleUserController",
        controllerAs: "SingleUserCtrl"
    })
    .when('/login', {
        templateUrl: 'Views/Login.html',
        controller: "LoginController",
        controllerAs: "LoginCtrl"
    }).when('/signup', {
        templateUrl: 'Views/Signup.html',
        controller: "SignUpController",
        controllerAs: "SignUpCtrl"
    }).when('/forgot', {
        templateUrl: 'Views/Forgot.html',
        controller: "ForgotController",
        controllerAs: "ForgotCtrl"
    }).when('/reset/:token', {
        templateUrl: 'Views/Reset.html',
        controller: "ResetController",
        controllerAs: "ResetCtrl"
    }).
    when('/new', {
        templateUrl: 'Views/create.html',
        controller: "CreateTestController",
        controllerAs: "CreateCtrl"
    }).
    when('/:id/edit', {
        templateUrl: 'Views/edit.html',
        controller: "EditTestController",
        controllerAs: "EditCtrl"
    }).
    when('/dashboard', {
        templateUrl: 'Views/Dashboard.html',
        controller: "DashboardController",
        controllerAs: "DashboardCtrl"

    }).
    otherwise({
        redirectTo: '/dashboard'
    });

    // Add HTML5 History API support
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
});