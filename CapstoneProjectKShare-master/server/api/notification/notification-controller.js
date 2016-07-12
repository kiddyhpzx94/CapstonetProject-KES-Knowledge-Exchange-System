"use strict";

const NotificationDAO = require('./notification-dao');

module.exports = class NotificationController {
  static getAll(req, res) {
      NotificationDAO
        .getAll()
        .then(notifications => res.status(200).json(notifications))
        .catch(error => res.status(400).json(error));
  }

  static createNotification(req, res) {
      let _notification = req.body;

      NotificationDAO
        .createNotification(_notification)
        .then(notification => res.status(201).json(notification))
        .catch(error => res.status(400).json(error));
  }

  static deleteNotification(req, res) {
    let _id = req.params.id;

    NotificationDAO
      .deleteNotification(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }

  static getNotificationByUser(req,res) {
    let _user = req.body.user;

    NotificationDAO
      .getNotificationByUser(_user)
      .then(notifications => res.status(200).json(notifications))
      .catch(error => res.status(400).json(error));
  }

}
