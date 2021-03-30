const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const offerSchema = new Schema(
  {
    title: { type: String, required: true },
    salary: { type: Number, required: true },
    contractType: {
      type: String,
      enum: ["CDI", "CDD", "Freelance", "Stage", "Alternance"],
      required: true,
    },
    fieldWork: {
      type: String,
      enum: [
        "Produit",
        "Design",
        "Tech",
        "Customer Success",
        "DevOps",
        "Sales et Marketing",
      ],
      required: true,
    },
    profileDescription: { type: String },
    jobDescription: { type: String, required: true },
    recruitmentProcess: { type: String },
    startingDate: { type: Date },
    isActive: { type: Boolean, enum: ["true", "false"] },
    company: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
  },
  { timestamps: true }
);

const OfferModel = mongoose.model("offers", offerSchema);
module.exports = OfferModel;
