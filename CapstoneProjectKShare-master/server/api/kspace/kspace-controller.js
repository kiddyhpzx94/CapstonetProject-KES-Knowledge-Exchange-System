//long

"use strict";
const mongoose = require('mongoose');
const KSpaceDAO = require('./KSpace-dao');

module.exports = class KSpaceController {
  //get all KSpaces controller
  static getAll(req, res) {
    KSpaceDAO
      .getAll()
      .then(KSpaces => res.status(200).json(KSpaces))
      .catch(error => res.status(400).json(error));
  }

  //get a front.KSpace by Id controller
  static getKSpaceById(req, res) {
    if(req.params && req.params.id) {
      KSpaceDAO
        .getKSpaceById(req.params.id)
        .then(KSpace => res.status(200).json(KSpace))
        .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No KSpace ID in templates"
      });
    }
  }

  //create a new front.KSpace controller
  static createNew(req, res) {
    var currentDate = new Date();
    var KSpace = {
      lecturer : req.body.lecturer,
      learner  : req.body.learner,
      requestId: req.body.requestId,
      offerId: req.body.offerId,
      createdAt: currentDate,
    }

    console.log(KSpace);

    KSpaceDAO
      .createNew(KSpace)
      .then(KSpace => res.status(200).json(KSpace))
      .catch(error => res.status(400).json(error));
  }


  //finish a front.KSpace by ID controller (update finishedAt of a front.KSpace)
  static finishKSpace(req, res){
    var currentDate = new Date();

    if(req.params && req.params.id) {
        KSpaceDAO.getKSpaceById(req.params.id)
          .then(KSpace => {
            KSpace.finishedAt = currentDate;

            KSpaceDAO.updateKSpaceById(KSpace)
              .then(KSpace => res.status(200).json(KSpace))
              .catch(error => res.status(400).json(error));
          })
          .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No KSpace ID"
      });
    }
  }

}
