"use strict";

const mongoose = require('mongoose');

const _friendshipSchema = {
    user1: { 
        type: String, 
        required: true, 
        ref: 'User' 
    },
    user2: { 
        type: String, 
        required: true, 
        ref: 'User'
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    status: {
        type: String, 
        default: 'pending'
    }  
}

module.exports = mongoose.Schema(_friendshipSchema);
