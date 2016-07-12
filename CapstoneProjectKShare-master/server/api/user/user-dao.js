"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const userSchema = require('./user-model');
const passport = require('passport');
const _ = require('lodash');


//Send Json
var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

userSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    User
      .find(_query)
      .exec((err, user) => {
        err ? reject(err)
          : resolve(user);
      });
  });

}

userSchema.statics.getUserById = (id) => {

  return new Promise((resolve, reject) => {
    if(!_.isString(id)){
      return reject(new TypeError('ID is not a String.'));
    }
    User
      .findById(id)
      .exec((err, user) => {
        err ? reject(err)
          : resolve(user);
      });
  });
}


userSchema.statics.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if(!_.isString(email)){
      return reject(new TypeError('Not valid email.'));
    }
    User.findOne({ 'email' : email })
        .exec((err, user) => {
          err ? reject(err) : resolve(user);
        });
  });
}

// get user by username
userSchema.statics.getUserByUserName = (user) => {
  return new Promise((resolve, reject) => {

    User.findOne({ 'username' : user })
        .exec((err, user) => {
          err ? reject(err) : resolve(user);
        });
  });
}

userSchema.statics.createNew = (user) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(user)) {
      return reject(new TypeError('User is not a valid object.'));
    }

    let _user = new User(user);

    _user.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

userSchema.statics.removeById = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    User
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
          : resolve();
      });
  });
}

userSchema.statics.updateUserById = (userinfo) => {
  return new Promise((resolve,reject) => {
    if (!_.isObject(userinfo)) {
      return reject(new TypeError('User is not a valid object.'));
    }
    userinfo.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

//check if a username is exist return 1, else return 0
userSchema.statics.isUserExist = (username) => {
  return new Promise((resolve,reject) => {
    
    User
      .count({
        "username": username
      })
      .exec((err, user) => {
        err ? reject(err)
          : resolve(user);
      });
  });
}

const User = mongoose.model('User', userSchema);
module.exports = User;
