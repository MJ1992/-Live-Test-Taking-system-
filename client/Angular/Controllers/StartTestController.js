app.controller('StartTestController', ['$http', 'DataSVC', '$routeParams', '$location','SocketSVC','$window', function ($http, DataSVC, $routeParams, $location,SocketSVC,$window) {
    var main = this;
    this.currentUser = angular.fromJson($window.localStorage.currentUser).email;
    this.testID = $routeParams.id;
    this.test = '';
    this.duration = 0;
    this.startTime = '';
    this.endTime = 0;
    this.TimeUp = false;
    this.activeQuestion = 0;
    this.selectedOption = null;
    this.timeTaken = 0;
    this.Timer = {};
    //this.dateNow = new Date();
    

    this.startTest = function () {
        DataSVC.getSingleTest(main.testID).then(function successCallback(response) {

            console.log(response.data);
            main.test = response.data.data;
            main.duration = main.test.duration;

            main.startTime = new Date();
           main.endTime = Date.now() + main.duration*1000*60;

            var deadline = Date.now() + main.duration*1000*60;
            main.startTimer("clock", deadline);

        }, function errorCallBack(response) {
            // M.toast({ html: response.data.message });
            console.log("Error");
        });


    };

    this.setActiveQuestion = function(data){
        main.startTime = new Date();
        main.test.questions[main.activeQuestion].timeTaken = main.timeTaken.total;
        main.activeQuestion =data;

        //console.log(main.activeQuestion);
    };
    this.nextQuestion = function(){
        main.startTime = new Date();
        main.test.questions[main.activeQuestion].timeTaken = main.timeTaken.total;
        console.log(main.timeTaken.total);
        if( main.activeQuestion < main.test.questions.length - 1){
            main.activeQuestion++;

        }else {
            main.activeQuestion = 0;
        }

        console.log(main.test.questions[main.activeQuestion]);

    };
    this.selectOption = function(data){
        main.test.questions[main.activeQuestion].selectedOption = data;
        //console.log(main.test.questions[main.activeQuestion]);
    };
    this.submitTest =function(){
        main.TimeUp =true;
        main.test.questions[main.activeQuestion].timeTaken = main.timeTaken.total;
        var resultData = {
            testId: main.testID,
            questionsWithAnswers: main.test.questions,
            correct: 0 ,
            incorrect: 0,
            unanswered: 0,
            percentage: 0,
            pointsScored: 0,
            totalPoints: 0

        };
        //=====//
        main.test.questions.forEach(function (ques) {
                resultData.totalPoints = resultData.totalPoints + ques.points;
            if (ques.selectedOption == null) {
                    resultData.unanswered++;

            } else {
                if (ques.selectedOption === ques.answer) {
                    resultData.correct++;
                    resultData.pointsScored += ques.points;
             } else {
                resultData.incorrect++;
                resultData.pointsScored -= 0.25*ques.points;
                }
            }
        });
        resultData.percentage = (resultData.pointsScored/resultData.totalPoints)*100;
        console.log(resultData);



        SocketSVC.emit('TestData',{result:resultData,currentUser: main.currentUser});
       
        SocketSVC.on('result',function(data){
           $window.location.assign('#!/tests/'+ data._id + '/result');
            $('.modal-backdrop').remove();
        });


    };

    //Timer functions
     this.updateTimer =function (deadline){
        var time = deadline - new Date();
        return {
          'days': Math.floor( time/(1000*60*60*24) ),
          'hours': Math.floor( (time/(1000*60*60)) % 24 ),
          'minutes': Math.floor( (time/1000/60) % 60 ),
          'seconds': Math.floor( (time/1000) % 60 ),
          'total' : time
        };
      };
       function timeTaken (){
          var time;
          if(main.test.questions[main.activeQuestion].timeTaken){

             time =  new Date() - new Date(main.startTime- main.test.questions[main.activeQuestion].timeTaken) ;
             console.log(time, new Date());
          }else{
             time =  new Date()- main.startTime ;
          }

        return {
          'days': Math.floor( time/(1000*60*60*24) ),
          'hours': Math.floor( (time/(1000*60*60)) % 24 ),
          'minutes': Math.floor( (time/1000/60) % 60 ),
          'seconds': Math.floor( (time/1000) % 60 ),
          'total' : time
        };
      }

      this.startTimer =function (id, deadline){
        var TimerInterval = setInterval(function(){
          var clock = document.getElementById(id);
          main.Timer = main.updateTimer(deadline);
          main.timeTaken = timeTaken();

          if(main.Timer.total < 1  ){
              console.log('Time up');
            clearInterval(TimerInterval);
            main.Timer = 'Time is up';
            main.submitTest();
            }else if( main.TimeUp==true) {
                clearInterval(TimerInterval);
            }


        }, 1000);
      };

this.startTest();
}]);