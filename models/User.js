const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/ago59/image/upload/v1616755182/remote-only/default-avatar-profile-icon-vector-social-media-user-portrait-176256935_tugyui.jpg",
  },
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
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
