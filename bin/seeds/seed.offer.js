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
  {
    title: "Développeur Fullstack junior",
    salary: "45000",
    contractType: "CDI",
    fieldWork: "Tech",
    jobDescription:
      "Intégré-e à l’équipe Tech Agicap et en collaboration avec l’ensemble des départements, tu auras un rôle clé dans la construction de l’équipe, tu seras en charge de : Developper le projet des intégrations des données externes chez Agicap. Ce sujet est au cœur de la solution Agicap : c’est en effet sur cette base que peuvent être construites de manière fiable et automatisée les projections de trésorerie pour nos 4000 clients et utilisateurs en France et en Allemagne !  Il existe des centaines de sources de données différentes que nous pouvons intégrer, les défis sont donc nombreux. Chaque source de donnée est différente, il est nécessaire d’être capable de s’adapter à ces spécificités, tout en pensant à développer une solution “générique” nous permettant de gagner du temps sur chaque nouvelle intégration.  • Construire et structurer le processus d’intégration de sources de données   • Participer à la maintenance des intégrations de données et travailler l’amélioration continue.  • Mettre en place les procédures de qualités afin de diminuer les risques de bugs  • Tu seras force de proposition et capable de challenger l’équipe sur de nouvelles solutions technologiques",
    profileDescription:
      "Tu as une première expérience en tant que développeur backend dans un langage orienté objet (.NET, JAVA etc.) • Tu es familier avec les concept d’architecture logiciel et de design pattern • Tu as déjà travaillé dans le développement web et idéalement dans le SaaS • Idealement tu as des connaissances de base en front end (Html, Css, Javascript, Angular) • Tu es débrouillard-e, humble et l’esprit startup t’attire  • Tu es en veille permanente sur les nouveaux outils et nouvelles technos • Tu as l’esprit d’équipe et l’envie de partager tes connaissances",
    recruitmentProcess:
      "Entretien téléphonique de motivation - Entretien technique avec Benjamin, référent intégration - Entretien final avec un Engineering Manager",
    startingDate: "2021-06-01",
    isActive: true,
  },
  {
    title: "Product Designer",
    salary: "45000",
    contractType: "CDI",
    fieldWork: "Produit",
    jobDescription:
      "En tant que Senior Product Designer chez Agicap, ton rôle sera de concevoir des fonctionnalités qui ont pour ambition de résoudre les problèmes de nos utilisateurs. En collaboration avec les équipes produit, tech et marketing, tu seras en charge d  Identifier les besoins utilisateurs et les corréler avec les objectifs business  Améliorer l’expérience utilisateur sur les fonctionnalités déjà existantes Mener de la recherche utilisateur et conceptualiser des features user centric Concevoir des maquettes/prototypes et les tester Vérifier la qualité des fonctionnalités développées Collaborer sur le Design System de l’application Participer à l’amélioration continue de nos process et méthodolologie design et produit",
    profileDescription:
      "Tu auras un rôle clé dans la croissance d’AGICAP, reportant directement à notre Head of Design, Luc. Ce que nous rechercho  Tu as minimum 5 ans d’expérience, dont 3 ans en product design dans la tec  Tu as au moins une expérience notable en Saa  Tu as idéalement une première expérience dans une tech B2B en forte croissance Tu as d’excellentes capacités de conception et de prototypag Tu sais mener de la recherche et du test utilisateu Tu fais preuve de rigueur rédactionnelle et méthodologiqu Tu sais découper un besoin en plusieurs fonctionnalités et réaliser des maquette Tu maitrises des outils comme Figma, Framer, Protopie… Des connaissances sur les langages web seraient un plu Tu sais collaborer au sein d’une équipe multi-fonctionnelle et tu as l’envie de partager tes connaissance Tu es à l’aise sur les méthodes agile Tu as un portfolio qui montre ton approche de conception centrée utilisateur et les résultats de tes différents travaux, l’équipe design n’attend plus que toi !",
    recruitmentProcess:
      "Entretien téléphonique de motivation avec Camille, Product Recruiter - Entretien avec notre Head of Design, Luc. Présentation d’un projet à l’équipe Product Design. Entretien avec Mael, CPO. Entretien avec Sébastien, notre CEO.",
    startingDate: "2021-07-01",
    isActive: true,
  },
  {
    title: "Product Manager",
    salary: "60000",
    contractType: "CDI",
    fieldWork: "Sales et Marketing",
    jobDescription:
      "Votre rôle 💡 En tant que stagiaire en marketing produit, vous jouerez un rôle clé en soutenant l'équipe mondiale de marketing produit dans ses tâches quotidiennes. Vous serez directement rattaché à l'un des responsables du marketing produit basé à Paris, en France. C'est l'occasion pour vous d'avoir un impact important dans une startup en pleine croissance qui se développe rapidement en France, au Royaume-Uni, en Allemagne, en Espagne et en Italie. Vous serez amené à interagir avec les équipes suivantes : Ventes, Marketing, Produit, Succès Client. Vos premières missions ⭐ - Market & Competitive Intelligence : Aider à synthétiser les informations provenant de sources multiples pour avoir une bonne compréhension de la dynamique du marché, des acheteurs et des concurrents dans les pays où nous opérons. - Lancements de produits : Travaillez avec une équipe interfonctionnelle de chefs de produit, de maîtres JetLang, de scientifiques des données, d'ingénieurs, de spécialistes du marketing et de vendeurs pour construire et lancer des produits dans tous les pays - de la validation initiale du marché, du positionnement et du message, à la stratégie de mise sur le marché, à l'exécution du lancement et au débriefing du lancement. - Mise en œuvre sur le terrain : Produire des supports efficaces pour le terrain, notamment des démonstrations de vente, des fiches techniques, des études de cas, des formations et des FAQ, afin de faciliter la compréhension des offres de produits, des acheteurs et du positionnement clé. - Évangélisation du produit : Soyez un évangéliste pour les produits PayFit. Mettez en avant leur valeur à la fois en interne (keynotes) et en externe (site web). - Gestion de la communauté des utilisateurs : Aidez à rapprocher notre équipe produit des clients en gérant notre communauté PayFit.",
    profileDescription:
      "Ce poste a été conçu pour vous si ... 🦄  - Vous êtes titulaire d'un master en commerce, marketing ou ingénierie, - Vous postulez pour votre stage de dernière année et vous êtes disponible pour un stage de 6 mois débutant dès que possible. - Une expérience préalable en marketing, marketing digital, startup, ou conseil est un plus. Nous sommes faits pour travailler ensemble si... 👪 - Vous avez un réel esprit d'équipe et souhaitez construire une grande réussite avec nous, - Vous parlez couramment le français et l'anglais et vous souhaitez travailler dans un environnement international et dynamique. Une autre langue est un plus. - Vous avez de solides compétences interpersonnelles et de communication, - Vous avez un esprit d'analyse et de résolution de problèmes. - Vous souhaitez apprendre, vous améliorer et prendre des responsabilités. - Vous avez une attitude volontaire et un comportement positif et collaboratif. Ce que nous offrons ❤️ - Un environnement de travail étonnant, conçu pour la bienveillance et l'épanouissement, - Un package de rémunération attractif, - Une équipe internationale et dynamique - Une politique de travail depuis n'importe où - Un abonnement à Gymlib avec un tarif préférentiel, - des tickets restaurant (Swile) - Une assurance maladie Henner (couverte à 60% par PayFit), - Les MacBooks sont notre standard, mais nous vous fournirons tout l'équipement nécessaire pour vous aider à accomplir votre travail !",
    recruitmentProcess:
      "1️⃣Entretien en visioconférence avec Olivia Lauret, Senior Product Marketing Manager 🌍 (30 mins) : Valeur ajoutée, réalisations clés, motivations, adéquation avec le poste 2️⃣Entretien en visioconférence avec Olivia Lauret sur une étude de cas 🌍(1 hr) 3️⃣Entretien en visioconférence avec Yannick, Global Product Marketing Director (30 min) 4️⃣Meet the team 🌍 : Clémentine Van Dijk, Emmanuelle Fasciale, Héloise Beauchesne (30 min).",
    startingDate: "2021-07-01",
    isActive: true,
  },
  {
    title: "Back-end Developer",
    salary: "75000",
    contractType: "CDI",
    fieldWork: "Tech",
    jobDescription:
      "Sous la responsabilité de notre CPO, tu seras le lead d’une squad fonctionnelle de 7 personnes (1 Product Manager, 1 Product Designer, 5 Tech) et auras pour mission de :• Recueillir, trier et analyser les besoins métiers • Participer à la définition des objectifs trimestriels business et produit pour ta squad (en lien avec le CEO, CPO et CTO) • Elaborer la roadmap produit de ta squad • Définir, prioriser et rédiger les tâches nécessaires à l’éxecution de ta roadmap • Communiquer et expliquer les nouvelles tâches à l’équipe Tech • Définir et executer le plan de communucation et de formation interne et externe pour ta roadmap (en lien avec notre Product Marketing Manager) • Définir et tracker les KPIs liés à ta squad et aux fonctionnalités développées (en lien avec notre Data Engineer) • Vérifier la qualité des nouvelles fonctionnalités et identifier les bugs • Participer à la construction de l’équipe",
    profileDescription:
      "Tu auras un rôle clé dans la croissance d’AGICAP, reportant directement à notre CPO Maël. Ce que nous recherchons : • Tu as au moins 3 ans d’expérience en tant que PM • Tu as une première expérience en SaaS B2B et en startup en forte croissance • Tu es orienté client, problème et impact • Tu es un excellent communicant et tu es capable d’embarquer une entreprise entière derrière ta vision • Tu as déjà travaillé avec des équipes design et tech • Tu as un esprit logique et une capacité de synthèse • Tu as d’excellentes capacités de conception • Tu fais preuve de rigueur rédactionnelle et méthodologique • Tu sais partir d’un besoin utilisateur et le découper en plusieurs fonctionnalités • Tu es ambitieux(se) et l’esprit startup t’attire • Tu as l’esprit d’équipe et l’envie de partager tes connaissances",
    recruitmentProcess:
      "Entretien Produit avec un PM - Etude de cas - Entretien avec notre CPO - Entretien avec notre CEO",
    startingDate: "2021-07-02",
    isActive: true,
  },

  {
    title: "Sales manager",
    salary: "90000",
    contractType: "CDI",
    fieldWork: "Sales et Marketing",
    jobDescription:
      "Votre rôle 💡 En tant que stagiaire en marketing produit, vous jouerez un rôle clé en soutenant l'équipe mondiale de marketing produit dans ses tâches quotidiennes. Vous serez directement rattaché à l'un des responsables du marketing produit basé à Paris, en France. C'est l'occasion pour vous d'avoir un impact important dans une startup en pleine croissance qui se développe rapidement en France, au Royaume-Uni, en Allemagne, en Espagne et en Italie. Vous serez amené à interagir avec les équipes suivantes : Ventes, Marketing, Produit, Succès Client. Vos premières missions ⭐ - Market & Competitive Intelligence : Aider à synthétiser les informations provenant de sources multiples pour avoir une bonne compréhension de la dynamique du marché, des acheteurs et des concurrents dans les pays où nous opérons. - Lancements de produits : Travaillez avec une équipe interfonctionnelle de chefs de produit, de maîtres JetLang, de scientifiques des données, d'ingénieurs, de spécialistes du marketing et de vendeurs pour construire et lancer des produits dans tous les pays - de la validation initiale du marché, du positionnement et du message, à la stratégie de mise sur le marché, à l'exécution du lancement et au débriefing du lancement. - Mise en œuvre sur le terrain : Produire des supports efficaces pour le terrain, notamment des démonstrations de vente, des fiches techniques, des études de cas, des formations et des FAQ, afin de faciliter la compréhension des offres de produits, des acheteurs et du positionnement clé. - Évangélisation du produit : Soyez un évangéliste pour les produits PayFit. Mettez en avant leur valeur à la fois en interne (keynotes) et en externe (site web). - Gestion de la communauté des utilisateurs : Aidez à rapprocher notre équipe produit des clients en gérant notre communauté PayFit.",
    profileDescription:
      "Ce poste a été conçu pour vous si ... 🦄  - Vous êtes titulaire d'un master en commerce, marketing ou ingénierie, - Vous postulez pour votre stage de dernière année et vous êtes disponible pour un stage de 6 mois débutant dès que possible. - Une expérience préalable en marketing, marketing digital, startup, ou conseil est un plus. Nous sommes faits pour travailler ensemble si... 👪 - Vous avez un réel esprit d'équipe et souhaitez construire une grande réussite avec nous, - Vous parlez couramment le français et l'anglais et vous souhaitez travailler dans un environnement international et dynamique. Une autre langue est un plus. - Vous avez de solides compétences interpersonnelles et de communication, - Vous avez un esprit d'analyse et de résolution de problèmes. - Vous souhaitez apprendre, vous améliorer et prendre des responsabilités. - Vous avez une attitude volontaire et un comportement positif et collaboratif. Ce que nous offrons ❤️ - Un environnement de travail étonnant, conçu pour la bienveillance et l'épanouissement, - Un package de rémunération attractif, - Une équipe internationale et dynamique - Une politique de travail depuis n'importe où - Un abonnement à Gymlib avec un tarif préférentiel, - des tickets restaurant (Swile) - Une assurance maladie Henner (couverte à 60% par PayFit), - Les MacBooks sont notre standard, mais nous vous fournirons tout l'équipement nécessaire pour vous aider à accomplir votre travail !",
    recruitmentProcess:
      "1️⃣Entretien en visioconférence avec Olivia Lauret, Senior Product Marketing Manager 🌍 (30 mins) : Valeur ajoutée, réalisations clés, motivations, adéquation avec le poste 2️⃣Entretien en visioconférence avec Olivia Lauret sur une étude de cas 🌍(1 hr) 3️⃣Entretien en visioconférence avec Yannick, Global Product Marketing Director (30 min) 4️⃣Meet the team 🌍 : Clémentine Van Dijk, Emmanuelle Fasciale, Héloise Beauchesne (30 min).",
    startingDate: "2021-05-12",
    isActive: true,
  },

  {
    title: "Data scientist ",
    salary: "56000",
    contractType: "CDI",
    fieldWork: "Tech",
    jobDescription:
      "One of BlaBlaCar’s key strategic goals is to leverage data through Machine Learning in order to trigger growth opportunities. Data Science has been instrumental to successfully launching new services for the past two years, yet the potential for improvements is still massive. If you are looking for exciting challenges, impacting millions of users and working on a state-of-the-art cloud platform, come and join us  You’ll join the growing data science automation team, whose mission is to create value within BlaBlaCar Operations using machine learning and algorithms. Among many projects, the team delivers Machine Learning driven tools to make sure our members enjoy a great experience at each step of their journey. To achieve this goal, we put significant efforts to ensure our rules are enforced and to exclude from the community those who don't respect the ",
    profileDescription:
      "Leveraging machine learning algorithms to detect non-compliant behaviours on our platform globally Contributing to pioneering research on experimentation on data science driven fraud detection Recommending and work with software engineers to implement real-time solutions As an experienced member in a team of 6 Data Scientists: Challenging our data scientist toolbox, and proposing solutions to improve our data science tooling Leading large-scale projects Mentoring other data scientists",
    recruitmentProcess:
      "Entretien Produit avec un PM - Etude de cas - Entretien avec notre CPO - Entretien avec notre CEO",
    startingDate: "2021-05-02",
    isActive: true,
  },
  {
    title: "Software Engineer",
    salary: "60000",
    contractType: "CDI",
    fieldWork: "Tech",
    jobDescription:
      "You are a backend and data enthusiast. You add new features to the product and build them, from design to deployment: detailed conception, algorithm design, implementation, unit tests, performance optimization, developer documentation. Development takes place in short cycles with regular staging and production deployments as the product evolves. We implement simple workflow tasks in Python, and use Golang for any intensive processing.",
    profileDescription:
      "You have development experience in processing large-scale datasets using Python You are language agnostic and ready to suggest or learn new languages to optimize algorithms depending on the context (we use mainly Go and Python). You are interested in performance analysis (CPU, I/O, memory, application profiling). You are interested in Big Data and Cloud infrastructures and have some knowledge in at least one technology used in our current backend stack: Amazon SWF workflows, Amazon S3 storage, Redis and PostgreSQL. You are familiar with Git.",
    recruitmentProcess: "Two reounds with our senior engineers",
    startingDate: "2021-06-01",
    isActive: true,
  },
  {
    title: "Directeur Artistique",
    salary: "45000",
    contractType: "CDI",
    fieldWork: "Tech",
    jobDescription:
      "Notre mission si vous l’acceptez:  En tant que Directeur Artistique Frichti), vous rejoignez notre studio de Création interne dont les clients sont les business units de Frichti. Ce studio de création interne oeuvre sous la supervision directe de notre Head of Food Strategy et en parallèle, se fait coacher quotidiennement par notre Brand Director. Votre rôle est de porter et faire rayonner la marque Frichti sur tous nos canaux afin de maximiser la notoriété et la désirabilité de la marque. Vous avez la maîtrise de l’identité visuelle de Frichti sur l’ensemble de nos canaux, de la conception initiale de l’identité jusqu’à sa mise en place. Vous développez et êtes garant de notre charte graphique sur l’ensemble des canaux. Vous intervenez de la genèse d’un projet (brief) à sa mise en ligne / publication avec votre équipe. Vous travaillez en étroite collaboration avec l’équipe Food, l’équipe Marketing et le Concepteur-rédacteur de Frichti pour développer et produire nos campagnes de communication de A à Z. Vous êtes sollicité par différentes équipes (Food, B2B, Tech, RH, Terrain) pour la création de contenus et de supports afin de répondre à leurs besoins. Vous supervisez les shootings photo de leur conception à leur production en sollicitant notre photographe et set-designer. Si besoin, vous réalisez vous-même certains supports (courtes vidéos foodporn, recettes…). Vous managez au quotidien une graphiste et un(e) stagiaire qui vous accompagneront dans tous vos projets, et êtes responsable du planning de production de votre équipe.",
    profileDescription:
      "Votre expérience et vos qualités : Issu d’une formation supérieure en graphisme, web design, communication visuelle, vous justifiez d’une expérience de 5 ans minimum en DA côté agence ou chez l’annonceur.s : Créatif et ambitieux, vous avez des tas d’idées pour élever la marque Frichti et n’avez pas peur de sortir du cadre.s : Véritable couteau-suisse, vous avez des compétences en photo et/ou en montage vidéo, mais aussi en motion design.s : Vous êtes à l’aise pour piloter la production photo / vidéo sur des shootings.s : Familier du secteur e-commerce ou du digital en général, vous comprenez les enjeux d’une marque et de sa stratégie digitale.s : Curieux et épicurien, vous êtes particulièrement sensible à l’univers de la food, celui de la publicité et avez développé un vrai sens de l’esthétique.s : Passionné et engagé, vous êtes motivé pour rejoindre une mission-driven company.s : Doté d’un leadership naturel, vous savez défendre votre point de vue, embarquer votre équipe, ou encore négocier en direct avec les fournisseurs, studio d’exe, imprimeurs etc.s : Vous aimez travailler en équipe, animer, coordonner les gens qui vous entourent.s : Vous maîtrisez parfaitement les outils et logiciels utiles à la création visuelle (suite Adobe etc.), After Effect est un plus.s : Vous êtes à l’aise avec le langage, les contraintes spécifiques du web, et maîtrisez la chaîne graphique dans toutes ses étapes.",
    startingDate: "2021-06-02",
    isActive: true,
  },
  {
    title: "Social Media Manager",
    salary: "45000",
    contractType: "CDI",
    fieldWork: "Tech",
    jobDescription:
      "En tant que Social Media Manager chez Frichti, vous rejoignez l’équipe Brand et êtes le porte-parole des valeurs de la marque partout sur les réseaux sociaux. Vos missions principales sont les suivantes: Développer la stratégie d’animation de nos communautés (FB, insta, linkedin, twitter) et la déployer Gérer le planning social media et créer son contenu, en phase avec les objectifs de la communication et du marketing. Développer et gérer les relations avec les blogueurs et influenceurs ainsi qu’avec les agences Suivre et analyser quotidiennement les performances Identifier les partenariats à fort potentiel social media et créer des synergies entre eux et Frichti Craquer des activations social media à fort potentiel viral qui peuvent être déclinables sur votre canal mais aussi sur les autres Insuffler le social media dans tous les touchpoints : onsite, canaux de communication, physique Définir et porter la stratégie social media pour l’équipe Sales et notre co-fondatrice sur Linkedin Accompagner l’équipe Creative content pour assurer un mindset social media dans toutes les campagnes Recruter, animer et manager un(e) stagiaire Social Media",
    profileDescription:
      "Votre expérience et vos qualitéIssu d’une école de communication, commerce, pub, journalisme, lettres ou équivalent universitaire, vous justifiez d’une expérience de 3 ans minimum en communication, publicité ou journalismeVous maîtrisez parfaitement les principaux réseaux sociaux. Doté d’une très belle plume et story teller dans l’âme, vous êtes capable de vous intégrer dans notre registre éditorial : proche, vrai et impertinent.Une bonne compréhension des enjeux d’une marque et de sa stratégie digitale. Créatif, vous avez des tas d’idées pour élever la marque Frichti. Force de proposition, vous êtes un puit d’idées impertinentes et impactantes au quotidien Maître du pitch, vous défendez vos projets et les faites rayonner en interne et en externe",
    startingDate: "2021-07-02",
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
      CompanyModel.findOne({ name: "Agicap" }),
      CompanyModel.findOne({ name: "Agicap" }),
      CompanyModel.findOne({ name: "Payfit" }),
      CompanyModel.findOne({ name: "Agicap" }),
      CompanyModel.findOne({ name: "Payfit" }),
      CompanyModel.findOne({ name: "BlaBlaCar" }),
      CompanyModel.findOne({ name: "Dataiku" }),
      CompanyModel.findOne({ name: "Frichti" }),
      CompanyModel.findOne({ name: "Frichti" }),
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
