"use strict";

const NotificationController = require('./notification-controller');

module.exports = class NotificationRoutes {
    static init(router) {
      router
        .route('/api/notification')
        .get(NotificationController.getAll)
        .post(NotificationController.createNotification);

      router
        .route('/api/notification/:id')
        .delete(NotificationController.deleteNotification);
    
    router
        .route('/api/getNotification')
        .post(NotificationController.getNotificationByUser);

    router
        .route('/api/change-status-notification/:user')
        .get(NotificationController.changeStatusNotification);
    }
}
