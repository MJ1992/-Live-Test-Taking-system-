var LocalStrategy = require('passport-local'),
    GoogleStrategy = require('passport-google-oauth2'),
    User = require('../app/models/user'),
    config = require('./config'),
    bcrypt = require('bcrypt'),
    passportJWT = require('passport-jwt'),
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

module.exports = function(passport) {

    //Local strategy    
       passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },

      function(email, password, done) {          
          
          User.findOne({ email: email }, function(err, user) {
            console.log(user);
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Email not Registered.' });
          }
          bcrypt.compare(password,user.password, function(err,result){
            if (err) {
                return done(null, false, { message: 'Some error occured.' });
                
            } else {
                if (!result) {

                    return done(null, false, { message: 'Incorrect email or password.' });
                } else {
                    return done(null, user, {message: 'Logged In Successfully'});
                }
            }
        });    
        
    });

      }));

       

    //Google login strategy
    passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/cb',
    clientID: config.clientID,
    clientSecret: config.clientSecret
}, function(accessToken, refreshToken, profile, done) {
    //console.log(profile, done);
    User.findOne({ 'email': profile.email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, user);
        } else {
            var newUser = new User();
            newUser.email = profile.email;


            newUser.save(function(err) {
                if (err) {
                    throw err;
                } else {
                    return done(null, newUser);
                }
            });
        }
    });
}));

//Passport JWT

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : config.secretKey
},
function (jwtPayload, cb) {
    User.findById(jwtPayload.userId,function(err,user){
        if(err){
            return cb(err);
        }else {
            return cb(null, user);
        }
    });
}));


};