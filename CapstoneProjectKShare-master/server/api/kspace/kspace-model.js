//long

"use strict";

const mongoose = require('mongoose');

const KSpaceSchema = new mongoose.Schema({
  lecturer: {
    type: String,
    ref: 'User',
    required: true
  },
  learner: {
    type: String,
    ref: 'User',
    required: true
  },
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true
  },
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  finishedAt: {
    type: Date,
  },

});

module.exports = KSpaceSchema;
