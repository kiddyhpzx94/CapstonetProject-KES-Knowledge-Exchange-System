"use strict";

const mongoose = require('mongoose');

const knowledgeSchema = {
    name: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    update: {type: Date, default: Date.now},
    parent: {type: mongoose.Schema.Types.ObjectId,ref:'Knowledge'}
}

module.exports = mongoose.Schema(knowledgeSchema);
