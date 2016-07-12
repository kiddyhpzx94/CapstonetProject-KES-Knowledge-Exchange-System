//Long

"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const KSpaceSchema = require('./KSpace-model');
const _ = require('lodash');

//function get all front.KSpace dao
KSpaceSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    KSpace
      .find(_query)
      .exec((err, KSpaces) => {
        err ? reject(err)
          : resolve(KSpaces);
      });
  });

};

//function get front.KSpace by ID  dao
KSpaceSchema.statics.getKSpaceById = (id) => {

  return new Promise((resolve, reject) => {
    if(!_.isString(id)){
      return reject(new TypeError('ID is not a String.'));
    }

    KSpace
      .findById(id)
      .exec((err, KSpace) => {
        err ? reject(err)
          : resolve(KSpace);
      });
  });
};

//function create new front.KSpace dao
KSpaceSchema.statics.createNew = (KSpace) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(KSpace)) {
      return reject(new TypeError('KSpace is not a valid object.'));
    }

    let _KSpace = new KSpace(KSpace);

    _KSpace.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
};

//function delete front.KSpace dao
KSpaceSchema.statics.removeById = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    KSpace
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
          : resolve();
      });
  });
};

//function update front.KSpace dao
KSpaceSchema.statics.updateKSpaceById = (KSpaceinfo) => {
  return new Promise((resolve,reject) => {
    if (!_.isObject(KSpaceinfo)) {
      return reject(new TypeError('KSpace is not a valid object.'));
    }
    KSpaceinfo.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
};

const KSpace = mongoose.model('KSpace', KSpaceSchema);
module.exports = KSpace;
