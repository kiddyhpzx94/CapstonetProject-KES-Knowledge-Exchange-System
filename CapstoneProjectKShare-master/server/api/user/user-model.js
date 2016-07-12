"use strict";

const mongoose = require('mongoose');
var validator = require('validator');
const crypto  = require('crypto');



var validateEmail = function(email){
  return validator.isEmail(email);
}

var validateRole = function (role) {
  if(role == "admin" || role == "manager" || role == "instructor" || role == "normal"){
    return true;
  }else {
    return false;
  }
}

var validatePass = function(password){
  var pattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
  return pattern.test(password);
}
const userSchema = new mongoose.Schema({
  name : {
    firstName: {
      type: String,
      trim: true,
      default: ''
    },
    lastName: {
      type: String,
      trim: true,
      default: ''
    }
  },
  displayName: {
    type: String,
    trim: true,
    default: ''
  },
  birthday:{
    type: Date
  },
  username: {
    type: String,
    trim: true,
    unique: [true, 'Username already exists'],
    lowercase: true,
    default: '',
    required: [true, 'Please fill in your username']
  },
  password: {
    type: String,
    trim: true,
    default: '',
    required: [true, 'Please fill in your password'],
    validate: [validatePass, 'password must be at least 8 characters including 1 uppercase letter, 1 special character and alphanumeric characters?']
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    default: '',
    required: [true, 'Please fill in your email'],
    validate: [validateEmail, "Email is not in the right form, let check it again!"]
  },
  role: {
    type: String,
    trim: true,
    default: '',
    required: [true, 'Role can not blank'],
    validate: [validateRole, "Role is not valid, try again!"]
  },
  ownKnowledgeId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Knowledge'
    }
  ],
  interestedKnowledgeId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Knowledge'
    }
  ],
  onlineTime: [
    {
      type: String
    }
  ],
  level:{
    type: Number,
    min: 1,
    max: 10
  },
  rateAve:{
    type: Number,
    min: 0,
    max: 5
  },
  status:{
    type: Boolean
  },
  salt: {
    type: String,
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date},
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  lastAccessedAt:{type:Date}
});

/**
 * Hook a pre save method to hash the password
 */
userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
userSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
userSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};


module.exports = userSchema;
