"use strict";

const userController = require('./user-controller');
const passport = require('passport');
const userPolicies = require('./config/policies');



module.exports = class userRoutes {
  static init(router) {
    router
      .route('/api/user')
      .get(userPolicies.isAllowed,userController.getAll)
      .post(userController.createNew)
      .put(userController.getUserByUserName);

    router
      .route('/api/user/:id')
      .get(userController.getUserById)
      .delete(userPolicies.isAllowed,userController.removeById)
      .put(userController.updateUser);

    router
      .route('/api/is-user-exist/:username')
      .get(userController.isUserExist);

    router
      .route('/api/login')
      .post(function(req, res, next ){
        passport.authenticate('local-login',{successRedirect:'/api/user'}, function(err, user,info) {
          if (err) { return next(err) }
          if (!user) { return res.json(info) }
          user.password = undefined;
          user.salt = undefined;
          res.json(user);
        })(req, res, next);
      });
    router
      .route('/api/logout')
      .get(function(req,res){
        if(req.session.user){
          req.session.destroy(function(err) {
            if(err){
              console.log(err);
            }
            console.log('user logged out');
            res.status(200).json({login: false});
          });
        }
      })
    router
      .route('/api/checkLogin')
      .get(function(req,res){
        if(req.session.user){
          res.status(200).json({login:true});
        }else{
          res.status(200).json({login:false});
        }
      });
    router
      .route('/api/resetPassword/:email')
      .get(userController.resetPassword)
  }
}
