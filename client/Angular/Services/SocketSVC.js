app.service('SocketSVC', [function () {
    var baseUrl = "http://localhost:4000/";
    var socket = io.connect(baseUrl);



    this.on = function (eventName, callback) {
        socket.on(eventName, callback);

    };
    this.emit = function (eventName, data) {
        socket.emit(eventName, data);

    };
}]);