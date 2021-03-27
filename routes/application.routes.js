const express = require("express");
const router = express.Router();
const ApplicationModel = require("./../models/Application"); //Path to ApplicationModel
const fileUploader = require("../config/cloudinary");

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

router.patch("/:id", fileUploader.single("resume"), async (req, res, next) => {
  const appToUpdate = { ...req.body };
  if (req.file) {
    appToUpdate.resume = req.file.path;
  } else {
    appToUpdate.resume =
      "https://res.cloudinary.com/ago59/image/upload/v1616772836/remote-only/defaultcompany_logo_a3hjlz.jpg";
  }
  try {
    const updateApplication = { ...req.body };
    const application = await ApplicationModel.findByIdAndUpdate(
      req.params.id,
      updateApplication,
      { new: true }
    );
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
