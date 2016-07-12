"use strict";

const FriendShipController = require('./friendship-controller');

module.exports = class FriendShipRoutes {
    static init(router) {
        router
            .route('/api/friendship')
            .get(FriendShipController.getAll)
            .post(FriendShipController.createFriendship)
            .put(FriendShipController.deleteFriendship);

        router
            .route('/api/getFriendship')
            .post(FriendShipController.getFriendshipByUser);

        router
            .route('/api/friendship-status/:user1/:user2')
            .get(FriendShipController.changeStatusFriendship);
    }

}
