var express = require('express');
var router = express.Router();
var Test = require('../models/test');
var User = require('../models/user');
var Question = require('../models/question');
var resGenerator = require("../../libs/responseGenerator");
//var verifyToken = require('../../middlewares/verifyToken');
var verifyUser = require('../../middlewares/verifyUser');
var passport = require('passport');


module.exports.controller = function (app) {

    //get all Users
    router.get('/',passport.authenticate('jwt',{session:false}), function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "All users", 200, users));
            }
        });
    });

    //get particular User
    router.get('/:id',passport.authenticate('jwt',{session:false}), function (req, res) {
        User.findById(req.params.id).populate( {path : 'TestsTaken', populate : {path : 'testId'}}).exec(function (err, user) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "Requested User", 200, user));
                //console.log(test);
            }
        });

    });

    
    

    app.use('/users', router);
};