"use strict";

const RequestDAO = require('./request-dao');

module.exports = class RequestController {
  static getAll(req, res) {
      RequestDAO
        .getAll()
        .then(requests => res.status(200).json(requests))
        .catch(error => res.status(400).json(error));
  }

  static createRequest(req, res) {
      let _request = req.body;

      console.log(_request);
      RequestDAO
        .createRequest(_request)
        .then(request => res.status(201).json(request))
        .catch(error => res.status(400).json(_request));
  }

static updateRequest(req, res){
    if(req.params && req.params.id) {
      var currentDate = new Date();
        RequestDAO.getRequestById(req.params.id)
          .then(request => {
            request.userId = req.params.id,
            request.title  = req.body.title,
            request.description = req.body.description,
            request.knowledgeId = req.body.knowledgeId,
            request.modifiedDate = currentDate;

            // res.status(200).json(templates);
            RequestDAO.updateRequestById(request)
              .then(request => res.status(200).json(request))
              .catch(error => res.status(400).json(error));
          })
          .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No Request id in templates"
      });
    }
  }

  static getRequestById(req,res) {
    if(req.params && req.params.id) {
      RequestDAO
        .getRequestById(req.params.id)
        .then(request => res.status(200).json(request))
        .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No Requestid in templates"
      });
    }
  }

  //controler relate to full-text search function DAO
  static fullTextSearchRequest(req,res) {

        RequestDAO
        .fullTextSearchRequest(req.body.text)
        .then(request => res.status(200).json(request))
        .catch(error => res.status(400).json(error));

  }

  static getRequestByKnowledgeId(req,res) {
    if(req.params && req.params.id) {
      RequestDAO
        .getRequestByKnowledgeId(req.params.id)
        .then(requests => res.status(200).json(requests))
        .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No Knowledge Id in templates"
      });
    }
  }

    static getRequestByUser(req,res) {
    if(req.params) {
      console.log('123');
      RequestDAO
        .getRequestByUser(req.params.user)
        .then(requests => res.status(200).json(requests))
        .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No Knowledge Id in templates"
      });
    }
  }

  static deleteRequest(req, res) {
    let _id = req.params.id;

    RequestDAO
      .deleteRequest(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }

  //change status of a templates to deactive
  static changeStatusRequest(req, res){
    var currentDate = new Date();
    if(req.params && req.params.id) {
        RequestDAO.getRequestById(req.params.id)
          .then(request => {
            request.modifiedDate = currentDate;
            request.status = "deactive";

            RequestDAO.updateRequestById(request)
              .then(request => res.status(200).json(request))
              .catch(error => res.status(400).json(error));
          })
          .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No Request id in templates"
      });
    }
  }

  //change status of a templates to deactive
  static addSubcriber(req, res){
    var currentDate = new Date();
    if(req.params && req.params.id) {
        RequestDAO.getRequestById(req.params.id)
          .then(request => {
            request.subcribers.push(req.body.subcriber);

            RequestDAO.updateRequestById(request)
              .then(request => res.status(200).json(request))
              .catch(error => res.status(400).json(error));
          })
          .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No Request id in templates"
      });
    }
  }

}
