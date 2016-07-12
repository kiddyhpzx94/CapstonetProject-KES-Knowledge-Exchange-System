"use strict";

const MessageDAO = require('./message-dao');

module.exports = class MessageController {
  static getAll(req, res) {
      MessageDAO
        .getAll()
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json(error));
  }

  static createMessage(req, res) {
      let _info = req.body;

      MessageDAO
        .createMessage(_info)
        .then(message => res.status(201).json(message))
        .catch(error => res.status(400).json(error));
  }

  static getMessageByChatRoomId(req,res) {
    if(req.params && req.params.id) {
      MessageDAO
        .getMessageByChatRoomId(req.params.id)
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No Message Id in templates"
      });
    }
  }

}
