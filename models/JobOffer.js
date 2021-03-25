const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const jobofferShema = new Schema({
    title: { type: String, required: true },
    salary:  { type: Number, required: true },
    contractType: {
        type: String,
        enum: [
          "CDI",
          "CDD",
          "Freelance",
          "Stage",
          "Alternance",
          
        ],
        required: true,
      },
    fieldWork : {
        type: String,
        enum: [
          "Produit",
          "Design",
          "Programmation",
          "Customer Success",
          "DevOps",
          "Sales et Marketing",
        ],
        required: true,
      },
      profilDescription : {type:String} ,
      jobDescription  : {type:String, required:true} ,
      recruitmentProcess  : {type:String} ,
      startingDate  : {type:Date} ,
      status  : {type: Boolean,
      enum: [
        "true",
        "false",
      ]},
      applications: [
        {
          type: Schema.Types.ObjectId,
          ref: "applications",
        },
      ],
      companies: [
        {
          type: Schema.Types.ObjectId,
          ref: "companies",
        },
      ],
    },
    { timestamps: true },
)
        

const ApplicationModel = mongoose.model("applications", applicationSchema);
module.exports = ApplicationModel;

const JobOfferModel = mongoose.model("joboffers", jobofferShema);
module.exports = JobOfferModel;
