const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const companySchema = new Schema({
  name: { type: String, required: true },
  logo: {
    type: String,
    default:
      "https://res.cloudinary.com/ago59/image/upload/v1616772836/remote-only/defaultcompany_logo_a3hjlz.jpg",
  },
  city: String,
  website: { type: String, required: true },
  industry: String,
  size: Number,
  description: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const CompanyModel = mongoose.model("companies", companySchema);
module.exports = CompanyModel;
