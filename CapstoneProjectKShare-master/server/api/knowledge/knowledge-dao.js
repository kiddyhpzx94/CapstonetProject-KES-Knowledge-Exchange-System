"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const knowledgeSchema = require('./knowledge-model');
const _ = require('lodash');

knowledgeSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Knowledge
          .find(_query)
          .exec((err, knowledges) => {
              err ? reject(err)
                  : resolve(knowledges);
          });
      });
}

knowledgeSchema.statics.getKnowledgeById = (id) => {

  return new Promise((resolve, reject) => {
    if(!_.isString(id)){
      return reject(new TypeError('ID is not a String.'));
    }
    Knowledge
      .findById(id)
      .exec((err, knowledge) => {
        err ? reject(err)
          : resolve(knowledge);
      });
  });
}

knowledgeSchema.statics.getKnowledgeByParent = (id) => {

  return new Promise((resolve, reject) => {
    if(!_.isString(id)){
      return reject(new TypeError('ID is not a String.'));
    }
    Knowledge
      .find({
        'parent': id
      })
      .exec((err, knowledges) => {
        err ? reject(err)
          : resolve(knowledges);
      });
  });
}
knowledgeSchema.statics.createKnowledge = (knowledge) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(knowledge))
          return reject(new TypeError('Todo is not a valid object.'));

      let _knowledge = new Knowledge(knowledge);

      _knowledge.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

knowledgeSchema.statics.deleteKnowledge = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Knowledge
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

knowledgeSchema.statics.updateKnowledge = (knowledge) => {
    return new Promise((resolve, reject) => {

        knowledge.save((err, saved) => {
              err ? reject(err)
                  : resolve(saved);
          });
    });
}
const Knowledge  = mongoose.model('Knowledge', knowledgeSchema);

module.exports = Knowledge;
