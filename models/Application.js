const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const applicationSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: {
    type: Number,
    validate: {
      validator: function (number) {
        return /d{10}/.test(number);
      },
      message: "{VALUE} is not a valid 10 digit number!",
    },
  },
  linkedIn: String,
  gitHub: String,
  otherWebsite: String,
  additionalInfo: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const ApplicationModel = mongoose.model("applications", applicationSchema);
module.exports = ApplicationModel;
