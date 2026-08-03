// Toutes les chaînes de texte statiques du site, en français et en anglais.
// Le contenu dynamique (projets, bio) provient de l'API et contient déjà
// des champs fr/en gérés séparément.

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      experience: "Expériences",
      projects: "Projets",
      skills: "Compétences",
      contact: "Contact",
      cta: "Me contacter",
    },
    hero: {
      roles: ["Ingénieur Data", "Entrepreneur", "Formateur"],
      title: "Djibril Pierre Clavair Pamousso",
      subtitle:
        "Accélérer la souveraineté numérique de l'Afrique par la data et l'intelligence artificielle.",
      ctaPrimary: "Découvrir mes projets",
      ctaSecondary: "Me contacter",
      badge: "Fondateur du Grand Salon de la Data en Afrique",
    },
    about: {
      label: "À propos",
      title: "Ingénieur data au service d'une Afrique actrice du numérique",
      quote:
        "« L'Afrique ne doit plus être un simple consommateur de technologies, mais un acteur à part entière de la révolution numérique mondiale. »",
      valuesTitle: "Valeurs clés",
      values: [
        {
          title: "Souveraineté numérique",
          desc: "Construire des solutions data pensées pour et par l'Afrique.",
        },
        {
          title: "Inclusion",
          desc: "Concevoir des expériences accessibles, notamment pour les personnes malvoyantes.",
        },
        {
          title: "Transmission",
          desc: "Former et accompagner la prochaine génération de talents data.",
        },
      ],
    },
    experience: {
      label: "Parcours",
      title: "Expériences professionnelles",
      items: [
        {
          role: "Co-fondateur & Gérant — Chef de projet",
          company: "Africa Data Entry",
          date: "Octobre 2024 — présent",
          location: "Ouagadougou (Remote)",
          points: [
            "Promoteur du Grand Salon de la Data en Afrique (GSDA).",
            "Pilotage de projets digitaux pour la RTB (Fespaco) et le FNPSL.",
            "Conception et management de l'application CanProno.",
            "Élaboration de feuilles de route techniques et mentorat de startups.",
          ],
        },
        {
          role: "Data Engineer & Lead Développeur",
          company: "Rocket4Sales",
          date: "Février 2022 — Décembre 2024",
          location: "Lyon",
          points: [
            "Architecture data cloud native (AWS), orchestration ETL (Airflow).",
            "Intégration de flux financiers (Revolut, Qonto).",
            "Optimisation de bases PostgreSQL et tableaux de bord décisionnels.",
            "Formation et accompagnement de nouveaux data engineers.",
          ],
        },
        {
          role: "Développeur FullStack",
          company: "iMSA",
          date: "Avril 2021 — Septembre 2021",
          location: "Montauban",
          points: [
            "Développement d'API Spring Boot.",
            "Mise en place de pipelines CI/CD.",
          ],
        },
        {
          role: "Ingénieur Support IT & Migration Data",
          company: "IT-EXPERTIS",
          date: "Juillet 2019 — Août 2020",
          location: "Ouagadougou",
          points: [
            "Migration de données électorales sensibles.",
            "Préparation à l'intégration Odoo, modélisation de bases de données.",
          ],
        },
      ],
    },
    projects: {
      label: "Études de cas",
      title: "Projets emblématiques",
      subtitle: "Une sélection de projets pilotés de la conception à la livraison.",
      cta: "Voir le détail",
      modal: {
        context: "Contexte & enjeu",
        role: "Rôle",
        solution: "Solution technique",
        results: "Résultats & impacts",
        technologies: "Technologies",
        close: "Fermer",
      },
    },
    skills: {
      label: "Expertise",
      title: "Compétences & Technologies",
      categories: {
        management: "Gestion de projet",
        data: "Data & Cloud",
        languages: "Langages & Outils",
        soft: "Soft Skills",
      },
    },
    contact: {
      label: "Contact",
      title: "Discutons de votre prochain projet data",
      subtitle:
        "Une question, un projet, une invitation à un événement ? Écrivez-moi.",
      form: {
        name: "Nom complet",
        email: "Email",
        subject: "Objet",
        message: "Message",
        submit: "Envoyer le message",
        sending: "Envoi en cours...",
        success: "Message envoyé avec succès ! Je vous répondrai rapidement.",
        error: "Une erreur est survenue. Veuillez réessayer.",
      },
      infoTitle: "Coordonnées",
      location: "Lyon / Ouagadougou",
    },
    footer: {
      rights: "Tous droits réservés.",
      builtWith: "Conçu avec passion pour la data et l'Afrique.",
    },
    admin: {
      loginTitle: "Espace administrateur",
      email: "Email",
      password: "Mot de passe",
      login: "Se connecter",
      loggingIn: "Connexion...",
      invalidCredentials: "Identifiants incorrects.",
      dashboard: "Tableau de bord",
      logout: "Déconnexion",
      projectsTab: "Projets",
      profileTab: "Biographie",
      addProject: "Ajouter un projet",
      editProject: "Modifier le projet",
      deleteConfirm: "Confirmer la suppression de ce projet ?",
      save: "Enregistrer",
      cancel: "Annuler",
      saved: "Enregistré avec succès.",
    },
    notFound: {
      title: "Page introuvable",
      subtitle: "La page que vous recherchez n'existe pas ou a été déplacée.",
      cta: "Retour à l'accueil",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      cta: "Get in touch",
    },
    hero: {
      roles: ["Data Engineer", "Entrepreneur", "Trainer"],
      title: "Djibril Pierre Clavair Pamousso",
      subtitle:
        "Accelerating Africa's digital sovereignty through data and artificial intelligence.",
      ctaPrimary: "Discover my projects",
      ctaSecondary: "Get in touch",
      badge: "Founder of the Grand Salon de la Data en Afrique",
    },
    about: {
      label: "About",
      title: "A data engineer building an Africa that shapes technology",
      quote:
        "\"Africa must no longer be a mere consumer of technology, but a full-fledged actor in the global digital revolution.\"",
      valuesTitle: "Core values",
      values: [
        {
          title: "Digital sovereignty",
          desc: "Building data solutions designed for and by Africa.",
        },
        {
          title: "Inclusion",
          desc: "Designing accessible experiences, including for visually impaired users.",
        },
        {
          title: "Knowledge transfer",
          desc: "Training and mentoring the next generation of data talent.",
        },
      ],
    },
    experience: {
      label: "Career",
      title: "Professional experience",
      items: [
        {
          role: "Co-founder & Managing Director — Project Lead",
          company: "Africa Data Entry",
          date: "October 2024 — present",
          location: "Ouagadougou (Remote)",
          points: [
            "Promoter of the Grand Salon de la Data en Afrique (GSDA).",
            "Led digital projects for RTB (Fespaco) and FNPSL.",
            "Designed and managed the CanProno application.",
            "Built technical roadmaps and mentored startups.",
          ],
        },
        {
          role: "Data Engineer & Lead Developer",
          company: "Rocket4Sales",
          date: "February 2022 — December 2024",
          location: "Lyon",
          points: [
            "Cloud-native data architecture (AWS), ETL orchestration (Airflow).",
            "Integrated financial data flows (Revolut, Qonto).",
            "Optimized PostgreSQL databases and BI dashboards.",
            "Trained and mentored new data engineers.",
          ],
        },
        {
          role: "Full-Stack Developer",
          company: "iMSA",
          date: "April 2021 — September 2021",
          location: "Montauban",
          points: [
            "Developed Spring Boot APIs.",
            "Set up CI/CD pipelines.",
          ],
        },
        {
          role: "IT Support & Data Migration Engineer",
          company: "IT-EXPERTIS",
          date: "July 2019 — August 2020",
          location: "Ouagadougou",
          points: [
            "Migrated sensitive electoral data.",
            "Prepared Odoo integration and database modeling.",
          ],
        },
      ],
    },
    projects: {
      label: "Case studies",
      title: "Flagship projects",
      subtitle: "A selection of projects led from concept to delivery.",
      cta: "View details",
      modal: {
        context: "Context & challenge",
        role: "Role",
        solution: "Technical solution",
        results: "Results & impact",
        technologies: "Technologies",
        close: "Close",
      },
    },
    skills: {
      label: "Expertise",
      title: "Skills & Technologies",
      categories: {
        management: "Project Management",
        data: "Data & Cloud",
        languages: "Languages & Tools",
        soft: "Soft Skills",
      },
    },
    contact: {
      label: "Contact",
      title: "Let's talk about your next data project",
      subtitle: "A question, a project, an event invitation? Write to me.",
      form: {
        name: "Full name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        submit: "Send message",
        sending: "Sending...",
        success: "Message sent successfully! I'll get back to you soon.",
        error: "Something went wrong. Please try again.",
      },
      infoTitle: "Contact details",
      location: "Lyon / Ouagadougou",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with passion for data and Africa.",
    },
    admin: {
      loginTitle: "Admin area",
      email: "Email",
      password: "Password",
      login: "Sign in",
      loggingIn: "Signing in...",
      invalidCredentials: "Invalid credentials.",
      dashboard: "Dashboard",
      logout: "Log out",
      projectsTab: "Projects",
      profileTab: "Biography",
      addProject: "Add project",
      editProject: "Edit project",
      deleteConfirm: "Confirm deletion of this project?",
      save: "Save",
      cancel: "Cancel",
      saved: "Saved successfully.",
    },
    notFound: {
      title: "Page not found",
      subtitle: "The page you're looking for doesn't exist or has been moved.",
      cta: "Back to home",
    },
  },
};

export default translations;
