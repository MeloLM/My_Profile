/**
 * 📋 Profile Data
 * Dati del profilo centralizzati - Aggiornato al 2026
 * Basato su CV_Carmelo_la_mantia_2026.pdf
 * 
 * @module data/profileData
 */

// Import immagini per Skills
// Note: logo1 (Python) e logo14 (WordPress) importati per utilizzo futuro
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

// Import immagini per Progetti (Invariato - assicurati che i file esistano)
import projImg1 from '../assets/img/project_soul.jpeg';
import projImg2 from '../assets/img/project_moon.jpeg';
import projImg3 from '../assets/img/project_sushi.jpeg';
import projImgPortfolio from '../assets/img/Screen_HomePage_Portfolio.png';

export const personalInfo = {
  name: "Carmelo La Mantia",
  role: "Jr Full Stack Developer", // Aggiornato da 
  location: "Agrigento, Sicilia, Italy",
  birthDate: "12/09/2000",
  phone: "+39 3510845851",
  email: "carmelo.la.mantia00@gmail.com",
  linkedin: "https://www.linkedin.com/in/carmelo-la-mantia-web-developer/", // Verifica se l'URL è ancora valido
  github: "https://github.com/MeloLM",
  instagram: "https://www.instagram.com/carmelo_coding/"
};

// Aggiornato con la sezione "ABOUT ME" del PDF 
export const summary = `Sviluppatore Web Junior specializzato nello stack PHP/Laravel e React.js. Ho trasformato la mia passione per il codice in competenze concrete realizzando applicazioni web full-stack e browser game ottimizzati. Attualmente arricchisco il mio background tecnico attraverso il percorso di laurea in Ingegneria Informatica, puntando a una crescita professionale continua.`;

// Aggiornato con "TECHNICAL SKILLS" del PDF 
export const technicalSkills = {
  languages: ["HTML5", "CSS3", "JavaScript (ES6+)", "PHP 8.1+"],
  software: ["Linux", "Postman", "VS Code"],
  tools: ["Git", "GitHub", "Vite"],
  frameworks: ["Laravel 10", "Bootstrap 5", "React.js", "Phaser 3"],
  editors: ["Visual Studio Code"],
  aiTools: ["GitHub Copilot", "Prompt Engineering"]
};

// Aggiunte skills mancanti menzionate nel PDF (Vite, Postman)
export const skillsData = [
  { img: logo8, name: "HTML5", level: 90, category: "Frontend" },
  { img: logo6, name: "CSS3", level: 85, category: "Frontend" },
  { img: logo5, name: "JAVASCRIPT", level: 80, category: "Frontend" }, // Livello aggiornato basato sui progetti complessi
  { img: logo7, name: "REACT JS", level: 75, category: "Frontend" },
  { img: logo9, name: "PHP", level: 75, category: "Backend" },
  { img: logo10, name: "LARAVEL", level: 70, category: "Backend" },
  { img: logo11, name: "MYSQL", level: 70, category: "Backend" },
  { img: logo3, name: "BOOTSTRAP 5", level: 85, category: "Frontend" },
  { img: logo12, name: "GIT", level: 75, category: "Tools" },
  { img: logo2, name: "GITHUB", level: 80, category: "Tools" },
  { img: logo13, name: "VITE", level: 70, category: "Tools" }, // Aggiunto (usa logo nodejs come placeholder se non hai logo vite)
  { img: logo4, name: "AI TOOLS", level: 85, category: "Tools" },
];

export const education = [
  {
    period: "2025 - in corso",
    institution: "Università E-campus",
    location: "Online / AG Sicilia",
    title: "Laurea Triennale, Ingegneria Informatica",
    description: "Percorso accademico in corso per approfondimento teorico e ingegneristico." // 
  },
  {
    period: "Gennaio 2023 - Aprile 2023",
    institution: "Aulab srl",
    location: "Bari",
    title: "Corso di Full Stack developer",
    description: "Bootcamp intensivo su metodologie Agile Scrum e stack PHP/Laravel/React." // 
  },
  {
    period: "2021 - 2022",
    institution: "Empatia",
    location: "Canicattì (Agrigento)",
    title: "Corso di Tecnico gestione siti web",
    description: "Formazione tecnica su gestione e sviluppo siti web." // 
  },
  {
    period: "2014 - 2019",
    institution: "IISS Galileo Galilei",
    location: "Canicattì (Agrigento)",
    title: "Diploma di Istruzione Tecnica - C.A.T.",
    description: "Diploma tecnico Costruzioni, Ambiente e Territorio." // 
  }
];

// Aggiornato con i titoli e le descrizioni tecniche specifiche del PDF 
export const projects = [
  {
    title: "Knight Shooter (Survival Game)", // 
    description: "Browser game 2D con architettura Event-Driven Modular. Logica Object Pooling per nemici e pathfinding.", // 
    imgUrl: projImg2,
    imgAncor: "#", 
    tech: ["JavaScript", "Phaser 3", "Vite"]
  },
  {
    title: "SoulsLike Themed Portfolio", // 
    description: "SPA con design system ispirato a Dark Souls. Animazioni CSS complesse e UX gamificata.", // 
    imgUrl: projImgPortfolio,
    imgAncor: "https://github.com/MeloLM/My_Profile",
    tech: ["React.js", "CSS3 Animations", "Custom UI"]
  },
  {
    title: "Souls Space Platform", // 
    description: "Piattaforma full-stack MVC. Autenticazione Laravel Fortify e gestione 'Boss Area' con CRUD completo.", // 
    imgUrl: projImg1,
    imgAncor: "https://github.com/MeloLM/Carmelo_GamesSpace",
    tech: ["Laravel 10", "PHP", "MySQL", "Bootstrap"]
  },
  {
    title: "Sushi Restaurant App", // 
    description: "Interfaccia moderna per consultazione menù. Architettura a componenti riutilizzabili.", // 
    imgUrl: projImg3,
    imgAncor: "https://sushi-project-cml.vercel.app/",
    tech: ["React.js", "CSS Modules"]
  }
];

// Aggiornato con le date e i ruoli corretti 
export const workExperience = [
  {
    period: "2025 - in corso",
    company: "Rueesch srl",
    location: "Canicattì (Agrigento)",
    role: "Addetto alla logistica",
    skills: ["Gestione flussi", "Coordinamento team", "Rispetto scadenze"]
  },
  {
    period: "2023 - 2024",
    company: "Rivendita Tabacchi 25",
    location: "Canicattì (Agrigento)",
    role: "Addetto alle vendite",
    skills: ["Gestione cassa", "Assistenza clienti", "Problem solving"]
  },
  {
    period: "2022 - 2023",
    company: "VII Coorte Ristorante",
    location: "Roma", // Assunto Roma dal vecchio file, PDF non specifica città ma ristorante
    role: "Cameriere",
    skills: ["Lavoro in team", "Gestione stress", "Comunicazione"]
  }
];

export const languages = [
  { language: "Italiano", level: "Madrelingua", stars: 5 },
  { language: "Inglese", level: "Intermedio", stars: 4 }, // 
  { language: "Spagnolo", level: "Base", stars: 2 } // 
];

export const timelineData = [
  {
    year: "2014-2019",
    title: "Diploma C.A.T.",
    subtitle: "IISS Galileo Galilei",
    description: "Diploma tecnico.",
    icon: "🎓",
    type: "education"
  },
  {
    year: "2021-2022",
    title: "Tecnico Web",
    subtitle: "Empatia",
    description: "Corso gestione siti web.",
    icon: "💡",
    type: "education"
  },
  {
    year: "2023",
    title: "Full Stack Bootcamp",
    subtitle: "Aulab srl",
    description: "Sviluppo competenze PHP, Laravel, React.",
    icon: "💻",
    type: "education"
  },
  {
    year: "2023-2024",
    title: "Esperienze Lavorative",
    subtitle: "Vendite & Ristorazione",
    description: "Sviluppo soft skills: gestione stress e problem solving.",
    icon: "🤝",
    type: "work"
  },
  {
    year: "2025-Oggi",
    title: "Università & Lavoro",
    subtitle: "Ingegneria Informatica | Rueesch srl",
    description: "Laurea in corso e lavoro nella logistica.",
    icon: "🚀",
    type: "work"
  },
  {
    year: "in corso",
    title: "Jr Full Stack Developer",
    subtitle: "Obiettivo Professionale",
    description: "Applicazione competenze su progetti complessi (Laravel/React).",
    icon: "🎯",
    type: "career"
  }
]; 