"use strict";

const mongoose = require('mongoose');

const _badwordSchema = {
    word: {type: String, required: true, trim: true}
}

module.exports = mongoose.Schema(_badwordSchema);
