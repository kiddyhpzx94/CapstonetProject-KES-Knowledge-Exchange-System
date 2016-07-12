"use strict";

const KnowledgeController = require('./knowledge-controller');

module.exports = class KnowledgeRoutes {
    static init(router) {
      router
        .route('/api/knowledges')
        .get(KnowledgeController.getAll)
        .post(KnowledgeController.createKnowledge);

      router
        .route('/api/knowledges/:id')
        .get(KnowledgeController.getKnowledgeById)
        .delete(KnowledgeController.deleteKnowledge)
        .put(KnowledgeController.updateKnowledge);

     router
        .route('/api/knowledges/parent/:id')
        .get(KnowledgeController.getKnowledgeByParent);
    }
}
