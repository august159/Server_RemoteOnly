const mongoose = require("mongoose");
require("dotenv").config();
require("./../../config/dbConnection"); //Path to db config aka MongoDB
const CompanyModel = require("./../../models/Company");
const UserModel = require("./../../models/User"); // Path to a linked model

//* Define data sample
const companies = [
  {
    name: "Payfit",
    logo:"https://res.cloudinary.com/ago59/image/upload/v1616853771/remote-only/payfit_aguyg6.png",
    city: "Paris",
    website: "payfit.com",
    industry: "Services aux entreprises",
    size: 200,
    desciption:"PayFit simplifie la gestion des salaires et les processus RH pour les PME. Nous avons construit une solution SaaS rapide, intuitive et automatisée pour aider les propriétaires d'entreprises et les professionnels des RH à gagner du temps et de l'argent, leur permettant ainsi de se recentrer sur ce qui compte vraiment : leurs employés. Grâce à PayFit, les employés disposent d'un accès dédié à leurs fiches de paie et sont en mesure de gérer efficacement leurs demandes de congés et de dépenses. Pour construire une telle solution, nous avons créé notre propre langage de programmation : JetLang. Grâce à JetLang, nous avons pu coder le Code du travail et les conventions collectives, et aujourd'hui nous continuons à ajouter de nouvelles fonctionnalités.Nous nous sommes donné pour mission d'accompagner la transformation digitale de la gestion des RH grâce à notre gamme toujours plus large de fonctionnalités et de services produits. Nous avons une forte présence en France depuis 2015 et nous nous sommes rapidement développés en Allemagne, en Espagne, au Royaume-Uni et plus récemment en Italie. Plus de 5000 entreprises telles que Station F, Biocoop ou Bagel Corner pour ne citer qu'elles nous font déjà confiance. Plus de 500 PayFiters ont déjà rejoint l'aventure et nous avons levé 95M€ pour continuer à nous développer.",
  },
  {
    name: "October",
    logo:
      "https://res.cloudinary.com/ago59/image/upload/v1616853765/remote-only/october_pfreqw.png",
    city: "Paris",
    website: "october.eu",
    industry: "Finance",
    size: 90,
    desciption:"Chez October, nous réinventons le financement des petites entreprises. Nous rendons les prêts faciles, intelligents et rapides, en créant une plateforme connectant directement les entreprises et les prêteurs, offrant des taux et des rendements compétitifs des deux côtés. October a été fondé en 2014. Depuis, nous avons levé plus de 50 millions d'euros et prêté 540 euros à plus de 1300 entreprises en France, en Italie, en Espagne, aux Pays-Bas et en Allemagne. Nous sommes aujourd'hui une équipe de 87 personnes, réparties dans 5 bureaux européens (Paris, Madrid, Milan, Amsterdam et Munich).  Nous sommes fiers d'avoir été inclus dans le NEXT40 et de contribuer aux ambitions de la FrenchTech et de la France : créer des leaders Tech de classe mondiale.",
  },
  {
    name: "Dataiku",
    logo:"https://res.cloudinary.com/ago59/image/upload/v1616853758/remote-only/dataiku_aahfjh.png",
    city: "New York",
    website: "dataiku.com",
    industry: "Data Science & Machine Learning",
    size: 500,
    desciption:"Dataiku permet aux entreprises de créer de la valeur avec leurs données d'une manière centrée sur l'humain, tout en brisant les silos et en encourageant la collaboration. L'une des caractéristiques les plus uniques de notre produit, Data Science Studio (DSS), est l'étendue de son champ d'application et le fait qu'il s'adresse à la fois aux utilisateurs techniques et non techniques. Grâce au DSS, nous voulons donner aux gens les moyens d'agir par le biais des données et démocratiser la science des données.",
  },
  {
      name: "Agicap",
      logo:"https://s3.amazonaws.com/appforest_uf/f1584832864541x639966235207643000/agicap.png",
      city: "Lyon",
      website: "agicap.com",
      industry: "SaaS / Cloud Services",
      size: 500,
      desciption:"La gestion de trésorerie est un casse-tête pour les dirigeants de petites et moyennes entreprises ! C'est pourquoi ils ont créé Agicap, LA solution de référence en France qui révolutionne la façon de suivre et prévoir l'évolution de trésorerie de son entreprise. Créée en 2016 par 3 entrepreneurs lyonnais, Agicap développe et commercialise depuis 2018 son outil en ligne (saas) de gestion et de prévision de trésorerie. 75 % des dirigeants de PME déclarent manquer de visibilité sur leur trésorerie, alors même que ce sujet est dans le top 3 de leurs préoccupations quotidiennes.",
    },
    {
      name: "BlaBlaCar",
      logo:"https://pbs.twimg.com/profile_images/958200913004548096/8TVMrzAE_400x400.jpg",
      city: "Paris",
      website: "blablacar.com",
      industry: "Collaborative Economy, Mobile Apps, Mobilit",
      size: 500,
      desciption: "BlaBlaCar is the world’s leading long-distance carpooling platform – a global, trusted community of 89 million members in 22 countries. BlaBlaCar is creating an entirely new, people-powered, travel network that connects people looking to travel long distances with drivers heading the same way, so they can travel together and share the cost. With the recent integration of a coach bus network, and a commuter service for short-distance carpooling, BlaBlaCar aims to become the go-to marketplace for shared mobility.",
    },
    {
      name: "Botify",
      logo: "https://media-exp1.licdn.com/dms/image/C4D0BAQHgwUch43UKKA/company-logo_200_200/0/1579822106102?e=1625702400&v=beta&t=4CLNotDyaOxEImyqoiw4F35FwV6xp9YkQW4FhAftqtc",
      city: "New York",
      website: "botify.com",
      industry: "SaaS",
      size: 500,
      desciption:"Founded in 2012, Botify created the new standard methodology and platform to drive transparency and simplicity for modern enterprise SEO. Today, Botify is used by many of the world’s largest enterprises to drive sustainable and profitable outcomes from the organic search channel. ",
    },{
      name: "Frichti",
      logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOYSci9WQgIiK5VD5Vx0WLnRv3l2xQeDfxmowuWmp2gPNIF6o-7Psq-VL41z3quq_JIn0&usqp=CAU",
      city: "Paris",
      website: "frichti.com",
      industry: "FoodTech et Restauration",
      size: 500,
      desciption:"Vous avez dit Frichti ? Ce mot est désormais connu de tous les parisiens. Et ils ont l’ambition (modeste) qu’il accompagne votre quotidien ! Ils en avaient assez des sandwiches au coin de la rue, du frigo vide en rentrant du boulot, et du trou dans le porte-monnaie à force de se ruiner en sushis hors de prix. Alors ils ont voulu changer ces habitudes en proposant une offre diversifiée et abordable : des plats cuisinés maison, des produits frais de saison, ainsi qu'une sélection de restaurants triés sur le volet pour combler toutes les envies. Et tout ça en une seule et même commande !",
    },
];

(async function insertCompanies() {
  try {
    await CompanyModel.deleteMany();
    // Get all recruiters
    const allRecruiters = await UserModel.find({ role: "recruiter" });

    // Attribute 1 recruiter to each company
    for (let i = 0; i < allRecruiters.length; i++) {
      companies[i].users = [];
      companies[i].users.push(allRecruiters[i]._id);
    }
    companies[1].users.push(allRecruiters[2]._id); // Make 1 recruiter part of 2 companies & October company having 2 recruiters

    const inserted = await CompanyModel.insertMany(companies);
    console.log(
      `seed companies done : ${inserted.length} documents inserted !`
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
