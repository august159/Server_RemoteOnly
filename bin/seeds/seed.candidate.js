const mongoose = require("mongoose");
require("dotenv").config();
require("../../config/dbConnection"); //Path to db config aka MongoDB
const UserModel = require("./../../models/User"); // Path to Model
const bcrypt = require("bcrypt");

//* Define data sample
const candidates = [
  {
    email: "candidate1@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    firstName: "Maurice",
    lastName: "MOSS",
    role: "candidate",
    phone: "0612345678",
    linkedIn: "https://www.linkedin.com/in/moss/",
    gitHub: "https://github.com/moss",
    otherWebsite: "www.moss.com",
    additionalInfo: "IT specialist",
    avatar:
      "https://res.cloudinary.com/ago59/image/upload/v1616831099/remote-only/moss_jodcad.jpg",
  },
  {
    email: "candidate2@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    firstName: "Jen",
    lastName: "BARBER",
    role: "candidate",
    phone: "0687654321",
    linkedIn: "https://www.linkedin.com/in/jen/",
    additionalInfo: "Manager",
    avatar:
      "https://res.cloudinary.com/ago59/image/upload/v1616831092/remote-only/Jen_rdf12o.jpg",
  },
  {
    email: "candidate3@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    firstName: "Douglas",
    lastName: "REYNHOLM",
    role: "candidate",
    phone: "0622334455",
    linkedIn: "https://www.linkedin.com/in/dreynholm/",
    additionalInfo: "CEO bitch",
    avatar:
      "https://res.cloudinary.com/ago59/image/upload/v1616831084/remote-only/Douglas_mdropc.jpg",
  },
];

(async function insertUsers() {
  try {
    await UserModel.deleteMany();
    const inserted = await UserModel.insertMany(candidates);
    console.log(
      `seed candidates done : ${inserted.length} documents inserted !`
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
})();
