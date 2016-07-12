"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const friendshipSchema = require('./friendship-model');
const _ = require('lodash');

friendshipSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        FriendShip
          .find(_query)
          .exec((err, friendships) => {
              err ? reject(err)
                  : resolve(friendships);
          });
      });
}

friendshipSchema.statics.createFriendship = (friendship) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(friendship))
          return reject(new TypeError('Friendship is not a valid object.'));

      let _friendship = new FriendShip(friendship);
      _friendship.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

friendshipSchema.statics.deleteFriendship = (requestUser, acceptUser) => {
    return new Promise((resolve, reject) => {

        FriendShip
          .remove({
              "user1": requestUser,
              "user2": acceptUser
          })
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

//get friendship by user who send friend request
friendshipSchema.statics.getFriendshipByUser = (user) => {
    return new Promise((resolve, reject) => {

        FriendShip
          .find({
              $or:[
                  {"user1": user},
                  {"user2": user}
              ]
          })
          .exec((err, friendships) => {
              err ? reject(err)
                  : resolve(friendships);
          });
      });
}

//get friendship by user who send friend request
friendshipSchema.statics.getFriendshipByRequestAndAcceptUser = (requestUser,acceptUser) => {
    return new Promise((resolve, reject) => {

        FriendShip
          .find({
              $or:[
                  {
                    "user1": requestUser,
                    "user2": acceptUser},
                  {
                    "user1": acceptUser,
                    "user2": requestUser}
              ]
          })
          .exec((err, friendships) => {
              err ? reject(err)
                  : resolve(friendships);
          });
      });
}

//update friendship dao function
friendshipSchema.statics.updateFriendship = (info) => {
  return new Promise((resolve, reject) => {

    info.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

const FriendShip  = mongoose.model('FriendShip', friendshipSchema);

module.exports = FriendShip;
