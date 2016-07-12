"use strict";

const mongoose = require('mongoose');
//const textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;

const _requestSchema = new Schema ({
    user: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    description: { type: String, required: true, trim: true },
    status: { type: String, default: 'pending' },
    modifiedDate: { type: Date },
    knowledgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Knowledge',required: true },
    subcribers: [String]
});

 //_requestSchema.plugin(textSearch);

_requestSchema.index({
    description: 'text'
});

module.exports = (_requestSchema);
