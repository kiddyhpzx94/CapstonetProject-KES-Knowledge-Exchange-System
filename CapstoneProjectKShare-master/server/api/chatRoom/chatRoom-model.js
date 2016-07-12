"use strict";

const mongoose = require('mongoose');

const _chatRoomSchema = {
    name: {
        type: String
    },
    createdAt: { 
        type: Date, default: Date.now 
    },
    kSpaceId: {
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'KSpace'
    },
}

module.exports = mongoose.Schema(_chatRoomSchema);
