//var socketio = require('socket.io');
var mongoose = require('mongoose');
var Test = require('../app/models/test');
var User = require('../app/models/user');
var Question = require('../app/models/question');
var Result = require('../app/models/result');
var socketioJwt = require('socketio-jwt');
var config = require('./config');
var emailNotify = require('./sendEmailNotification');


//Event emitter setup
var events = require("events");
var eventsEmitter = new events.EventEmitter();
eventsEmitter.setMaxListeners(0);

module.exports.sockets = function(http) {

    var io = require('socket.io')(http);



    io.on('connection', function(socket) {
        console.log('Connection started');
        eventsEmitter.removeAllListeners();
        socket.on('TestData',function(data){
            console.log(2);
            console.log(eventsEmitter.listenerCount()); 
            //eventsEmitter.removeAllListeners(); 
            eventsEmitter.emit('TestData',data);
            console.log(eventsEmitter.listenerCount()); 
        });

        eventsEmitter.on('TestData',function(data){
            console.log(1);
            Result.create(data.result,function(err,result){
                if(err){
                    console.log(err);
                }else {
                    User.findOne({email: data.currentUser},function(err,user){
                        if(err){
                            console.log(err);
                        }else {
                            user.TestsTaken.push(result);
                            user.save();
                            console.log(user);
                        }
                    });
                    socket.emit('result',result);
                    //console.log(result);
                }
            });

        });
    });
    return io;
};