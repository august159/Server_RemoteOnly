const express = require("express");
const router = express.Router();
const UserModel = require("../models/User"); //Path to UserModel
const ApplicationModel = require("../models/Application");
const fileUploader = require("../config/cloudinary");
const protectRoute = require("./../middlewares/protectRoute");

//* Get all users
// TODO: limit the consultation to the candidate or a same company recruiter based on their role
router.get("/", protectRoute, async (req, res, next) => {
  try {
    const user = await UserModel.find().populate("companies");
    console.log(`user`, user);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/applications/me", protectRoute, async (req, res, next) => {
  try {
    const searchedUser = await UserModel.findById(req.session.currentUser.id);
    const applications = await ApplicationModel.find({
      user: req.session.currentUser.id,
    }).populate({ path: "offer", populate: { path: "company" } }); //Allows to retrieve all offers applied & applications of one user
    res.status(200).json({ searchedUser, applications });
  } catch (error) {
    res.status(500).send(error);
  }
});

//* Get a specific user
// TODO: limit the consultation to the candidate or a same company recruiter based on their role
router.get("/:id", protectRoute, async (req, res, next) => {
  const userId = req.params.id;
  try {
    const searchedUser = await UserModel.findById(userId);
    const applications = await ApplicationModel.find({
      user: userId,
    }).populate({ path: "offer", populate: { path: "company" } }); //Allows to retrieve all offers applied & applications of one user
    res.status(200).json({ searchedUser, applications });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Post: create a new user
// router.post(
//   "/",
//   fileUploader.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "resume", maxCount: 1 },
//   ]),
//   async (req, res, next) => {
//     const newUser = { ...req.body };
//     if (req.files.avatar) {
//       newUser.avatar = req.files.avatar[0].path;
//     } else {
//       newUser.avatar =
//         "https://res.cloudinary.com/ago59/image/upload/v1616755182/remote-only/default-avatar-profile-icon-vector-social-media-user-portrait-176256935_tugyui.jpg";
//     }
//     if (req.files.resume) {
//       newUser.resume = req.files.resume[0].path;
//     }
//     try {
//       const createdUser = await UserModel.create(newUser);
//       res.status(201).json(createdUser);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   }
// );

//* Patch: update a User
// TODO: limit the update to the candidate or a same company recruiter based on their role
router.patch(
  "/:id",
  protectRoute,
  fileUploader.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res, next) => {
    const UserToUpdate = { ...req.body };
    if (req.files.avatar) {
      UserToUpdate.avatar = req.files.avatar[0].path;
    } else {
      UserToUpdate.avatar =
        "https://res.cloudinary.com/ago59/image/upload/v1616755182/remote-only/default-avatar-profile-icon-vector-social-media-user-portrait-176256935_tugyui.jpg";
    }
    if (req.files.resume) {
      UserToUpdate.resume = req.files.resume[0].path;
    }
    try {
      console.log(`UserToUpdate`, UserToUpdate);
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        UserToUpdate,
        { new: true }
      );
      res.status(202).json(updatedUser);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

//* Delete a user
// TODO: limit the deletion to the candidate or a same company recruiter based on their role
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    res
      .status(202)
      .json({ message: `This user has been deleted: ${deletedUser.id}` });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
