const mongoose = require("mongoose");
require("dotenv").config();
require("../../config/dbConnection"); //Path to db config aka MongoDB
const ApplicationModel = require("../../models/Application");
const UserModel = require("../../models/User");
const OfferModel = require("../../models/Offer");
const CompanyModel = require("../../models/Company");

(async function updateRelations() {
  //* Get all seeded information
  // const allRecruiters = await UserModel.find({ role: "recruiter" });
  // const allCandidates = await UserModel.find({ role: "candidate" });
  const allCompanies = await CompanyModel.find();
  const allOffers = await OfferModel.find();
  const allApplications = await ApplicationModel.find();

  try {
    // //* Link offer in applications
    console.log("1");
    allApplications[0].offer = allOffers[0]._id; // Application to offer 1
    allApplications[1].offer = allOffers[0]._id; // Application to offer 1
    allApplications[2].offer = allOffers[1]._id; // Application to offer 2
    allApplications[3].offer = allOffers[2]._id; // Application to offer 3

    async function updateApplications() {
      for (let application of allApplications) {
        await ApplicationModel.findByIdAndUpdate(
          application._id,
          { offer: application.offer },
          { new: true }
        );
      }
    }

    updateApplications();

    //* Link companies into recruiters
    console.log("5");
    async function linkCompaniesRecruiter() {
      //! Always use for...of (sequence) or Promise.all (parallel) with promise & not forEach
      for (let company of allCompanies) {
        for (let userId of company.users) {
          await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { companies: [company._id] } }, //addToSet is equivalent to push but checks if the value exists in the db before
            { new: true }
          );
          console.log("5.1");
        }
      }
    }

    linkCompaniesRecruiter();

    console.log(`Reverse relations completed !`);
    // mongoose.connection
    //   .close()
    //   .then((success) => console.log("Remote connection ended"));
  } catch (err) {
    console.error(err);
    mongoose.connection
      .close()
      .then((success) =>
        console.log("Remote connection ended, seed completed !!!")
      );
  }
})();
