# Live-Test-Taking-System

Deployed at url - http://ec2-18-191-78-6.us-east-2.compute.amazonaws.com/ 

## Project Name - Live test taking system   
 
   A Multiple choice test taking system in which tests are tracked live and analytics are generated based on that.  
 
### Project Description
   This project should be a ready to deploy test taking system. It must have all the features mentioned below and it must be deployed  
   on a server before submission. It must be a single page application.  
 
#### Frontend Technologies allowed
   Angular for dynamism and SPA and any technologies/framework allowed for frontend design.  
 
#### Backend Technologies allowed
   NodeJs, ExpressJS, MongoDB, SocketIO, WebSockets.  
 
 
#### Features of the platform -  
 
1. User management system 
2. User Test management system 
3. User Test taking system
4. Test listing admin
5. User analytics in admin panel 
 
- **User Management System**
  1. User should be able to sign up using email, gmail.
  2. User should be able to login to the system through email and password combination or using Gmail
  3. Forgot password functionality should be there to reset password.  
 
- **User Testing management system**
  1. Once the user logs into the system, he should see a dashboard containing the statistics of all tests he has taken. The statistics  
    may include the number of tests taken, average score and percentage growth etc.
  2. Dashboard should also contain the lists of tests the user has taken and every item in this list should be clickable.  
    On clicking this item, a Test Result view should open which contains the details of test result.
  3. There should be a “take a test” option in menu from which user can go to test taking page.
  4. On test taking page, user should see a list of tests he can appear for along with a button to start that test.  
 
- **User test taking system**
  1. Once user starts the test, he should first see an instructions screen containing. It may also contain the rules of the test.
  2. Once the user reads the instructions and accepts the rules (single accept button), The test timer will start and the screen  
     should display the test questions and options associated with it.
  3. User should be able to choose only one option as answer for every question.
  4. The test should have a time limit. The test window must automatically close once the timeout occurs irrespective of how  
     many questions have been answered. The system should submit the answers automatically.
  5. If the user completes the test before the time ends, he should see a submit window which will submit his all answers.  
     In case of timeouts, this window must appear automatically.
  6. The system must keep a track of how much time a user is taking for answering each question. Your models should be designed accordingly.  

- **Test listing Admin**
  1. Admin should be able to create tests in the system
  2. Each test should have a set of questions, each question containing at least 4 options and overall time limit of the test.  
  3. Admin should be able to create, edit, delete and view any tests, question or option.
  4. While creating options for any question, admin should be able to set a correct answer. 
     This answer (flag) will actually help in automating the test evaluation process.  
 
- **User analytics in admin**
  1. Admin should be able to view details of users registered in the system 
  2. Admin should be able to view overall performance of the user in all his tests.  
 
 
 ## Solution
 Deployed at url - http://ec2-18-191-78-6.us-east-2.compute.amazonaws.com/ 
 
 
## Project Description:

#### Project Folder has 2 sub folder 
1. Client
2. Server

Client folder contains the frontend part of the application(AngularJS ,HTML,CSS)and Server folder contains the back-end(NodeJS,Express, MongoDB

* FrontEnd Framework used : AngularJS,MaterializeCSS
* RealTime Communication: SocketIO
* BackEnd : ExpressJS
* DB : MongoDB

 
