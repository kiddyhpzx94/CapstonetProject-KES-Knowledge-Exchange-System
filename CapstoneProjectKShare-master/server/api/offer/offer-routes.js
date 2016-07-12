"use strict";

const OfferController = require('./offer-controller');

module.exports = class OfferRoutes {
    static init(router) {
      router
        .route('/api/offers')
        .get(OfferController.getAll)
        .post(OfferController.createOffer);

      router
        .route('/api/offers/:id')
        .delete(OfferController.deleteOffer)
        .put(OfferController.updateOffer)
        .post(OfferController.getOfferByRequestId);
    }
}
