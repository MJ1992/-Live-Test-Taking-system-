app.service('SocketSVC', [function () {
    var baseUrl = "http://ec2-18-217-210-184.us-east-2.compute.amazonaws.com/";
    var socket = io.connect(baseUrl);



    this.on = function (eventName, callback) {
        socket.on(eventName, callback);

    };
    this.emit = function (eventName, data) {
        socket.emit(eventName, data);

    };
}]);