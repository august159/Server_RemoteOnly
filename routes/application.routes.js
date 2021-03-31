const express = require("express");
const router = express.Router();
const ApplicationModel = require("./../models/Application"); //Path to ApplicationModel
const protectRoute = require("./../middlewares/protectRoute");
const fileUploader = require("../config/cloudinary");
const protectCandidateRoute = require("./../middlewares/protectCandidateRoute");

//* Get all applications
router.get("/", protectRoute, (req, res, next) => {
  //Protection: only logged candidates should be able to retrieve all their applications or a recruiter should get the applications of one of his company's offer
  ApplicationModel.find()
    .populate("user")
    .populate({
      path: "offer",
      populate: { path: "company" },
    })
    .then((appliDocuments) => {
      res.status(200).json(appliDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

//* Get a specific application
router.get("/:id", protectRoute, (req, res, next) => {
  //Protection: only logged candidates should be able to retrieve all their applications or a recruiter should get the applications of one of his company's offer
  ApplicationModel.findById(req.params.id)
    .populate("offer")
    .then((application) => {
      res.status(200).json(application);
    })
    .catch((error) => {
      next(error);
    });
});

//* Update a specific application
// TODO: limit the update to the applicant
router.patch("/:id", protectRoute, async (req, res, next) => {
  //Protection: only logged candidates should be able to retrieve all their applications or a recruiter should get the applications of one of his company's offer
  try {
    const application = await ApplicationModel.findByIdAndUpdate(
      req.params.id,
      updateApplication,
      { new: true }
    ).populate("user");
    console.log(application);
    res.status(200).json(application);
  } catch (error) {
    next(error);
  }
});

//* Create a new application
router.post("/", fileUploader.single("resume"), async (req, res, next) => {
  const newApplication = { ...req.body };
  if (req.file) {
    newApplication.resume = req.file.path;
  }
  try {
    const createdApplication = await ApplicationModel.create(newApplication);
    res.status(201).json(createdApplication);
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Delete an application
// TODO: limit the deletion to the applicant
router.delete("/:id", protectCandidateRoute, (req, res, next) => {
  //Only candidates can delete their application
  ApplicationModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: `Application deleted` });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
