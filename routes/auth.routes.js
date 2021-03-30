const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const fileUploader = require("../config/cloudinary");
const protectRoute = require("./../middlewares/protectRoute");

const salt = 10;

router.post("/signin", (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then((userDocument) => {
      if (!userDocument) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isValidPassword = bcrypt.compareSync(
        password,
        userDocument.password
      );
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      req.session.currentUser = {
        id: userDocument._id,
        role: userDocument.role,
      };

      res.redirect("/api/auth/isLoggedIn");
    })
    .catch(next);
});

router.post(
  "/signup",
  fileUploader.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  (req, res, next) => {
    const { email, password, ...rest } = req.body;

    UserModel.findOne({ email })
      .then((userDocument) => {
        if (userDocument) {
          return res.status(400).json({ message: "Email already taken" });
        }

        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = { email, password: hashedPassword, ...rest };
        if (req.files && req.files.avatar) {
          newUser.avatar = req.files.avatar[0].path;
        } else {
          newUser.avatar =
            "https://res.cloudinary.com/ago59/image/upload/v1616755182/remote-only/default-avatar-profile-icon-vector-social-media-user-portrait-176256935_tugyui.jpg";
        }
        if (req.files.resume) {
          newUser.resume = req.files.resume[0].path;
        }

        UserModel.create(newUser)
          .then((newUserDocument) => {
            /* Login on signup */
            req.session.currentUser = {
              id: newUserDocument._id,
              role: newUserDocument.role,
            };
            res.redirect("/api/auth/isLoggedIn");
          })
          .catch(next);
      })
      .catch(next);
  }
);

router.get("/isLoggedIn", protectRoute, (req, res, next) => {
  // if (!req.session.currentUser)
  //   return res.status(401).json({ message: "Unauthorized" });

  const id = req.session.currentUser.id;

  UserModel.findById(id)
    .select("-password")
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch(next);
});

router.get("/logout", protectRoute, (req, res, next) => {
  req.session.destroy(function (error) {
    if (error) next(error);
    else res.status(200).json({ message: "Succesfully disconnected." });
  });
});

module.exports = router;
