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

export const personalInfo = {
  name: "Carmelo La Mantia",
  role: "Junior Full Stack Developer",
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
  software: ["Windows 10", "Linux", "Unix", "Office"],
  tools: ["Discord", "Git", "GitHub"],
  frameworks: ["Laravel", "Bootstrap", "React.js"],
  editors: ["Visual Studio Code", "WordPress", "AutoCAD"]
};

export const skillsData = [
  { img: logo8, name: "HTML5", level: 90 },
  { img: logo6, name: "CSS3", level: 85 },
  { img: logo5, name: "JAVASCRIPT", level: 75 },
  { img: logo7, name: "REACT JS", level: 70 },
  { img: logo9, name: "PHP", level: 70 },
  { img: logo10, name: "LARAVEL", level: 65 },
  { img: logo11, name: "MYSQL", level: 70 },
  { img: logo1, name: "PYTHON", level: 50 },
  { img: logo3, name: "BOOTSTRAP", level: 85 },
  { img: logo12, name: "GIT", level: 75 },
  { img: logo2, name: "GITHUB", level: 80 },
  { img: logo13, name: "NODE.JS", level: 40 },
  { img: logo14, name: "WORDPRESS", level: 60 },
  { img: logo4, name: "AI TOOLS", level: 85 },
];

export const education = [
  {
    period: "Gennaio 2023 - Aprile 2023",
    institution: "Aulab srl",
    location: "Bari",
    title: "Corso di Full Stack Developer",
    description: "Bootcamp intensivo: PHP, Laravel, React, MySQL. Metodologia Agile Scrum."
  },
  {
    period: "Gennaio 2021 - Settembre 2022",
    institution: "Empatia",
    location: "Canicattì (Agrigento)",
    title: "Corso di Tecnico Gestione Siti Web",
    description: "HTML, CSS, WordPress. Primo approccio al web development."
  },
  {
    period: "Settembre 2014 - Giugno 2019",
    institution: "IISS Galileo Galilei",
    location: "Canicattì (Agrigento)",
    title: "Diploma di Geometra",
    description: "Diploma tecnico con basi di informatica, AutoCAD e progettazione."
  }
];

export const projects = [
  {
    title: "Souls Space",
    description: "SoulsLike Blog",
    imgUrl: projImg1,
    imgAncor: "https://github.com/MeloLM/Carmelo_GamesSpace"
  },
  {
    title: "Project color:Black",
    description: "Aulab Project",
    imgUrl: projImg2,
    imgAncor: "https://github.com/MeloLM/Black_template_Carmelo_LM"
  },
  {
    title: "Project React-sushi",
    description: "React project",
    imgUrl: projImg3,
    imgAncor: "https://sushi-project-cml.vercel.app/"
  },
  {
    title: "E-commerce Presto.it",
    description: "Laravel Project",
    imgUrl: projImg4,
    imgAncor: "https://github.com/Hackademy66/Presto.it_Gruppo_04"
  },
];

export const workExperience = [
  {
    period: "2025 - in corso",
    company: "Rueesch Abbigliamento Professionale",
    location: "Canicattì (Agrigento, Sicilia)",
    role: "Magazziniere"
  },
  {
    period: "2023 - 2024",
    company: "Rivendita Tabacchi 25",
    location: "Canicattì (Agrigento, Sicilia)",
    role: "Addetto alle Vendite"
  },
  {
    period: "2022 - 2023",
    company: "VII Coorte Ristorante",
    location: "Roma (Lazio)",
    role: "Cameriere"
  },
  {
    period: "2018 - 2022",
    company: "Adenzia Sicily Industrial",
    location: "Canicattì (Agrigento, Sicilia)",
    role: "Cameriere"
  }
];

export const languages = [
  { language: "Italiano", level: "Madrelingua" },
  { language: "Inglese", level: "Intermedio" }
];

// Timeline data per la sezione Il Mio Percorso
export const timelineData = [
  {
    year: "2019",
    title: "Diploma di Geometra",
    subtitle: "IISS Galileo Galilei - Canicattì",
    description: "Conclusione studi superiori. Basi di informatica, AutoCAD e progettazione tecnica.",
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
    year: "2023",
    title: "Full Stack Developer Bootcamp",
    subtitle: "Aulab srl - Bari",
    description: "Bootcamp intensivo: PHP, Laravel, React, MySQL. Metodologia Agile Scrum e progetti di team.",
    icon: "💻",
    type: "education"
  },
  {
    year: "2023-2024",
    title: "Sviluppo Progetti & Lavoro",
    subtitle: "Portfolio & Esperienza",
    description: "Creazione SoulsSpace Blog, Sushi Project, Shooter Game. Esperienza in retail.",
    icon: "🚀",
    type: "work"
  },
  {
    year: "2025",
    title: "Open to Work",
    subtitle: "Junior Full Stack Developer",
    description: "Alla ricerca di nuove opportunità nel mondo dello sviluppo web. React, Laravel, JavaScript.",
    icon: "⚔️",
    type: "career"
  }
];
