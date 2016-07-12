"use strict";

const FriendShipDAO = require('./friendship-dao');

module.exports = class FriendShipController {
  static getAll(req, res) {
    FriendShipDAO
      .getAll()
      .then(friendships => res.status(200).json(friendships))
      .catch(error => res.status(400).json(error));
  }

  static createFriendship(req, res) {
    let _friendship = req.body;

    FriendShipDAO
      .createFriendship(_friendship)
      .then(friendship => res.status(201).json(friendship))
      .catch(error => res.status(400).json(error));
  }

  static deleteFriendship(req, res) {
    let _requestUser = req.body.requestUser;
    let _acceptUser = req.body.acceptUser;

    FriendShipDAO
      .deleteFriendship(_requestUser, _acceptUser)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }

  static getFriendshipByUser(req, res) {
    let _user = req.body.user;

    FriendShipDAO
      .getFriendshipByUser(_user)
      .then(friendships => res.status(200).json(friendships))
      .catch(error => res.status(400).json(error));
  }

  static changeStatusFriendship(req, res) {
    var currentDate = new Date();
    FriendShipDAO.getFriendshipByRequestAndAcceptUser(req.params.user1, req.params.user2)
      .then(friendship => {
        friendship[0].status = "accepted";

        FriendShipDAO.updateFriendship(friendship[0])
          .then(friendship => res.status(200).json(friendship[0]))
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  }


}
