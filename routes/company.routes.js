const express = require("express");
const router = express.Router();
const CompanyModel = require("./../models/Company"); //Path to CompanyModel
const fileUploader = require("./../config/cloudinary");
const protectRecruiterRoute = require("./../middlewares/protectRecruiterRoute");

//* Get all companies
router.get("/", async (req, res, next) => {
  try {
    const company = await CompanyModel.find().populate("user");
    res.status(200).json({ company });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Get a specific company
router.get("/:id", async (req, res, next) => {
  const companyId = req.params.id;
  try {
    const searchedCompany = await CompanyModel.findById(companyId);
    res.status(200).json({ searchedCompany });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Post: create a new company
//? Only a recruiter can create a company ?
router.post("/", fileUploader.single("logo"), async (req, res, next) => {
  const newCompany = { ...req.body };

  // Import logo if there is one
  if (req.file) {
    newCompany.logo = req.file.path;
  } else {
    newCompany.logo =
      "https://res.cloudinary.com/ago59/image/upload/v1616772836/remote-only/defaultcompany_logo_a3hjlz.jpg";
  }

  // Add the recruiter id to the company
  // if (req.session.currentUser.role === "recruiter") {
  //   newCompany.users.push(req.session.currentUser.id);
  // }

  try {
    const createdCompany = await CompanyModel.create(newCompany);
    console.log(createdCompany);
    res.status(201).json(createdCompany);
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Patch: update a company
// TODO: limit the update to a company recruiter
router.patch(
  "/:id",
  protectRecruiterRoute, // Only a recruiter can update a company
  fileUploader.single("logo"),
  async (req, res, next) => {
    const companyToUpdate = { ...req.body };
    if (req.file) {
      companyToUpdate.logo = req.file.path;
    } else {
      companyToUpdate.logo =
        "https://res.cloudinary.com/ago59/image/upload/v1616772836/remote-only/defaultcompany_logo_a3hjlz.jpg";
    }
    try {
      const updatedCompany = await CompanyModel.findByIdAndUpdate(
        req.params.id,
        companyToUpdate,
        { new: true }
      );
      res.status(202).json(updatedCompany);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

//* Delete a company
// TODO: limit the deletion to a company recruiter
router.delete("/:id", protectRecruiterRoute, async (req, res) => {
  // Only a recruiter can delete a company
  try {
    const deletedCompany = await CompanyModel.findByIdAndDelete(req.params.id);
    res.status(202).json(deletedCompany);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
