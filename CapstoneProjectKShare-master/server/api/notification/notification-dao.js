"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const notificationSchema = require('./notification-model');
const _ = require('lodash');

notificationSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Notification
          .find(_query)
          .exec((err, notifications) => {
              err ? reject(err)
                  : resolve(notifications);
          });
      });
}

notificationSchema.statics.createNotification = (notification) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(notification))
          return reject(new TypeError('Notification is not a valid object.'));

      let _notification = new Notification(notification);
      _notification.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

notificationSchema.statics.deleteNotification = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Notification
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

//get notification by user 
notificationSchema.statics.getNotificationByUser = (user) => {
    return new Promise((resolve, reject) => {

        Notification
          .find({
              "user": user
          })
          .exec((err, notifications) => {
              err ? reject(err)
                  : resolve(notifications);
          });
      });
}

//update friendship dao function
notificationSchema.statics.updateNotification = (info) => {
  return new Promise((resolve, reject) => {

    info.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

const Notification  = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
