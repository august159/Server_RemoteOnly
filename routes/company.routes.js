const express = require("express");
const router = express.Router();
const CompanyModel = require("./../models/Company"); //Path to CompanyModel

//* Get all companies
router.get("/route", async (req, res, next) => {
  try {
    const company = await companyModel.find();
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
router.post("/", async (req, res, next) => {
  const newCompany = { ...req.body };
  if (req.file) {
    newCompany.logo = req.file.path;
  } else {
    newCompany.logo = "";
  }
  try {
    const createdCompany = await CompanyModel.create(newCompany);
    res.status(201).json(createdCompany);
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Patch: update a company
router.patch("/:id", async (req, res, next) => {
  const companyToUpdate = { ...req.body };
  if (req.file) {
    newCompany.logo = req.file.path;
  } else {
    newCompany.logo = "";
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
