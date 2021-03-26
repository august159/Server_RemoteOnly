const express = require("express");
const router = express.Router();
const ApplicationModel = require("./../models/Application"); //Path to ApplicationModel

router.get("/", (req, res, next) => {
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
    .catch((error) => {
      next(error);
    });
});

router.patch("/:id", async (req, res, next) => {
  try {
    const updateApplication = { ...req.body };
    console.log(updateApplication);
    const application = await ApplicationModel.findByIdAndUpdate(
      req.params.id,
      updateApplication,
      { new: true }
    );
    console.log(application);
    res.status(200).json(application);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  const application = { ...req.body };
  console.log(application);
  ApplicationModel.create(application)
    .then((application) => {
      res.status(200).json(application);
    })
    .catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  ApplicationModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: `Application deleted` });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
