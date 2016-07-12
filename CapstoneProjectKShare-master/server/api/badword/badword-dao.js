"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const badwordSchema = require('./badword-model');
const _ = require('lodash');

badwordSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Badword
          .find(_query)
          .exec((err, badwords) => {
              err ? reject(err)
                  : resolve(badwords);
          });
      });
}

badwordSchema.statics.createBadword = (badword) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(badword))
          return reject(new TypeError('Badword is not a valid object.'));

      let _badword = new Badword(badword);

      _badword.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}
badwordSchema.statics.getBadwordById = (id) => {

  return new Promise((resolve, reject) => {
    if(!_.isString(id)){
      return reject(new TypeError('ID is not a String.'));
    }
    Badword
      .findById(id)
      .exec((err, badword) => {
        err ? reject(err)
          : resolve(badword);
      });
  });
}
badwordSchema.statics.updateBadword = (badword) => {
    return new Promise((resolve, reject) => {

        badword.save((err, saved) => {
              err ? reject(err)
                  : resolve(saved);
          });
    });
}
badwordSchema.statics.deleteBadword = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Badword
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Badword  = mongoose.model('Badword', badwordSchema);

module.exports = Badword;
