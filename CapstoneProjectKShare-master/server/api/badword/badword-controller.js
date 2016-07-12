"use strict";

const BadwordDAO = require('./badword-dao');

module.exports = class BadwordController {
  static getAll(req, res) {
      BadwordDAO
        .getAll()
        .then(badwords => res.status(200).json(badwords))
        .catch(error => res.status(400).json(error));
  }

  static createBadword(req, res) {
      let _badword = req.body;

      BadwordDAO
        .createBadword(_badword)
        .then(badword => res.status(201).json(badword))
        .catch(error => res.status(400).json(error));
  }

  static updateBadword(req, res){
    if(req.params && req.params.id) {
        BadwordDAO.getBadwordById(req.params.id)
          .then(badword => {
            badword.word = req.body.word,
            BadwordDAO.updateBadword(badword)
              .then(badword => res.status(200).json(badword))
              .catch(error => res.status(400).json(error));
          })
          .catch(error => res.status(400).json(error));
    }else{
      res.status(404).json({
        "message"    :   "No Knowledge in templates"
      });
    }
  }
  static findBadwordById(req,res){
    BadwordDAO.getBadwordById(req.params.id)
    .then(badword => res.status(200).json(badword))
    .catch(error => res.status(400).json(error));
  }
  static deleteBadword(req, res) {
    let _id = req.params.id;

    BadwordDAO
      .deleteBadword(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
