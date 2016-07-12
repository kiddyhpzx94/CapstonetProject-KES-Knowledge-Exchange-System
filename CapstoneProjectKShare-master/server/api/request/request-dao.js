"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const requestSchema = require('./request-model');
const _ = require('lodash');

//get all back.request dao function
requestSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    Request
      .find(_query)
      .exec((err, requests) => {
        err ? reject(err)
          : resolve(requests);
      });
  });
}

//get request by id dao function
requestSchema.statics.getRequestById = (id) => {

  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('ID is not a String.'));
    }
    Request
      .findById(id)
      .exec((err, request) => {
        err ? reject(err)
          : resolve(request);
      });
  });
}

//full text search function index by title and description
requestSchema.statics.fullTextSearchRequest = (text) => {

  return new Promise((resolve, reject) => {

      Request
      .find({'$text':{'$search':text}},
            {score:{$meta: "textScore"}}
            ).sort({score:{$meta:"textScore"}})
      .exec((err, requests) => {
        err ? reject(err)
          : resolve(requests);
      });

  });
}

//get requets by back.knowledge id dao function
requestSchema.statics.getRequestByKnowledgeId = (id) => {

  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('ID is not a String.'));
    }
    Request
      .find({
        'knowledgeId': id
      })
      .exec((err, requests) => {
        err ? reject(err)
          : resolve(requests);
      });
  });
}

//get requets by user dao function
requestSchema.statics.getRequestByUser = (user) => {

  return new Promise((resolve, reject) => {
    Request
      .find({
        'user': user
      })
      .exec((err, requests) => {
        err ? reject(err)
          : resolve(requests);
      });
  });

}

//create back.request dao function
requestSchema.statics.createRequest = (request) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(request))
      return reject(new TypeError('Request is not a valid object.'));

    let _request = new Request(request);

    _request.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

//delete templates dao function
requestSchema.statics.deleteRequest = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id))
      return reject(new TypeError('Id is not a valid string.'));

    Request
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
          : resolve();
      });
  });
}

//update back.request dao function
requestSchema.statics.updateRequestById = (requestinfo) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(requestinfo)) {
      return reject(new TypeError('Request is not a valid object.'));
    }

    requestinfo.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
