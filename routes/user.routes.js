const express = require("express");
const router = express.Router();
const UserModel = require("./../models/User"); //Path to UserModel
const fileUploader = require("../config/cloudinary");

//* Get all users
router.get("/", async (req, res, next) => {
  try {
    const user = await UserModel.find();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Get a specific user
router.get("/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const searchedUser = await UserModel.findById(userId);
    res.status(200).json({ searchedUser });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Post: create a new user
router.post("/", fileUploader.single("picture"), async (req, res, next) => {
  const newUser = { ...req.body };
  if (req.file) {
    newUser.avatar = req.file.path;
    // newUser.resume = req.file.path,
  }
  try {
    const createdUser = await UserModel.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Patch: update a User
// Todo: update files
router.patch("/:id", async (req, res, next) => {
  const UserToUpdate = { ...req.body };
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      UserToUpdate,
      { new: true }
    );
    res.status(202).json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    res.status(202).json(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
