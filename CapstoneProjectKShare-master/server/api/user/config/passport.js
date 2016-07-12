/**
 * Created by GiangDH on 5/18/16.
 */
var LocalStrategy   = require('passport-local').Strategy;
var User = require('mongoose').model('User');


module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });


  passport.deserializeUser(
    function(id, done){
      User.findById(id, function(err, user){
        if(err){
          done(err);
        }
        done(null, user);
      });
    });

  // Local Sign In
  passport.use('local-login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback: true
  },
    function(req, username, password, done){
      User.findOne({ 'username' : username }, {}, function (err, user,info){
         if(err){
           return done(err);
         }
         if(!user){
           return done(null, false, { invalidUsername: 'Incorrect username.' });
         }
         if(!user.authenticate(password)) {
           return done(null, false, {invalidPassword: 'Incorrect password.'});
         }
          req.session.user = user;
         return done(null,user);
      })
    }
  ))

}
