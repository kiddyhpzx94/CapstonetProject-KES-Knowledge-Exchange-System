//long

"use strict";

const KSpaceController = require('./KSpace-controller');

module.exports = class KSpaceRoutes {
  static init(router) {
    router
      .route('/api/kspace')
      .get(KSpaceController.getAll)
      .post(KSpaceController.createNew);

    router
      .route('/api/kspace/:id')
      .get(KSpaceController.getKSpaceById)
      .put(KSpaceController.finishKSpace);

  }
}
