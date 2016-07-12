"use strict";

const ChatRoomDAO = require('./chatRoom-dao');

module.exports = class ChatRoomController {
  static getAll(req, res) {
      ChatRoomDAO
        .getAll()
        .then(chatRooms => res.status(200).json(chatRooms))
        .catch(error => res.status(400).json(error));
  }

  static createChatRoom(req, res) {
      let _info = req.body;

      ChatRoomDAO
        .createChatRoom(_info)
        .then(chatRoom => res.status(201).json(chatRoom))
        .catch(error => res.status(400).json(error));
  }

static updateChatRoom(req, res){
    if(req.params && req.params.id) {
        ChatRoomDAO.getChatRoomById(req.params.id)
          .then(chatRoom => {
            chatRoom.name = req.body.name

            ChatRoomDAO.updateChatRoomById(chatRoom)
              .then(chatRoom => res.status(200).json(chatRoom))
              .catch(error => res.status(400).json(error));
          })
          .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No Chat Room id in front.offer"
      });
    }
  }

  static deleteChatRoom(req, res) {
    let _id = req.params.id;

    ChatRoomDAO
      .deleteChatRoom(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }

  static getChatRoomById(req,res) {
    if(req.params && req.params.id) {
      ChatRoomDAO
        .getChatRoomById(req.params.id)
        .then(chatRoom => res.status(200).json(chatRoom))
        .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No chatRoom id in templates"
      });
    }
  }

  static getChatRoomByKSpaceId(req,res) {
    if(req.params && req.params.id) {
      ChatRoomDAO
        .getChatRoomByKSpaceId(req.params.id)
        .then(chatRoom => res.status(200).json(chatRoom))
        .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No ChatRoom Id in templates"
      });
    }
  }

}
