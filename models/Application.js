const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const applicationSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
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
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

const ApplicationModel = mongoose.model("applications", applicationSchema);
module.exports = ApplicationModel;
