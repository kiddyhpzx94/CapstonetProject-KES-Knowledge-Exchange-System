"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const messageSchema = require('./message-model');
const _ = require('lodash');

messageSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Message
          .find(_query)
          .exec((err, messages) => {
              err ? reject(err)
                  : resolve(messages);
          });
      });
}

//get message by chatroom id dao function
messageSchema.statics.getMessageByChatRoomId = (id) => {

  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('ID is not a String.'));
    }
    Message
      .find({
        'chatRoomId': id
      })
      .exec((err, messages) => {
        err ? reject(err)
          : resolve(messages);
      });
  });
}

messageSchema.statics.createMessage = (message) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(message))
          return reject(new TypeError('ChatRoom is not a valid object.'));

      let _message = new Message(message);
      _message.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

const Message  = mongoose.model('Message', messageSchema);

module.exports = Message;
