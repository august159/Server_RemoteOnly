const express = require("express");
const router = express.Router();
const OfferModel = require("./../models/Offer");

router.get("/", (req, res, next) => {
  OfferModel.find()
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", (req, res, next) => {
  OfferModel.findById(req.param.id)
    .then((offer) => {
      res.status(200).json(offer);
    })
    .catch((error) => {
      next(error);
    });
});

router.patch("/:id", async (req, res, next) => {
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

router.post("/", (req, res, next) => {
  const offer = { ...req.body };
  OfferModel.create(offer)
    .then((offer) => {
      res.status(200).json(offer);
    })
    .catch((err) => next(err));
});

router.delete("/:id", (req, res, next) => {
  OfferModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: `Offer deleted` });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
