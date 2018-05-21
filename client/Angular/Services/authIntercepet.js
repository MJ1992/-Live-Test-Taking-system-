app.factory('authInterceptor', function($window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if (angular.fromJson($window.localStorage.currentUser)) {
                config.headers.Authorization = 'Bearer ' + angular.fromJson($window.localStorage.currentUser).token;
            }
            return config;
        }
    };
});

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});