/**
 * DATI PROFILO - Modifica qui per aggiornare tutto il sito
 * =========================================================
 * Questo file contiene tutti i dati personali del portfolio.
 * Modifica questi dati per aggiornare automaticamente le sezioni.
 */

// Import immagini per Skills
import logo1 from '../assets/img/icon/phyton.png';
import logo2 from '../assets/img/icon/github.png';
import logo3 from '../assets/img/icon/bootstrap.png';
import logo4 from '../assets/img/icon/chatgbt.png';
import logo5 from '../assets/img/icon/javascript.png';
import logo6 from '../assets/img/icon/css.png';
import logo7 from '../assets/img/icon/react.png';
import logo8 from '../assets/img/icon/html.png';
import logo9 from '../assets/img/icon/php.png';
import logo10 from '../assets/img/icon/laravel.jpg';
import logo11 from '../assets/img/icon/mysql.png';
import logo12 from '../assets/img/icon/git.png';
import logo13 from '../assets/img/icon/nodejs.png';
import logo14 from '../assets/img/icon/wordpress.png';

// Import immagini per Progetti
import projImg1 from '../assets/img/project_soul.jpeg';
import projImg2 from '../assets/img/project_moon.jpeg';
import projImg3 from '../assets/img/project_sushi.jpeg';
import projImg4 from '../assets/img/presto_it.jpg';
import projImgPortfolio from '../assets/img/Screen_HomePage_Portfolio.png';

export const personalInfo = {
  name: "Carmelo La Mantia",
  role: "Jr Web Developer",
  location: "Agrigento, Sicilia, Italy",
  birthDate: "12/09/2000",
  phone: "+39 3510845851",
  email: "carmelo.la.mantia00@gmail.com",
  linkedin: "https://www.linkedin.com/in/carmelo-la-mantia-web-developer/",
  github: "https://github.com/MeloLM",
  instagram: "https://www.instagram.com/carmelo_coding/"
};

export const summary = `Junior full stack developer con formazione pregressa da tecnico di gestione di siti web e predisposizione verso linguaggi orientati al back end. Maturate competenze tecniche lato front end e back end in coding Bootcamp basato su programmazione Object oriented. Apprese le logiche della metodologia di lavoro agile scrum, durante le esercitazioni pratiche eseguite. Buone capacità comunicative, di gestione dello stress e problem solving completano il profilo.`;

export const technicalSkills = {
  languages: ["HTML", "CSS", "JavaScript", "PHP"],
  software: ["Linux", "Office"],
  tools: ["Git", "GitHub"],
  frameworks: ["Laravel", "Bootstrap", "React.js"],
  editors: ["Visual Studio Code", "WordPress"],
  aiTools: ["GitHub Copilot", "Prompt Engineering"]
};

export const skillsData = [
  { img: logo8, name: "HTML5", level: 90, category: "Frontend" },
  { img: logo6, name: "CSS3", level: 85, category: "Frontend" },
  { img: logo5, name: "JAVASCRIPT", level: 75, category: "Frontend" },
  { img: logo7, name: "REACT JS", level: 70, category: "Frontend" },
  { img: logo9, name: "PHP", level: 70, category: "Backend" },
  { img: logo10, name: "LARAVEL", level: 65, category: "Backend" },
  { img: logo11, name: "MYSQL", level: 70, category: "Backend" },
  { img: logo1, name: "PYTHON", level: 50, category: "Backend" },
  { img: logo3, name: "BOOTSTRAP", level: 85, category: "Frontend" },
  { img: logo12, name: "GIT", level: 75, category: "Tools" },
  { img: logo2, name: "GITHUB", level: 80, category: "Tools" },
  { img: logo13, name: "NODE.JS", level: 40, category: "Backend" },
  { img: logo14, name: "WORDPRESS", level: 60, category: "Tools" },
  { img: logo4, name: "AI TOOLS", level: 85, category: "Tools" },
];

export const education = [
  {
    period: "2025 - in corso",
    institution: "Università E-campus",
    location: "Online / Novedrate (CO)",
    title: "Laurea Triennale, Ingegneria Informatica",
    description: "Corso di laurea in Ingegneria Informatica - attualmente in corso."
  },
  {
    period: "Gennaio 2023 - Aprile 2023",
    institution: "Aulab srl",
    location: "Bari",
    title: "Corso di Full Stack Developer",
    description: "Bootcamp intensivo: PHP, Laravel, React, MySQL. Metodologia Agile Scrum."
  },
  {
    period: "2021 - 2022",
    institution: "Empatia",
    location: "Canicattì (Agrigento)",
    title: "Corso di Tecnico Gestione Siti Web",
    description: "HTML, CSS, WordPress. Primo approccio al web development."
  },
  {
    period: "2014 - 2019",
    institution: "IISS Galileo Galilei",
    location: "Canicattì (Agrigento)",
    title: "Diploma di Istruzione Tecnica - C.A.T.",
    description: "Diploma tecnico in Costruzioni, Ambiente e Territorio (ex Geometra)."
  }
];

export const projects = [
  {
    title: "Shooter Project",
    description: "Progetto di un gioco javascript sviluppato con Phaser 3",
    imgUrl: projImg2,
    imgAncor: "#", // Link demo da aggiungere
    tech: ["JavaScript", "Phaser 3"]
  },
  {
    title: "My Profile",
    description: "Portfolio custom sviluppato con framework React",
    imgUrl: projImgPortfolio,
    imgAncor: "https://github.com/MeloLM/My_Profile", // Link portfolio
    tech: ["React", "JavaScript", "CSS"]
  },
  {
    title: "SoulsSpace Blog",
    description: "Blog funzionale sviluppato con framework Laravel (in progress)",
    imgUrl: projImg1,
    imgAncor: "https://github.com/MeloLM/Carmelo_GamesSpace",
    tech: ["Laravel", "PHP", "MySQL"]
  },
  {
    title: "Sushi Project",
    description: "Menu interattivo all-you-can-eat fatto interamente con React",
    imgUrl: projImg3,
    imgAncor: "https://sushi-project-cml.vercel.app/",
    tech: ["React", "JavaScript"]
  }
];

export const workExperience = [
  {
    period: "2025 - in corso",
    company: "Rueesch srl",
    location: "Canicattì (Agrigento, Sicilia)",
    role: "Addetto alla logistica",
    skills: ["Team Management", "Lavoro in team", "Precisione operativa"]
  },
  {
    period: "2023 - 2024",
    company: "Rivendita Tabacchi 25",
    location: "Canicattì (Agrigento, Sicilia)",
    role: "Addetto alle vendite",
    skills: ["Problem Solving", "Customer Care", "Affidabilità e gestione cassa"]
  },
  {
    period: "2022 - 2023",
    company: "VII Coorte Ristorante",
    location: "Roma (Lazio)",
    role: "Cameriere",
    skills: ["Gestione dello stress", "Comunicazione efficace", "Adattabilità in ambienti dinamici"]
  }
];

export const languages = [
  { language: "Italiano", level: "Madrelingua", stars: 5 },
  { language: "Inglese", level: "Intermedio", stars: 4 },
  { language: "Spagnolo", level: "Base", stars: 1 }
];

// Timeline data per la sezione Il Mio Percorso
export const timelineData = [
  {
    year: "2014-2019",
    title: "Diploma C.A.T.",
    subtitle: "IISS Galileo Galilei - Canicattì",
    description: "Diploma di Istruzione Tecnica - Costruzioni, Ambiente e Territorio (ex Geometra).",
    icon: "🎓",
    type: "education"
  },
  {
    year: "2021-2022",
    title: "Tecnico Gestione Siti Web",
    subtitle: "Empatia - Canicattì",
    description: "Corso professionale: HTML, CSS, WordPress. Primo approccio al web development.",
    icon: "💡",
    type: "education"
  },
  {
    year: "2022-2023",
    title: "Cameriere",
    subtitle: "VII Coorte Ristorante - Roma",
    description: "Esperienza lavorativa a Roma. Gestione dello stress, comunicazione e adattabilità.",
    icon: "🍽️",
    type: "work"
  },
  {
    year: "2023",
    title: "Full Stack Developer Bootcamp",
    subtitle: "Aulab srl - Bari",
    description: "Bootcamp intensivo: PHP, Laravel, React, MySQL. Metodologia Agile Scrum e progetti di team.",
    icon: "💻",
    type: "education"
  },
  {
    year: "2023-2024",
    title: "Addetto Vendite",
    subtitle: "Rivendita Tabacchi 25 - Canicattì",
    description: "Problem Solving, Customer Care, gestione cassa. Sviluppo progetti personali in parallelo.",
    icon: "🏪",
    type: "work"
  },
  {
    year: "2025",
    title: "Addetto Logistica & Università",
    subtitle: "Rueesch srl | Università E-campus",
    description: "Inizio percorso universitario in Ingegneria Informatica e lavoro presso Rueesch srl.",
    icon: "📦",
    type: "work"
  },
  {
    year: "2026",
    title: "Jr Full Stack Developer",
    subtitle: "Open to Work",
    description: "Alla ricerca di opportunità come Jr Full Stack Developer. React, Laravel, JavaScript, AI Tools.",
    icon: "⚔️",
    type: "career"
  }
];
