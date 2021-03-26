const express = require("express");
const router = express.Router();
const CompanyModel = require("./../models/Company"); //Path to CompanyModel
const fileUploader = require("../config/cloudinary");

//* Get all companies
router.get("/", async (req, res, next) => {
  try {
    const company = await CompanyModel.find();
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
router.post("/", fileUploader.single("logo"), async (req, res, next) => {
  const newCompany = { ...req.body };
  if (req.file) {
    newCompany.logo = req.file.path;
  } else {
    newCompany.logo =
      "https://res.cloudinary.com/ago59/image/upload/v1616772836/remote-only/defaultcompany_logo_a3hjlz.jpg";
  }
  try {
    const createdCompany = await CompanyModel.create(newCompany);
    console.log(createdCompany);
    res.status(201).json(createdCompany);
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Patch: update a company
router.patch("/:id", fileUploader.single("logo"), async (req, res, next) => {
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
});

//* Delete a company
router.delete("/:id", async (req, res) => {
  try {
    const deletedCompany = await CompanyModel.findByIdAndDelete(req.params.id);
    res.status(202).json(deletedCompany);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
