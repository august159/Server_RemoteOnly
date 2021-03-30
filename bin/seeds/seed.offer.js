const mongoose = require("mongoose");
require("dotenv").config();
require("./../../config/dbConnection"); //Path to db config aka MongoDB
const OfferModel = require("./../../models/Offer");
const CompanyModel = require("./../../models/Company"); // Path to a linked model

//* Define data sample
const offers = [
  {
    title: "Senior support engineer",
    salary: "50000",
    contractType: "CDI",
    fieldWork: "Produit",
    jobDescription:
      "Dataiku est à la recherche d'un ingénieur de support technique expérimenté pour rejoindre son équipe de support mondial en pleine croissance. Basé dans une Europe élargie, vous soutiendrez les déploiements de sa plateforme d'IA d'entreprise (Dataiku DSS) auprès d'une base de clients diversifiée et en constante augmentation.  Le poste sera basé à Paris, ou à distance (fuseau horaire européen). En tant qu'ingénieur de support technique de haut niveau, vous aurez l'occasion de mettre en valeur vos compétences en tant que communicateur poli et ressource technique de confiance, tout en étant capable de faire preuve d'un excellent jugement en matière de priorisation et de multitâche. En outre, nous recherchons une personne qui aime apprendre de nouvelles technologies de pointe et se salir les mains pour résoudre des problèmes techniques difficiles, et qui est naturellement motivée pour devenir un expert dans ce domaine. Dans ce rôle, vous aiderez l'équipe à.. : > Fournir des solutions techniques et répondre aux demandes techniques des clients par le biais d'une variété de différents canaux de communication. > Gérer et résoudre les problèmes d'assistance présentant un haut degré de complexité technique > Agir en tant que liaison entre les clients et les autres équipes de Dataiku (telles que Customer Success, Engineering, Data Science, etc.) pour aider à fournir une résolution rapide et efficace des problèmes ou des questions qui ont été soulevés par nos utilisateurs finaux. > Améliorer l'efficacité en documentant et en standardisant les processus d'assistance, ainsi qu'en capturant ou en développant les meilleures pratiques. > Développer des outils qui aideront à diagnostiquer, résoudre et trier les problèmes difficiles à résoudre. > Documenter les connaissances sous la forme de notes d'incident, d'articles techniques et de contributions aux bases de connaissances ou aux forums dans des domaines d'expertise spécifiques > Assurer le suivi des engagements pris envers les clients dans les délais impartis, en conciliant efficacement les deux processus avec la nécessité de s'adapter à la situation, tout en relayant les leçons apprises et le retour d'information en interne à nos autres équipes techniques et en contact avec les clients.",
    profileDescription:
      "Notre candidat idéal est une personne autonome qui est passionnée par le fait de faire travailler ensemble les technologies de big data et de science des données pour résoudre des problèmes commerciaux, et qui aidera efficacement les clients à résoudre leurs problèmes techniques avec Dataiku DSS. Si vous souhaitez rester à la pointe du big data et de l'IA tout en ayant l'opportunité de rejoindre une startup en pleine croissance alors que nous cherchons à étendre notre opération de support au niveau mondial, ce poste vous conviendra parfaitement. Vous pourriez être un bon candidat si vous avez : > Une forte compétence dans la résolution de problèmes techniques, avec une expérience démontrée de travail avec l'analyse avancée des journaux et d'autres techniques de débogage. > Vous maîtrisez les systèmes d'exploitation basés sur Unix. > Vous êtes à l'aise dans l'utilisation et la lecture du code client > Expérience de travail avec au moins un type de base de données relationnelle et SQL. > Du cran face aux problèmes techniques - vous ne vous reposez pas avant d'avoir compris ce qui se passe et pourquoi les choses ne fonctionnent pas. > Excellentes compétences en matière de résolution de problèmes et d'analyse, avec une aptitude à apprendre de nouvelles technologies.> Excellentes aptitudes à la communication et capacité d'interagir avec des personnes tant techniques que non techniques, selon les besoins. > Capacité à être autonome, ingénieux et proactif, tout en restant orienté processus et en ayant l'esprit d'équipe. Points bonus pour tous ces éléments : > Au moins 4 à 6 ans d'expérience dans un rôle technique ou d'ingénierie en contact avec le client, idéalement dans un logiciel/produit complexe et en évolution rapide. > Expérience de travail avec une multitude de technologies d'analyse et de big data (telles que Hadoop, Spark, Docker/K8s et diverses autres technologies de base de données ou de BI). > Expérience pratique avec Python et/ou R > Connaissance pratique de diverses technologies de cloud computing (AWS, Azure, GCP, etc.) > Expérience des systèmes d'authentification et d'autorisation tels que LDAP, SAML et Kerberos.",
    recruitmentProcess: "Un entretien opréationnel + un entretien RH",
    startingDate: "2021-06-01",
    isActive: true,
  },
  {
    title: "Global Product Marketing Intern (6 MOIS)",
    salary: "25000",
    contractType: "Stage",
    fieldWork: "Sales et Marketing",
    jobDescription:
      "Votre rôle 💡 En tant que stagiaire en marketing produit, vous jouerez un rôle clé en soutenant l'équipe mondiale de marketing produit dans ses tâches quotidiennes. Vous serez directement rattaché à l'un des responsables du marketing produit basé à Paris, en France. C'est l'occasion pour vous d'avoir un impact important dans une startup en pleine croissance qui se développe rapidement en France, au Royaume-Uni, en Allemagne, en Espagne et en Italie. Vous serez amené à interagir avec les équipes suivantes : Ventes, Marketing, Produit, Succès Client. Vos premières missions ⭐ - Market & Competitive Intelligence : Aider à synthétiser les informations provenant de sources multiples pour avoir une bonne compréhension de la dynamique du marché, des acheteurs et des concurrents dans les pays où nous opérons. - Lancements de produits : Travaillez avec une équipe interfonctionnelle de chefs de produit, de maîtres JetLang, de scientifiques des données, d'ingénieurs, de spécialistes du marketing et de vendeurs pour construire et lancer des produits dans tous les pays - de la validation initiale du marché, du positionnement et du message, à la stratégie de mise sur le marché, à l'exécution du lancement et au débriefing du lancement. - Mise en œuvre sur le terrain : Produire des supports efficaces pour le terrain, notamment des démonstrations de vente, des fiches techniques, des études de cas, des formations et des FAQ, afin de faciliter la compréhension des offres de produits, des acheteurs et du positionnement clé. - Évangélisation du produit : Soyez un évangéliste pour les produits PayFit. Mettez en avant leur valeur à la fois en interne (keynotes) et en externe (site web). - Gestion de la communauté des utilisateurs : Aidez à rapprocher notre équipe produit des clients en gérant notre communauté PayFit.",
    profileDescription:
      "Ce poste a été conçu pour vous si ... 🦄  - Vous êtes titulaire d'un master en commerce, marketing ou ingénierie, - Vous postulez pour votre stage de dernière année et vous êtes disponible pour un stage de 6 mois débutant dès que possible. - Une expérience préalable en marketing, marketing digital, startup, ou conseil est un plus. Nous sommes faits pour travailler ensemble si... 👪 - Vous avez un réel esprit d'équipe et souhaitez construire une grande réussite avec nous, - Vous parlez couramment le français et l'anglais et vous souhaitez travailler dans un environnement international et dynamique. Une autre langue est un plus. - Vous avez de solides compétences interpersonnelles et de communication, - Vous avez un esprit d'analyse et de résolution de problèmes. - Vous souhaitez apprendre, vous améliorer et prendre des responsabilités. - Vous avez une attitude volontaire et un comportement positif et collaboratif. Ce que nous offrons ❤️ - Un environnement de travail étonnant, conçu pour la bienveillance et l'épanouissement, - Un package de rémunération attractif, - Une équipe internationale et dynamique - Une politique de travail depuis n'importe où - Un abonnement à Gymlib avec un tarif préférentiel, - des tickets restaurant (Swile) - Une assurance maladie Henner (couverte à 60% par PayFit), - Les MacBooks sont notre standard, mais nous vous fournirons tout l'équipement nécessaire pour vous aider à accomplir votre travail !",
    recruitmentProcess:
      "1️⃣Entretien en visioconférence avec Olivia Lauret, Senior Product Marketing Manager 🌍 (30 mins) : Valeur ajoutée, réalisations clés, motivations, adéquation avec le poste 2️⃣Entretien en visioconférence avec Olivia Lauret sur une étude de cas 🌍(1 hr) 3️⃣Entretien en visioconférence avec Yannick, Global Product Marketing Director (30 min) 4️⃣Meet the team 🌍 : Clémentine Van Dijk, Emmanuelle Fasciale, Héloise Beauchesne (30 min).",
    startingDate: "2021-05-02",
    isActive: true,
  },
  {
    title: "Back-end Developer",
    salary: "75000",
    contractType: "CDI",
    fieldWork: "Tech",
    profileDescription:
      "- Au moins 2 ans d'expérience professionnelle en développement - Vous maîtrisez JavaScript et avez déjà utilisé Node.js. - Vous avez déjà utilisé GitHub, Gitlab ou Bitbucket. - Vous avez une connaissance des bonnes pratiques en matière de qualité du code (tests, déploiement continu, ...). - Vous parlez facilement l'anglais.",
    jobDescription:
      "Nous pensons que réinventer le financement est un énorme défi technologique, c'est pourquoi nous avons construit October comme une startup centrée sur la technologie. Aujourd'hui, les équipes Tech, Data et Product (20 personnes) travaillent à construire la meilleure expérience de financement jamais réalisée, en étroite collaboration avec l'entreprise. L'équipe s'agrandit rapidement et nous souhaitons renforcer constamment nos équipes back et front end.  Nous aimons JavaScript chez October. C'est pourquoi chaque partie de notre pile est basée sur JS : nous utilisons Node.js et MongoDB sur le back-end, EmberJS sur le front-end et React Native sur le mobile. La plateforme fonctionne sur Heroku et AWS. Vous pouvez jeter un coup d'œil à l'ensemble de notre pile sur StackShare. Chez October, nous croyons à l'appropriation et au mentorat. La façon dont nous travaillons impliquera profondément chaque développeur dès le premier jour. # Au jour le jour : - Rédiger des spécifications techniques pour les fonctionnalités définies avec l'équipe produit - Écrire du code Node.js propre avec les tests associés - Aider à construire une infrastructure évolutive - Revoir le code des autres développeurs => Nous ne croyons pas aux CV et aux lettres de motivation. Envoyez-nous simplement un lien vers votre profil LinkedIn ou GitHub.",
    recruitmentProcess:
      "1) Tout d'abord, un appel de présentation de 20 minutes avec notre CTO 2) Un projet maison en JavaScript (vous avez une semaine pour le réaliser), 3) Ensuite, un entretien d'une heure avec le CTO et un développeur principal, 4) Enfin, un entretien d'une heure avec notre responsable des opérations internes (avec un exercice de modélisation des données) et un autre développeur.",
    startingDate: "2021-05-02",
    isActive: true,
  },
];

(async function insertOffers() {
  try {
    await OfferModel.deleteMany();

    const companies = await Promise.all([
      CompanyModel.findOne({ name: "Dataiku" }),
      CompanyModel.findOne({ name: "Payfit" }),
      CompanyModel.findOne({ name: "October" }),
    ]);

    for (let i = 0; i < companies.length; i++) {
      offers[i].company = companies[i]._id;
    }

    const insertedOffers = await OfferModel.insertMany(offers);
    console.log(
      `seed offers done : ${insertedOffers.length} documents inserted !`
    );
    mongoose.connection
      .close()
      .then((success) => console.log("Remote connection ended"));
  } catch (err) {
    console.error(err);
    mongoose.connection
      .close()
      .then((success) => console.log("Remote connexion ended"));
  }
})(); //What a closure !
