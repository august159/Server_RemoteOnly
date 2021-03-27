const mongoose = require("mongoose");
require("dotenv").config();
require("../../config/dbConnection"); //Path to db config aka MongoDB
const UserModel = require("./../../models/User"); // Path to Model
const bcrypt = require("bcrypt");

//* Define data sample
const recruiters = [
  {
    email: "recruiter1@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    firstName: "David",
    lastName: "BRENT",
    role: "recruiter",
    position: "Directeur régional",
    avatar:
      "https://res.cloudinary.com/ago59/image/upload/v1616844218/remote-only/David_Brent_hodpjb.jpg",
  },
  {
    email: "recruiter2@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    firstName: "Gareth",
    lastName: "KEENAN",
    role: "recruiter",
    position: "Responsable commercial",
    avatar:
      "https://res.cloudinary.com/ago59/image/upload/v1616844222/remote-only/Gareth_keenan_opkwth.jpg",
  },
  {
    email: "recruiter3@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    firstName: "Dawn",
    lastName: "TINSLEY",
    role: "recruiter",
    position: "Office manager",
    avatar:
      "https://res.cloudinary.com/ago59/image/upload/v1616844220/remote-only/Dawn_Tinsley_einnsz.jpg",
  },
];

(async function insertUsers() {
  try {
    const inserted = await UserModel.insertMany(recruiters);
    console.log(
      `seed recruiters done : ${inserted.length} documents inserted !`
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
