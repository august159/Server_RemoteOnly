const express = require("express");
const router = express.Router();
const ApplicationModel = require("./../models/Application"); //Path to ApplicationModel
const protectRoute = require("./../middlewares/protectRoute");
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
    .then((application) => {
      res.status(200).json(application);
    })
    .catch((error) => {
      next(error);
    });
});

//* Update a specific application
// Todo: limit the update to the applicant
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
router.post("/", (req, res, next) => {
  // Everybody should be able to apply, connected or not
  const application = { ...req.body }; //! Offer.id need to be passed from the front end in the req body
  ApplicationModel.create(application)
    .then((application) => {
      // Attribute candidate id as the user.id
      if (req.session.currentUser.role === "candidate") {
        application.user = req.session.currentUser.id;
      }

      res.status(200).json(application);
    })
    .catch((err) => next(err));
});

//* Delete an application
// Todo: limit the deletion to the applicant
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
