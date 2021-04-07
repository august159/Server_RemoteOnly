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
  {
    email: "candidate4@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    firstName: "Roy",
    lastName: "TRENNEMAN",
    role: "candidate",
    phone: "0622331218",
    linkedIn: "https://www.linkedin.com/in/roy",
    additionalInfo:
      "Roy Trenneman (born c. 1979) is a support technician in the IT Department of Reynholm Industries. Roy is a lazy, laid back yet notoriously unlucky Irishman whose work day consists of playing video games, indulging himself on sugar and crisps, ove this point by posting an ad on an online dating website making it out that he was a horrible, aggressive individual. He subsequently received a reply and went on to go out on a date with the woman to prove his point. Later on in the year, Jen discovered the red door leading to the secret room in which Richmond had been working in for four years. When she discovered the horrible conditions that Roy and Moss had put him under, she campaigned to have him promoted back to his original job. Roy, when he first found out about it after being rescued from under a desk, was very much against the idea of being around Richmond again, however, Jen continued to bring Richmond out of isolation and she discussed the idea with Denholm, but although Denholm did not want Richmond back as Second-in-Command",
    avatar:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.charactour.com%2Fhub%2Fcharacters%2Fview%2FRoy-Trenneman.The-IT-Crowd&psig=AOvVaw0lu0kHCJ12hp2FCSmman1U&ust=1617442796623000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjZyYyi3-8CFQAAAAAdAAAAABAI",
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
