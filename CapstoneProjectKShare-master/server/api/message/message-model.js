"use strict";

const mongoose = require('mongoose');

const _messageSchema = {
    chatRoomId: {
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRoom'
    },
    createdAt: { 
        type: Date, default: Date.now 
    },
    user: {
        require: true,
        type: String
    },
    content: {
        require: true,
        type: String
    }
}

module.exports = mongoose.Schema(_messageSchema);
