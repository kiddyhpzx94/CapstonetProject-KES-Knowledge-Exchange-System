"use strict";
const passport = require('passport');
const userDAO = require('./user-dao');
const crypto  = require('crypto');
const transporter = require('./config/nodemailer');
const mailOptions = require('./config/mail-templates');
//Send Json
var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
module.exports = class userController {
  static getAll(req, res) {
    userDAO
      .getAll()
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json(error));
  }

  static getUserById(req, res) {
    if(req.params && req.params.id) {
      userDAO
        .getUserById(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No Userid in templates"
      });
    }
  }

  //get User informations by username
   static getUserByUserName(req, res) {
      userDAO
        .getUserByUserName(req.body.username)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error));

  }

  static createNew(req, res) {
    var currentDate = new Date();
    var user = {
      name : {
        firstName : req.body.firstName,
        lastName  : req.body.lastName,
      },
      displayName: req.body.displayName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      birthday: req.body.birthday,
      role: req.body.role,
      ownKnowledgeId:req.body.ownKnowledgeId,
      interestedKnowledgeId: req.body.interestedKnowledgeId,
      onlineTime: req.body.onlineTime,
      level: 1,
      rateAve:0,
      status: true
    }
    if(!req.body.role){
      user.role = "normal"
    }
    console.log(user);
    userDAO
      .createNew(user)
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json(error));
  }

  static updateUser(req, res){
    if(req.params && req.params.id) {
      var currentDate = new Date();
        userDAO.getUserById(req.params.id)
          .then(user => {
            user.name.firstName = req.body.firstName,
            user.name.lastName  = req.body.lastName,
            user.displayName    = req.body.displayName,
            user.username       = req.body.username,
            user.password       = req.body.password,
            user.email          = req.body.email,
            user.role           = req.body.role,
            user.knowledgeId    = req.body.knowledgeId,
            user.status         = req.body.status,
            user.updatedAt      = currentDate;

            //res.status(200).json(user);
            userDAO.updateUserById(user)
              .then(user => res.status(200).json(user))
              .catch(error => res.status(400).json(error));
          })
          .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No Userid in templates"
      });
    }
  }

  static resetPassword(req, res){
    if(req.params && req.params.email) {
      var currentDate = new Date();
      userDAO.getUserByEmail(req.params.email)
        .then(user => {
            user.resetPasswordToken = crypto.randomBytes(16).toString('base64');
            user.resetPasswordExpires = currentDate + 1;

            transporter.sendMail(mailOptions(user.email,user.username,user.resetPasswordToken).resetPass, function(errors, info){
              if(errors){
                res.status(400).json(errors);
              }
                res.status(200).json(info);
            });
        })
    }
  }

  static removeById(req, res) {
    let _id = req.params.id;

    userDAO
      .removeById(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }

  static isUserExist(req, res) {
    let _username = req.params.username;

    userDAO
      .isUserExist(_username)
      .then((user) =>res.status(200).json(user))
      .catch(error => res.status(400).json(error));
  }

}
