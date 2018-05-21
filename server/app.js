var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    http = require('http').Server(app),
    fs = require('fs'),
    io = require('socket.io')(http),
    cors = require('cors'),
    config = require('./libs/config'),
    passport = require('passport');

    app.use(bodyParser.urlencoded({
        limit: '10mb',
        extended: true
    }));


    app.use(bodyParser.json({
    limit: '10mb',
    extended: true
}));


//logging 
app.use(logger('dev'));


//database conffiguration

var dbPath = "mongodb://localhost/PMCAT";

//connect to database
db = mongoose.connect(dbPath);
mongoose.connection.once('open', function() {
    console.log("database Connection success");
});
app.use(cors());

//Passport Configurations

app.use(passport.initialize());
require('./libs/passport')(passport);


//reading model files and requiering them using file system 
fs.readdirSync('./app/models').forEach(function(file) {
    if (file.indexOf('.js')) {
        require('./app/models/' + file);
    }
});



//reading controller files and requiering them using file system 
fs.readdirSync('./app/controllers').forEach(function(file) {
    if (file.indexOf('.js')) {
        var route = require('./app/controllers/' + file);
        route.controller(app);
    }
});

//===========//
//Socket.io
//===========//
require('./libs/sockets').sockets(http);


//Port setup 
http.listen(4000, function() {
    console.log('App running at port 4000');
});