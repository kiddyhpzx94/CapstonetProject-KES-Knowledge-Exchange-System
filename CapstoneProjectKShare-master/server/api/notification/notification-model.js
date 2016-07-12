"use strict";

const mongoose = require('mongoose');

const _notificationSchema = {
    user: { 
        type: String, 
        required: true, 
        ref: 'User' 
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    title: {
        type: String, 
        default: 'Notification title'
    },
    body: {
        type: String,
        default: 'Notification body'
    },
    incon: {
        type: String,
        default: 'https://goo.gl/3eqeiE'
    },
    status: {
        type: String,
        default: 'Chưa đọc'
    } 
}

module.exports = mongoose.Schema(_notificationSchema);
