"use strict";

const ChatRoomController = require('./chatRoom-controller');

module.exports = class ChatRoomRoutes {
    static init(router) {
      router
        .route('/api/chat-rooms')
        .get(ChatRoomController.getAll)
        .post(ChatRoomController.createChatRoom);

      router
        .route('/api/chat-rooms/:id')
        .delete(ChatRoomController.deleteChatRoom)
        .put(ChatRoomController.updateChatRoom)
        .get(ChatRoomController.getChatRoomById)
        .post(ChatRoomController.getChatRoomByKSpaceId);
    }
}
