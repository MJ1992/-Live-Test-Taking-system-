var express = require('express');
var router = express.Router();
var Test = require('../models/test');
var User = require('../models/user');
var Question = require('../models/question');
var resGenerator = require("../../libs/responseGenerator");
var verifyUser = require('../../middlewares/verifyUser');
var passport = require('passport');


module.exports.controller = function (app) {

    //get all Test
    router.get('/',passport.authenticate('jwt',{session:false}), function (req, res) {
        Test.find({}, function (err, tests) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "All Tests", 200, tests));
            }
        });
    });

    //get particular Test
    router.get('/:id',passport.authenticate('jwt',{session:false}), function (req, res) {
        Test.findById(req.params.id).populate('questions').exec(function (err, test) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "Requested Test", 200, test));
                //console.log(test);
            }
        });

    });
   

   

    //create  a Test

    router.post('/',passport.authenticate('jwt',{session:false}),verifyUser, function (req, res) {
        Test.create(req.body, function (err, test) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                
                res.send(resGenerator.generate(false, "Test Created", 200, test));
            }
        });
    });

    //edit a Test
    router.get('/:id/edit', passport.authenticate('jwt', {
        session: false
    }),verifyUser, function (req, res) {
        Test.findById(req.params.id, function (err, test) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "Test to Update", 200, test));
            }
        });
    });

    router.put('/:id',passport.authenticate('jwt',{session:false}), verifyUser,function (req, res) {
        
        Test.findByIdAndUpdate(req.params.id, req.body, function (err, test) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "Test Updated", 200, test));
            }
        });
    });

    //delete a Test
    router.delete('/:id',passport.authenticate('jwt',{session:false}),verifyUser, function (req, res) {
        Test.findByIdAndRemove(req.params.id, function (err, test) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "Test Deleted", 200, test));
            }
        });
    });

    //add question to test

    router.post('/:id/addQues',passport.authenticate('jwt',{session:false}),verifyUser, function (req, res) {
        Question.create(req.body, function (err, ques) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                Test.findById(req.params.id, function (err, test) {
                    if (err) {
                        res.send(resGenerator.generate(true, "An Error occured", 403, err));

                    } else {
                        test.questions.push(ques);
                        test.save();
                        res.send(resGenerator.generate(false, "Question Added", 200, test));
                    }
                });
            }

        });
    });

    //Edit Question
    router.get('/Question/:id/edit',passport.authenticate('jwt',{session:false}),verifyUser, function (req, res) {
        Question.findById(req.params.id, function (err, question) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "Question to Update", 200, question));
            }
        });
    });

    router.put('/Question/:id', passport.authenticate('jwt',{session:false}),verifyUser,function (req, res) {

        Question.findByIdAndUpdate(req.params.id, req.body, function (err, question) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                res.send(resGenerator.generate(false, "Question Updated", 200, question));

            }
        });
    });

    //Delete Question
    router.delete('/:testId/Question/:id',passport.authenticate('jwt',{session:false}),verifyUser, function (req, res) {
        Question.findByIdAndRemove(req.params.id, function (err, question) {
            if (err) {
                res.send(resGenerator.generate(true, "An Error occured", 403, err));
            } else {
                Test.findById(req.params.testId,function(err,test){
                    if(err){
                        res.send(resGenerator.generate(true, "An Error occured", 403, err));
                    }else {
                        test.questions.splice(test.questions.indexOf(question._id),1);
                        test.save();
                        res.send(resGenerator.generate(false, "Question Deleted", 200, question));
                    }
                    

                });
            }
        });
    });

    app.use('/tests', router);
};