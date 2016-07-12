"use strict";

const MessageController = require('./message-controller');

module.exports = class MessageRoutes {
    static init(router) {
      router
        .route('/api/messages')
        .get(MessageController.getAll)
        .post(MessageController.createMessage);

      router
        .route('/api/messages/:id')
        .get(MessageController.getMessageByChatRoomId);

    }

}
