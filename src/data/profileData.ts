/**
 * 📋 Profile Data
 * Dati del profilo centralizzati - SINGLE SOURCE OF TRUTH
 * Aggiornato al 2026 · Profilo: Jr Full Stack Developer (AI-Augmented)
 *
 * ✅ Migrato a TypeScript con interfacce dedicate
 *
 * @module data/profileData
 */

// 🖼️ Le immagini vivono in public/img/ e sono referenziate via path assoluto.
// Nessun import statico: i percorsi sono stringhe risolte a runtime dal server
// statico di Next.js. Di conseguenza ogni <Image> che le consuma DEVE dichiarare
// width/height espliciti (oppure `fill` con un parent posizionato).

// ============================================
// 📝 TYPE DEFINITIONS
// ============================================

/** Tipologia di tappa nella timeline di carriera */
export type TimelineType = 'education' | 'work' | 'career';

/** Dati anagrafici e di contatto */
export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  location: string;
  birthDate: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  instagram: string;
}

/** Competenza tecnica con livello percentuale */
export interface Skill {
  /** Path assoluto dell'icona dentro public/ (es. "/img/icon/react.png") */
  img: string;
  name: string;
  /** Livello di padronanza 0-100 */
  level: number;
}

/** Raggruppamento testuale delle competenze (sezione CV) */
export interface TechnicalSkills {
  languages: string[];
  software: string[];
  tools: string[];
  frameworks: string[];
  editors: string[];
  aiTools: string[];
}

/** Voce del percorso formativo */
export interface EducationEntry {
  period: string;
  institution: string;
  location: string;
  title: string;
  description: string;
}

/** Progetto di portfolio con relativo case study */
export interface Project {
  /** Identificativo URL-safe: alimenta la route /projects/[slug] */
  slug: string;
  title: string;
  /** Descrizione breve mostrata nella card */
  description: string;
  /** Descrizione estesa mostrata nel case study */
  longDescription?: string;
  problem?: string;
  solution?: string;
  results?: string[];
  /** Path assoluto dell'immagine dentro public/ (es. "/img/project_soul.jpeg") */
  imgUrl: string;
  /** Link esterno a demo o repository */
  imgAncor: string;
  tech: string[];
}

/** Esperienza lavorativa */
export interface WorkExperience {
  period: string;
  company: string;
  location: string;
  role: string;
  skills: string[];
}

/** Lingua parlata con livello */
export interface Language {
  language: string;
  level: string;
  /** Valutazione da 1 a 5 */
  stars: number;
}

/** Tappa della timeline di carriera */
export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  /** Emoji rappresentativa della tappa */
  icon: string;
  type: TimelineType;
}

// ============================================
// 👤 PERSONAL INFO
// ============================================

export const personalInfo: PersonalInfo = {
  name: 'Carmelo La Mantia',
  role: 'Jr Full Stack Developer',
  tagline: 'AI-Augmented Development · Next.js · Laravel',
  location: 'Agrigento, Sicilia, Italy',
  birthDate: '12/09/2000',
  phone: '+39 3510845851',
  email: 'carmelo.la.mantia00@gmail.com',
  linkedin: 'https://www.linkedin.com/in/carmelo-la-mantia-web-developer/',
  github: 'https://github.com/MeloLM',
  instagram: 'https://www.instagram.com/carmelo_coding/',
};

// ============================================
// 📄 SUMMARY (About Me)
// ============================================

export const summary = `Jr Full Stack Developer specializzato nello stack Next.js/TypeScript e PHP/Laravel. Progetto e realizzo applicazioni web full-stack curando performance, accessibilità e type-safety, con un approccio AI-Augmented: uso gli strumenti di AI come acceleratore del workflow: scaffolding, refactoring e code review, mantenendo sempre il controllo sulle scelte architetturali. Parallelamente arricchisco il background teorico con il percorso di laurea in Ingegneria Informatica.`;

// ============================================
// 🛠️ TECHNICAL SKILLS
// ============================================

export const technicalSkills: TechnicalSkills = {
  languages: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'PHP 8.2+', 'SQL'],
  software: ['Linux', 'Postman', 'Docker', 'VS Code'],
  tools: ['Git', 'GitHub', 'GitHub Actions', 'Vite', 'Vercel'],
  frameworks: ['Next.js 14', 'React 18', 'Laravel 11', 'Bootstrap 5', 'Phaser 3'],
  editors: ['Visual Studio Code'],
  aiTools: ['GitHub Copilot', 'Claude Code', 'Prompt Engineering', 'AI-Assisted Refactoring'],
};

export const skillsData: Skill[] = [
  // Frontend
  { img: '/img/icon/html.png', name: 'HTML5', level: 90 },
  { img: '/img/icon/css.png', name: 'CSS3', level: 85 },
  { img: '/img/icon/javascript.png', name: 'JAVASCRIPT', level: 85 },
  { img: '/img/icon/typescriptren.png', name: 'TYPESCRIPT', level: 78 },
  { img: '/img/icon/react.png', name: 'REACT JS', level: 80 },
  // ⚠️ PLACEHOLDER: manca un logo Next.js in public/img/icon/
  { img: '/img/icon/react.png', name: 'NEXT JS', level: 78 },
  { img: '/img/icon/bootstrap.png', name: 'BOOTSTRAP 5', level: 85 },
  // Backend & Database
  { img: '/img/icon/php.png', name: 'PHP', level: 78 },
  { img: '/img/icon/laravel.jpg', name: 'LARAVEL', level: 75 },
  { img: '/img/icon/mysql.png', name: 'MYSQL', level: 72 },
  // ⚠️ PLACEHOLDER: mancano postgresql.png e supabase.png in public/img/icon/
  { img: '/img/icon/mysql.png', name: 'POSTGRESQL', level: 75 },
  { img: '/img/icon/mongodbren.png', name: 'SUPABASE', level: 70 },
  { img: '/img/icon/nodejs.png', name: 'NODE JS', level: 65 },
  // Tools
  { img: '/img/icon/git.png', name: 'GIT', level: 80 },
  { img: '/img/icon/github.png', name: 'GITHUB', level: 82 },
  { img: '/img/icon/vite.png', name: 'VITE', level: 72 },
  { img: '/img/icon/docker.png', name: 'DOCKER', level: 60 },
  { img: '/img/icon/chatgbt.png', name: 'AI-AUGMENTED DEV', level: 88 },
];

// ============================================
// 🎓 EDUCATION
// ============================================

export const education: EducationEntry[] = [
  {
    period: '2025 - in corso',
    institution: 'Università E-campus',
    location: 'Online / AG Sicilia',
    title: 'Laurea Triennale, Ingegneria Informatica',
    description: 'Percorso accademico in corso per approfondimento teorico e ingegneristico.',
  },
  {
    period: 'Gennaio 2023 - Aprile 2023',
    institution: 'Aulab srl',
    location: 'Bari',
    title: 'Corso di Full Stack developer',
    description: 'Bootcamp intensivo su metodologie Agile Scrum e stack PHP/Laravel/React.',
  },
  {
    period: '2021 - 2022',
    institution: 'Empatia',
    location: 'Canicattì (Agrigento)',
    title: 'Corso di Tecnico gestione siti web',
    description: 'Formazione tecnica su gestione e sviluppo siti web.',
  },
  {
    period: '2014 - 2019',
    institution: 'IISS Galileo Galilei',
    location: 'Canicattì (Agrigento)',
    title: 'Diploma di Istruzione Tecnica - C.A.T.',
    description: 'Diploma tecnico Costruzioni, Ambiente e Territorio.',
  },
];

// ============================================
// 💼 PROJECTS
// ============================================

export const projects: Project[] = [
  {
    slug: 'subsync',
    title: 'SubSync',
    description:
      'Dashboard per il monitoraggio delle spese in abbonamenti. Permette di tracciare i pagamenti, visualizzare il costo mensile normalizzato (Burn Rate) e gestire gli abbonamenti condivisi.',
    longDescription:
      'SubSync centralizza tutti gli abbonamenti ricorrenti di un utente e ne calcola il costo reale. Le sottoscrizioni con cicli di fatturazione diversi (mensile, trimestrale, annuale) vengono normalizzate su base mensile per ottenere un Burn Rate confrontabile. Costruita con Next.js e TypeScript, usa Zustand come store globale per mantenere sincronizzati dashboard, filtri e calcoli derivati senza prop drilling.',
    problem:
      "Gli abbonamenti digitali si accumulano silenziosamente e il costo reale resta invisibile: cicli di fatturazione eterogenei rendono difficile capire quanto si spende davvero ogni mese, e gli abbonamenti divisi con altre persone falsano ulteriormente il totale.",
    solution:
      'Normalizzazione di ogni piano su base mensile per un Burn Rate confrontabile, gestione delle quote per gli abbonamenti condivisi e stato globale con Zustand per ricalcolare i totali in tempo reale al variare di filtri e sottoscrizioni.',
    results: [
      'Burn Rate mensile normalizzato su cicli di fatturazione eterogenei',
      'Gestione degli abbonamenti condivisi con ripartizione delle quote',
      'State management centralizzato con Zustand, TypeScript end-to-end',
    ],
    imgUrl: '/img/subsyncScreen.png',
    imgAncor: 'https://sub-sync-repo.vercel.app/',
    tech: ['Next.js', 'React', 'TypeScript', 'Zustand'],
  },
  {
    slug: 'souls-space-platform',
    title: 'Souls Space Platform',
    description:
      "Piattaforma full-stack MVC. Autenticazione Laravel Fortify e gestione 'Boss Area' con CRUD completo.",
    longDescription:
      'Piattaforma full-stack con architettura MVC in Laravel. Autenticazione sicura tramite Laravel Fortify, gestione ruoli utente, area boss con CRUD completo protetto da middleware. Database MySQL con relazioni Eloquent ORM.',
    problem:
      'Implementare un sistema di autenticazione robusto con ruoli differenziati e sezioni protette per contenuti riservati.',
    solution:
      'Laravel Fortify per autenticazione sicura out-of-the-box, middleware personalizzati per la gestione dei ruoli, Eloquent ORM per queries type-safe.',
    results: [
      'Autenticazione sicura Laravel Fortify',
      'CRUD completo con relazioni Eloquent',
      'Design responsive Bootstrap 5',
    ],
    imgUrl: '/img/project_soul.jpeg',
    imgAncor: 'https://github.com/MeloLM/Carmelo_GamesSpace',
    tech: ['Laravel 10', 'PHP', 'MySQL', 'Bootstrap'],
  },
  {
    slug: 'knight-shooter',
    title: 'Knight Shooter (Survival Game)',
    description:
      'Browser game 2D con architettura Event-Driven Modular. Logica Object Pooling per nemici e pathfinding.',
    longDescription:
      "Knight Shooter è un browser game 2D realizzato con Phaser 3 e Vite. L'architettura Event-Driven Modular permette di separare nettamente la logica di gioco dalla presentazione. Il sistema di Object Pooling ricicla gli sprite dei nemici riducendo l'allocazione di memoria. Il pathfinding utilizza A* semplificato per movimenti fluidi degli avversari.",
    problem:
      'Creare un gioco browser performante senza framework pesanti, gestendo decine di entità simultanee senza cali di framerate.',
    solution:
      'Object Pooling per riciclare oggetti evitando il garbage collector, architettura a eventi per disaccoppiare moduli, ottimizzazione del rendering con sprite atlas.',
    results: [
      'Performance stabile a 60 FPS',
      'Architettura modulare estendibile',
      'Zero dipendenze runtime oltre Phaser 3',
    ],
    imgUrl: '/img/project_Shooter_knight.jpeg',
    imgAncor: 'https://game-shooter-clm.vercel.app/',
    tech: ['JavaScript', 'Phaser 3', 'Vite'],
  },
  {
    slug: 'soulslike-portfolio',
    title: 'SoulsLike Themed Portfolio',
    description:
      'SPA con design system ispirato a Dark Souls. Animazioni CSS complesse e UX gamificata.',
    longDescription:
      'Portfolio personale con tema Dark Souls. Design system coerente con animazioni CSS avanzate, loading screen stile Dark Souls e skeleton loaders. Ottimizzato per Core Web Vitals con Next.js 14 App Router.',
    problem:
      "Differenziarsi dai portfolio standard con un'identità visiva forte e memorabile, mantenendo però performance e accessibilità ad alto livello.",
    solution:
      'Next.js 14 App Router per SSR e ottimizzazione automatica, design system ispirato ai videogiochi, TypeScript per type-safety, testing con Vitest.',
    results: [
      'TypeScript su tutta la codebase',
      '30 test unitari in CI/CD',
      'Schema SEO JSON-LD, OpenGraph, Twitter Cards',
    ],
    imgUrl: '/img/Screen_HomePage_Portfolio.png',
    imgAncor: 'https://my-profile-ten-beta.vercel.app/',
    tech: ['Next.js 14', 'TypeScript', 'CSS3 Animations'],
  },
  {
    slug: 'black-template',
    title: 'Black Template (Project Moon)',
    description:
      'Template moderno e personalizzabile con design scuro minimalista. Struttura responsive.',
    longDescription:
      'Template HTML/CSS/JS minimale con design scuro premium. Struttura responsive mobile-first, CSS custom properties per tematizzazione rapida, layout flessibile con CSS Grid e Flexbox.',
    problem:
      'Creare un template riutilizzabile minimale ma di impatto visivo, senza dipendenze da framework pesanti.',
    solution:
      'Puro HTML5 semantico, CSS3 con custom properties e Grid layout, JavaScript vanilla per interazioni, zero dipendenze esterne.',
    results: [
      'Zero dipendenze esterne',
      'Fully responsive mobile-first',
      'CSS custom properties per tematizzazione',
    ],
    imgUrl: '/img/project_moon.jpeg',
    imgAncor: 'https://github.com/MeloLM/Black_template_Carmelo_LM',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    slug: 'sushi-restaurant',
    title: 'Sushi Restaurant App',
    description:
      'Interfaccia moderna per consultazione menù. Architettura a componenti riutilizzabili.',
    longDescription:
      'Applicazione React per la consultazione del menù di un ristorante sushi. Componenti riutilizzabili per ogni voce del menù, filtri per categoria, animazioni CSS per transizioni fluide.',
    problem:
      "Realizzare un'interfaccia menù interattiva e piacevole per utenti mobile, con navigazione rapida per categoria.",
    solution:
      'Componenti React modulari e riutilizzabili, CSS Modules per scoped styling, filtri di categoria per navigazione rapida.',
    results: [
      'Componenti 100% riutilizzabili',
      'UI ottimizzata per mobile',
      'Filtri categoria interattivi',
    ],
    imgUrl: '/img/project_sushi.jpeg',
    imgAncor: 'https://sushi-project-carmelo-lm.vercel.app/',
    tech: ['React.js', 'CSS Modules'],
  },
];

// ============================================
// 💼 WORK EXPERIENCE
// ============================================

export const workExperience: WorkExperience[] = [
  {
    period: '2025 - in corso',
    company: 'Rueesch srl',
    location: 'Canicattì (Agrigento)',
    role: 'Addetto alla logistica',
    skills: ['Gestione flussi', 'Coordinamento team', 'Rispetto scadenze'],
  },
  {
    period: '2023 - 2024',
    company: 'Rivendita Tabacchi 25',
    location: 'Canicattì (Agrigento)',
    role: 'Addetto alle vendite',
    skills: ['Gestione cassa', 'Assistenza clienti', 'Problem solving'],
  },
  {
    period: '2022 - 2023',
    company: 'VII Coorte Ristorante',
    location: 'Roma',
    role: 'Cameriere',
    skills: ['Lavoro in team', 'Gestione stress', 'Comunicazione'],
  },
];

// ============================================
// 🌍 LANGUAGES
// ============================================

export const languages: Language[] = [
  { language: 'Italiano', level: 'Madrelingua', stars: 5 },
  { language: 'Inglese', level: 'Intermedio', stars: 4 },
  { language: 'Spagnolo', level: 'Base', stars: 2 },
];

// ============================================
// 📅 TIMELINE
// ============================================

export const timelineData: TimelineEvent[] = [
  {
    year: '2014-2019',
    title: 'Diploma C.A.T.',
    subtitle: 'IISS Galileo Galilei',
    description: 'Diploma tecnico Costruzioni, Ambiente e Territorio.',
    icon: '🎓',
    type: 'education',
  },
  {
    year: '2021-2022',
    title: 'Tecnico Web',
    subtitle: 'Empatia',
    description: 'Corso di gestione e sviluppo siti web: primo contatto con il codice.',
    icon: '💡',
    type: 'education',
  },
  {
    year: '2023',
    title: 'Full Stack Bootcamp',
    subtitle: 'Aulab srl',
    description: 'Bootcamp intensivo su PHP, Laravel, React e metodologia Agile Scrum.',
    icon: '💻',
    type: 'education',
  },
  {
    year: '2023-2024',
    title: 'Esperienze Lavorative',
    subtitle: 'Vendite & Ristorazione',
    description: 'Sviluppo soft skills: gestione dello stress, problem solving e lavoro in team.',
    icon: '🤝',
    type: 'work',
  },
  {
    year: '2025',
    title: 'Università & Lavoro',
    subtitle: 'Ingegneria Informatica | Rueesch srl',
    description: 'Avvio della laurea triennale in Ingegneria Informatica affiancata al lavoro.',
    icon: '🚀',
    type: 'work',
  },
  {
    year: 'Oggi',
    title: 'Jr Full Stack Developer',
    subtitle: 'Obiettivo Professionale',
    description:
      'Alla ricerca di un team dove applicare lo stack Next.js/Laravel su progetti reali e complessi.',
    icon: '🎯',
    type: 'career',
  },
];
