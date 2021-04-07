const mongoose = require("mongoose");
require("dotenv").config();
require("../../config/dbConnection"); //Path to db config aka MongoDB
const ApplicationModel = require("./../../models/Application");
const OfferModel = require("./../../models/Offer");

//* Define data sample
const applications = [
  {
    //Application not logged in
    firstName: "Roy",
    lastName: "TRENNEMAN",
    email: "candidate4@gmail.com",
    phone: "077766554433",
    linkedIn: "https://www.linkedin.com/in/roy-trenneman/",
    gitHub: "https://github.com/rtrenneman",
    additionalInfo:
      "Je suis un technicien IT irlandais et tout va bien pour moi, je vais mettre un lorem...Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quae provident sequi quibusdam, cupiditate numquam ipsa consectetur deserunt libero et voluptatum aperiam corporis amet culpa sint quisquam nostrum enim vel! Beatae praesentium nihil laudantium in repellendus culpa eius asperiores recusandae tenetur quibusdam? Iure similique aperiam, eos corporis facilis accusantium, delectus aspernatur laborum earum pariatur quasi placeat autem et qui illo.",

    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838612/remote-only/kmsqv7emx7fzxdehtyj4.pdf",
  },
  {
    //Application not logged in
    firstName: "Roy",
    lastName: "TRENNEMAN",
    email: "candidate4@gmail.com",
    phone: "077766554433",
    linkedIn: "https://www.linkedin.com/in/roy-trenneman/",
    gitHub: "https://github.com/rtrenneman",
    additionalInfo:
      "Je suis un technicien IT irlandais et tout va bien pour moi, je vais mettre un lorem...Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quae provident sequi quibusdam, cupiditate numquam ipsa consectetur deserunt libero et voluptatum aperiam corporis amet culpa sint quisquam nostrum enim vel! Beatae praesentium nihil laudantium in repellendus culpa eius asperiores recusandae tenetur quibusdam? Iure similique aperiam, eos corporis facilis accusantium, delectus aspernatur laborum earum pariatur quasi placeat autem et qui illo.",

    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838612/remote-only/kmsqv7emx7fzxdehtyj4.pdf",
  },
  {
    //Application not logged in
    firstName: "Roy",
    lastName: "TRENNEMAN",
    email: "candidate4@gmail.com",
    phone: "077766554433",
    linkedIn: "https://www.linkedin.com/in/roy-trenneman/",
    gitHub: "https://github.com/rtrenneman",
    additionalInfo:
      "Je suis un technicien IT irlandais et tout va bien pour moi, je vais mettre un lorem...Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quae provident sequi quibusdam, cupiditate numquam ipsa consectetur deserunt libero et voluptatum aperiam corporis amet culpa sint quisquam nostrum enim vel! Beatae praesentium nihil laudantium in repellendus culpa eius asperiores recusandae tenetur quibusdam? Iure similique aperiam, eos corporis facilis accusantium, delectus aspernatur laborum earum pariatur quasi placeat autem et qui illo.",

    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838612/remote-only/kmsqv7emx7fzxdehtyj4.pdf",
  },
  {
    email: "candidat1@gmail.com",
    firstName: "Maurice",
    lastName: "MOSS",
    phone: "0612345678",
    linkedIn: "https://www.linkedin.com/in/maurice-moss-b25a9443/",
    gitHub: "https://github.com/moss",
    otherWebsite: "www.moss.com",
    additionalInfo:
      "Je suis un spécialiste IT en charge de la maintenance à Renholm Industries. Avec moi, tout roule sur des roulettes. Je suis une personne de confiance, embauchez-moi",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838934/remote-only/rw8owjcjxz59zmbtnl7k.pdf",
  },
  {
    email: "candidat1@gmail.com",
    firstName: "Maurice",
    lastName: "MOSS",
    phone: "0612345678",
    linkedIn: "https://www.linkedin.com/in/maurice-moss-b25a9443/",
    gitHub: "https://github.com/moss",
    otherWebsite: "www.moss.com",
    additionalInfo:
      "Je suis un spécialiste IT en charge de la maintenance à Renholm Industries. Avec moi, tout roule sur des roulettes. Je suis une personne de confiance, embauchez-moi",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838934/remote-only/rw8owjcjxz59zmbtnl7k.pdf",
  },
  {
    email: "candidat1@gmail.com",
    firstName: "Maurice",
    lastName: "MOSS",
    phone: "0612345678",
    linkedIn: "https://www.linkedin.com/in/maurice-moss-b25a9443/",
    gitHub: "https://github.com/moss",
    otherWebsite: "www.moss.com",
    additionalInfo:
      "Je suis un spécialiste IT en charge de la maintenance à Renholm Industries. Avec moi, tout roule sur des roulettes. Je suis une personne de confiance, embauchez-moi",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838934/remote-only/rw8owjcjxz59zmbtnl7k.pdf",
  },
  {
    email: "candidat1@gmail.com",
    firstName: "Maurice",
    lastName: "MOSS",
    phone: "0612345678",
    linkedIn: "https://www.linkedin.com/in/maurice-moss-b25a9443/",
    gitHub: "https://github.com/moss",
    otherWebsite: "www.moss.com",
    additionalInfo:
      "Je suis un spécialiste IT en charge de la maintenance à Renholm Industries. Avec moi, tout roule sur des roulettes. Je suis une personne de confiance, embauchez-moi",
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
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616839173/remote-only/iyzngidtb2elwc5xzt4l.pdf",
  },
  {
    email: "candidat2@gmail.com",
    firstName: "Jen",
    lastName: "BARBER",
    role: "candidate",
    phone: "0687654321",
    linkedIn: "https://www.linkedin.com/in/jen/",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616839173/remote-only/iyzngidtb2elwc5xzt4l.pdf",
  },
  {
    email: "candidat2@gmail.com",
    firstName: "Jen",
    lastName: "BARBER",
    role: "candidate",
    phone: "0687654321",
    linkedIn: "https://www.linkedin.com/in/jen/",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616839173/remote-only/iyzngidtb2elwc5xzt4l.pdf",
  },
  {
    email: "candidat2@gmail.com",
    firstName: "Jen",
    lastName: "BARBER",
    role: "candidate",
    phone: "0687654321",
    linkedIn: "https://www.linkedin.com/in/jen/",
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
    additionalInfo:
      "Je suis PDG, je ne me trompe jamais. Les femmes se jettent à mon coup.",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616839874/remote-only/lgsysumlr2wdhxinj8uw.pdf",
  },
  {
    email: "candidat3@gmail.com",
    firstName: "Douglas",
    lastName: "REYNHOLM",
    role: "candidate",
    phone: "0622334455",
    linkedIn: "https://www.linkedin.com/in/dreynholm/",
    additionalInfo:
      "Je suis PDG, je ne me trompe jamais. Les femmes se jettent à mon coup.",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616839874/remote-only/lgsysumlr2wdhxinj8uw.pdf",
  },
  {
    email: "candidat3@gmail.com",
    firstName: "Douglas",
    lastName: "REYNHOLM",
    role: "candidate",
    phone: "0622334455",
    linkedIn: "https://www.linkedin.com/in/dreynholm/",
    additionalInfo:
      "Je suis PDG, je ne me trompe jamais. Les femmes se jettent à mon coup.",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616839874/remote-only/lgsysumlr2wdhxinj8uw.pdf",
  },
  {
    email: "candidat3@gmail.com",
    firstName: "Douglas",
    lastName: "REYNHOLM",
    role: "candidate",
    phone: "0622334455",
    linkedIn: "https://www.linkedin.com/in/dreynholm/",
    additionalInfo:
      "Je suis PDG, je ne me trompe jamais. Les femmes se jettent à mon coup.",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616839874/remote-only/lgsysumlr2wdhxinj8uw.pdf",
  },
  {
    //Application not logged in
    firstName: "Yassin",
    lastName: "ABOUZAID",
    email: "abouzaid@tutanota.com",
    phone: "0777661254",
    linkedIn: "https://www.linkedin.com/in/yassineabouzaid/",
    gitHub: "https://github.com/ysabzd",
    additionalInfo:
      "Je suis un développeur en formation à Ironhack. React n'a plus de secret pour moi, la preuve... Appelez-moi, je suis votre candidat idéal",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838934/remote-only/rw8owjcjxz59zmbtnl7k.pdf",
  },
  {
    //Application not logged in
    firstName: "Yassin",
    lastName: "ABOUZAID",
    email: "abouzaid@tutanota.com",
    phone: "0777661254",
    linkedIn: "https://www.linkedin.com/in/yassineabouzaid/",
    gitHub: "https://github.com/ysabzd",
    additionalInfo:
      "Je suis un développeur en formation à Ironhack. React n'a plus de secret pour moi, la preuve... Appelez-moi, je suis votre candidat idéal",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838934/remote-only/rw8owjcjxz59zmbtnl7k.pdf",
  },
  {
    //Application not logged in
    firstName: "Yassin",
    lastName: "ABOUZAID",
    email: "abouzaid@tutanota.com",
    phone: "0777661254",
    linkedIn: "https://www.linkedin.com/in/yassineabouzaid/",
    gitHub: "https://github.com/ysabzd",
    additionalInfo:
      "Je suis un développeur en formation à Ironhack. React n'a plus de secret pour moi, la preuve... Appelez-moi, je suis votre candidat idéal",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838934/remote-only/rw8owjcjxz59zmbtnl7k.pdf",
  },
  {
    //Application not logged in
    firstName: "Adrien",
    lastName: "MALLIE",
    email: "ad.mallie@gmail.com",
    phone: "077766555677",
    linkedIn: "https://www.linkedin.com/in/roy-trenneman/",
    gitHub: "https://github.com/adgranmous",
    additionalInfo:
      "Je suis un développeur en formation à Ironhack. React n'a plus de secret pour moi, la preuve... Appelez-moi, je suis votre candidat idéal",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838612/remote-only/kmsqv7emx7fzxdehtyj4.pdf",
  },
  {
    //Application not logged in
    firstName: "Adrien",
    lastName: "MALLIE",
    email: "ad.mallie@gmail.com",
    phone: "077766555677",
    linkedIn: "https://www.linkedin.com/in/roy-trenneman/",
    gitHub: "https://github.com/adgranmous",
    additionalInfo:
      "Je suis un développeur en formation à Ironhack. React n'a plus de secret pour moi, la preuve... Appelez-moi, je suis votre candidat idéal",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838612/remote-only/kmsqv7emx7fzxdehtyj4.pdf",
  },
  {
    //Application not logged in
    firstName: "Adrien",
    lastName: "MALLIE",
    email: "ad.mallie@gmail.com",
    phone: "077766555677",
    linkedIn: "https://www.linkedin.com/in/roy-trenneman/",
    gitHub: "https://github.com/adgranmous",
    additionalInfo:
      "Je suis un développeur en formation à Ironhack. React n'a plus de secret pour moi, la preuve... Appelez-moi, je suis votre candidat idéal",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838612/remote-only/kmsqv7emx7fzxdehtyj4.pdf",
  },
  {
    //Application not logged in
    firstName: "Adrien",
    lastName: "MALLIE",
    email: "ad.mallie@gmail.com",
    phone: "077766555677",
    linkedIn: "https://www.linkedin.com/in/roy-trenneman/",
    gitHub: "https://github.com/adgranmous",
    additionalInfo:
      "Je suis un développeur en formation à Ironhack. React n'a plus de secret pour moi, la preuve... Appelez-moi, je suis votre candidat idéal",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838612/remote-only/kmsqv7emx7fzxdehtyj4.pdf",
  },
  {
    //Application not logged in
    firstName: "Augustin",
    lastName: "LEMAN",
    email: "augustin.mallie@gmail.com",
    phone: "0734567634",
    linkedIn: "https://www.linkedin.com/in/augustinleman/",
    gitHub: "https://github.com/august159",
    additionalInfo:
      "Je suis un développeur en formation à Ironhack. React n'a plus de secret pour moi, la preuve... Appelez-moi, je suis votre candidat idéal",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838612/remote-only/kmsqv7emx7fzxdehtyj4.pdf",
  },
  {
    //Application not logged in
    firstName: "Augustin",
    lastName: "LEMAN",
    email: "augustin.mallie@gmail.com",
    phone: "0734567634",
    linkedIn: "https://www.linkedin.com/in/augustinleman/",
    gitHub: "https://github.com/august159",
    additionalInfo:
      "Je suis un développeur en formation à Ironhack. React n'a plus de secret pour moi, la preuve... Appelez-moi, je suis votre candidat idéal",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838612/remote-only/kmsqv7emx7fzxdehtyj4.pdf",
  },
  {
    //Application not logged in
    firstName: "Augustin",
    lastName: "LEMAN",
    email: "augustin.mallie@gmail.com",
    phone: "0734567634",
    linkedIn: "https://www.linkedin.com/in/augustinleman/",
    gitHub: "https://github.com/august159",
    additionalInfo:
      "Je suis un développeur en formation à Ironhack. React n'a plus de secret pour moi, la preuve... Appelez-moi, je suis votre candidat idéal",
    resume:
      "https://res.cloudinary.com/ago59/image/upload/v1616838612/remote-only/kmsqv7emx7fzxdehtyj4.pdf",
  },
];

//* Link offer in applications
(async function insertApplication() {
  try {
    await ApplicationModel.deleteMany();

    const allOffers = await OfferModel.find();

    applications[0].offer = allOffers[1]._id; // Roy
    applications[1].offer = allOffers[3]._id; // Roy
    applications[2].offer = allOffers[10]._id; // Roy

    applications[3].offer = allOffers[1]._id; // Moss
    applications[4].offer = allOffers[2]._id; // Moss
    applications[5].offer = allOffers[9]._id; // Moss
    applications[6].offer = allOffers[5]._id; // Moss

    applications[7].offer = allOffers[0]._id; // Jen
    applications[8].offer = allOffers[2]._id; // Jen
    applications[9].offer = allOffers[8]._id; // Jen
    applications[10].offer = allOffers[6]._id; // Jen

    applications[11].offer = allOffers[0]._id; // Douglas
    applications[12].offer = allOffers[3]._id; // Douglas
    applications[13].offer = allOffers[7]._id; // Douglas
    applications[14].offer = allOffers[8]._id; // Douglas

    applications[15].offer = allOffers[1]._id; // Yassin
    applications[16].offer = allOffers[6]._id; // Yassin
    applications[17].offer = allOffers[7]._id; // Yassin

    applications[18].offer = allOffers[1]._id; // Adrien
    applications[19].offer = allOffers[3]._id; // Adrien
    applications[20].offer = allOffers[5]._id; // Adrien
    applications[21].offer = allOffers[9]._id; // Adrien

    applications[22].offer = allOffers[1]._id; // Augustin
    applications[23].offer = allOffers[4]._id; // Augustin
    applications[24].offer = allOffers[10]._id; // Augustin

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
