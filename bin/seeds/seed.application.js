const mongoose = require("mongoose");
require("dotenv").config();
require("../../config/dbConnection"); //Path to db config aka MongoDB
const ApplicationModel = require("./../../models/Application");
const UserModel = require("./../../models/User");

//* Define data sample
const applications = [
  {
    //Application not logged in
    firstName: "Roy",
    lastName: "TRENNEMAN",
    email: "candidateX@gmail.com",
    phone: "077766554433",
    linkedIn: "https://www.linkedin.com/in/roy-trenneman/",
    gitHub: "https://github.com/rtrenneman",
    additionalInfo: "I am Irish and part of the IT crowd",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838612/remote-only/kmsqv7emx7fzxdehtyj4.pdf",
  },
  {
    email: "candidat1@gmail.com",
    firstName: "Maurice",
    lastName: "MOSS",
    phone: "0612345678",
    linkedIn: "https://www.linkedin.com/in/moss/",
    gitHub: "https://github.com/moss",
    otherWebsite: "www.moss.com",
    additionalInfo: "IT specialist",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838934/remote-only/rw8owjcjxz59zmbtnl7k.pdf",
  },
  {
    email: "candidat2@gmail.com",
    firstName: "Jen",
    lastName: "BARBER",
    role: "candidate",
    phone: "0687654321",
    linkedIn: "https://www.linkedin.com/in/jen/",
    additionalInfo: "Manager",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616839173/remote-only/iyzngidtb2elwc5xzt4l.pdf",
  },
  {
    email: "candidat3@gmail.com",
    firstName: "Douglas",
    lastName: "REYNHOLM",
    role: "candidate",
    phone: "0622334455",
    linkedIn: "https://www.linkedin.com/in/dreynholm/",
    additionalInfo: "CEO bitch",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616839874/remote-only/lgsysumlr2wdhxinj8uw.pdf",
  },
];

(async function insertApplications() {
  try {
    await ApplicationModel.deleteMany();

    const users = await Promise.all([
      UserModel.findOne({ email: "candidateX@gmail.com" }),
      UserModel.findOne({ email: "candidate1@gmail.com" }),
      UserModel.findOne({ email: "candidate2@gmail.com" }),
      UserModel.findOne({ email: "candidate3@gmail.com" }),
    ]);

    for (let i = 0; i < users.length; i++) {
      applications[i].user = [];
      applications[i].user.push(users[i]);
    }

    const inserted = await ApplicationModel.insertMany(applications);
    console.log(
      `seed applications done : ${inserted.length} documents inserted !`
    );
    mongoose.connection
      .close()
      .then((success) => console.log("Remote connection ended"));
  } catch (err) {
    console.error(err);
    mongoose.connection
      .close()
      .then((success) => console.log("Remote connection ended"));
  }
})(); //What a closure !
