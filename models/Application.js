const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const applicationSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    resume: String,
    linkedIn: String,
    gitHub: String,
    otherWebsite: String,
    additionalInfo: String,
    isSelected: {
      type: Boolean,
      default: false,
    },
    isReviewed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    offer: {
      type: Schema.Types.ObjectId,
      ref: "offers",
    },
  },
  { timestamps: true }
);

const ApplicationModel = mongoose.model("applications", applicationSchema);
module.exports = ApplicationModel;
