const mongoose = require("mongoose");
require("dotenv").config();
require("../../config/dbConnection"); //Path to db config aka MongoDB
const ApplicationModel = require("../../models/Application");
const UserModel = require("../../models/User");
const OfferModel = require("../../models/Offer");
const CompanyModel = require("../../models/Company");

(async function updateRelations() {
  //* Get all seeded information
  const allRecruiters = await UserModel.find({ role: "recruiter" });
  const allCandidates = await UserModel.find({ role: "candidate" });
  const allCompanies = await CompanyModel.find();
  const allOffers = await OfferModel.find();
  const allApplications = await ApplicationModel.find();

  try {
    //* Link applications in offers
    allOffers.forEach((offer) => (offer.applications = [])); //Initialize applications in offers as an array
    allOffers[0].applications.push(
      allApplications[0]._id,
      allApplications[1]._id
    ); //Push applications 1 & 2 to offer 1
    allOffers[1].applications.push(allApplications[2]._id); //Push application 3 to offer 2
    allOffers[2].applications.push(allApplications[3]._id); //Push application 4 to offer 3
    allOffers.forEach(
      async (offer) =>
        await OfferModel.findByIdAndUpdate(offer._id, offer, { new: true })
    );

    //! This method below only works because a 1-1 relation but we should push in real life

    //* Link offer into applications
    allOffers.forEach((offer) => {
      offer.applications.forEach(async (applicationId) => {
        await ApplicationModel.findByIdAndUpdate(
          applicationId,
          { offer: [offer._id] },
          {
            new: true,
          }
        );
      });
    });

    //* Link applications into candidate users
    allApplications.forEach((application) => {
      application.user.forEach(async (userId) => {
        await UserModel.findByIdAndUpdate(
          userId,
          { applications: [application._id] },
          { new: true }
        );
      });
    });

    //* Link offers into companies
    allOffers.forEach((offer) => {
      offer.company.forEach(async (companyId) => {
        await CompanyModel.findByIdAndUpdate(
          companyId,
          { offers: [offer._id] },
          { new: true }
        );
      });
    });

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
