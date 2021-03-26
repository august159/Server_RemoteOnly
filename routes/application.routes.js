const express = require("express");
const router = express.Router();
const ApplicationModel = require("./../models/Application"); //Path to ApplicationModel

router.get("/applications", (req, res, next) => {
  // console.log("from react");

  ApplicationModel.find()
    .then((appliDocuments) => {
      res.status(200).json(appliDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", (req, res, next) => {
  ApplicationModel.findById(req.params.id)
    .then((application) => {
      res.status(200).json(application);
    })
    .catch((dberror) => {
      next(dberror);
    });
});

router.post("/", (req, res, next) => {
  let { name, description } = req.body;
  ApplicationModel.create({ name, description })
    .then((application) => {
      res.status(200).json(application);
    })
    .catch((err) => next(err));
});

module.exports = router;
