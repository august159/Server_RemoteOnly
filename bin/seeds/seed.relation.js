const mongoose = require("mongoose");
require("dotenv").config();
require("../../config/dbConnection"); //Path to db config aka MongoDB
const ApplicationModel = require("../../models/Application");
const UserModel = require("../../models/User");
const OfferModel = require("../../models/Offer");
const CompanyModel = require("../../models/Company");

(async function updateRelations() {
  //* Get all seeded information

  try {
    //* Link companies into recruiters
    async function linkCompaniesRecruiter() {
      const allCompanies = await CompanyModel.find();
      //! Always use for...of (sequence) or Promise.all (parallel) with promise & not forEach
      for (let company of allCompanies) {
        for (let userId of company.users) {
          await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { companies: [company._id] } }, //addToSet is equivalent to push but checks if the value exists in the db before
            { new: true }
          );
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
