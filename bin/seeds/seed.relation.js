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

  //* Link applications in offers
  //   console.log(`allApplications`, allApplications);
  allOffers.forEach((offer) => (offer.applications = [])); //Initialize applications in offers as an array
  allOffers[0].applications.push(
    allApplications[0]._id,
    allApplications[1]._id
  ); //Push applications 1 & 2 to offer 1
  allOffers[1].applications.push(allApplications[2]._id); //Push application 3 to offer 2
  allOffers[2].applications.push(allApplications[3]._id); //Push application 4 to offer 3
  console.log(allOffers);
  allOffers.forEach(
    async (offer) =>
      await OfferModel.findByIdAndUpdate(offer._id, offer, { new: true })
  );
})();
