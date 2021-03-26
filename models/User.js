const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ["recruiter", "candidate"], required: true },
  position: String,
  companies: [
    {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
  ],
  phone: String,
  linkedIn: String,
  gitHub: String,
  otherWebsite: String,
  additionalInfo: String,
  resume: String,
  offers: [
    {
      type: Schema.Types.ObjectId,
      ref: "offers",
    },
  ],
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
