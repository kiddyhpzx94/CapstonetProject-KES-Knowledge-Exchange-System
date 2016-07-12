"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const offerSchema = require('./offer-model');
const _ = require('lodash');

offerSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Offer
          .find(_query)
          .exec((err, offers) => {
              err ? reject(err)
                  : resolve(offers);
          });
      });
}

offerSchema.statics.getOfferById = (id) => {

  return new Promise((resolve, reject) => {
    if(!_.isString(id)){
      return reject(new TypeError('ID is not a String.'));
    }
    Offer
      .findById(id)
      .exec((err, offer) => {
        err ? reject(err)
          : resolve(offer);
      });
  });
}

offerSchema.statics.getOfferByRequestId = (id) => {

  return new Promise((resolve, reject) => {
    if(!_.isString(id)){
      return reject(new TypeError('ID is not a String.'));
    }
    Offer
      .find({
        'requestId': id
      })
      .exec((err, offer) => {
        err ? reject(err)
          : resolve(offer);
      });
  });
}

offerSchema.statics.createOffer = (offer) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(offer))
          return reject(new TypeError('Offer is not a valid object.'));

      let _offer = new Offer(offer);
      _offer.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

offerSchema.statics.deleteOffer = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Offer
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

offerSchema.statics.updateOfferById = (offerinfo) => {
  return new Promise((resolve,reject) => {
    if (!_.isObject(offerinfo)) {
      return reject(new TypeError('Offer is not a valid object.'));
    }
    //let _user = new User(userinfo);
    // res.status(200).json(requestinfo);
    offerinfo.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

const Offer  = mongoose.model('Offer', offerSchema);

module.exports = Offer;
