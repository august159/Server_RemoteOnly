const express = require("express");
const router = express.Router();
const OfferModel = require("./../models/Offer");
const ApplicationModel = require("./../models/Application");
const protectRecruiterRoute = require("./../middlewares/protectRecruiterRoute");

//* Get all job offers
router.get("/", async (req, res, next) => {
  OfferModel.find()
    .populate("company")
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((error) => {
      next(error);
    });
});

//* Get a specific offer
router.get("/:id", async (req, res, next) => {
  const offerId = req.params.id;
  try {
    const searchedOffer = await OfferModel.findById(offerId);
    const applications = await ApplicationModel.find({ offer: offerId });
    res.status(200).json({ searchedOffer, applications });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Update a specific offer
// TODO: limit the update to a company's recruiter
router.patch("/:id", protectRecruiterRoute, async (req, res, next) => {
  try {
    const updateOffer = { ...req.body };
    console.log(updateOffer);
    const offer = await OfferModel.findByIdAndUpdate(
      req.params.id,
      updateOffer,
      { new: true }
    );
    res.status(200).json(offer);
  } catch (error) {
    next(error);
  }
});

//* Create an offer
// TODO: limit the creation to a company's recruiter
router.post("/", protectRecruiterRoute, (req, res, next) => {
  const offer = { ...req.body }; //! Company.id need to be passed from the front end in the req body
  OfferModel.create(offer)
    .then((offer) => {
      res.status(200).json(offer);
    })
    .catch((err) => next(err));
});

//* Delete an offer
// TODO: limit the deletion to a company's recruiter
router.delete("/:id", protectRecruiterRoute, (req, res, next) => {
  OfferModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: `Offer deleted` });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
