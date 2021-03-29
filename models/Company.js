const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const companySchema = new Schema({
  name: { type: String, required: true },
  logo: String,
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
