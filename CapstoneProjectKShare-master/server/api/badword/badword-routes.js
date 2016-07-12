"use strict";

const BadwordController = require('./badword-controller');

module.exports = class BadwordRoutes {
    static init(router) {
      router
        .route('/api/badwords')
        .get(BadwordController.getAll)
        .post(BadwordController.createBadword);

      router
        .route('/api/badwords/:id')
        .delete(BadwordController.deleteBadword)
        .put(BadwordController.updateBadword)
        .get(BadwordController.findBadwordById);
    }
}
