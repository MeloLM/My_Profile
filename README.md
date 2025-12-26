# 🎮 Carmelo La Mantia - Portfolio Website

> **🤖 GUIDA PER AI AGENTS - LEGGERE ATTENTAMENTE PRIMA DI OPERARE**

---

## ✨ FEATURES IMPLEMENTATE

- ✅ **Typewriter Effect** - Animazione testo nel Banner
- ✅ **Custom Cursor** - Cursore personalizzato tema gaming (spada arancione)
- ✅ **Skill Progress Bars** - Barre di progresso animate con percentuali
- ✅ **14 Skills** nel carousel con autoplay
- ✅ **CV Download Button** - Pulsante scarica CV nel Banner
- ✅ **Loading Spinner** - Animazione durante invio form
- ✅ **Form Validation** - Validazione client-side per Contact
- ✅ **Scroll Animations** - CSS classes per animazioni on-scroll
- ✅ **Hover Effects** - Cards progetto con zoom effect
- ✅ **SEO Ottimizzato** - Meta tags, Open Graph, keywords
- ✅ **Accessibilità** - aria-labels, roles, semantic HTML
- ✅ **SocialIcons Component** - Componente riutilizzabile
- ✅ **Bottoni Banner Uniformi** - Contact Me e Download CV con stesso stile
- ✅ **Skill Images Uniformi** - Icone skill con dimensioni fisse (80x80px)
- ✅ **Banner Stabile** - Typewriter con spazio non-breaking per evitare shift
- ✅ **Lazy Loading** - Immagini caricate on-demand per performance
- ✅ **Loading Screen** - Schermata caricamento tematica Dark Souls con bonfire 🔥
- ✅ **Easter Egg Bonfire** - Clicca sul bonfire per "BONFIRE LIT!"
- ✅ **Reveal on Scroll** - Animazioni elementi che appaiono allo scroll
- ✅ **Timeline Orizzontale** - Scorrimento orizzontale con frecce navigazione, 5 tappe carriera
- ✅ **ProfileData.js** - File centralizzato per dati CV (educazione, skills, progetti, esperienza)
- ✅ **Banner Responsive** - Font-size adattivo per schermi grandi, no wrap del typewriter

---

## 📋 INDICE RAPIDO

1. [Overview Progetto](#-overview-progetto)
2. [Stack Tecnologico](#-stack-tecnologico)
3. [Struttura Files](#-struttura-files-dettagliata)
4. [Mappa Componenti](#-mappa-componenti)
5. [Flusso Dati](#-flusso-dati)
6. [Stili e Theming](#-stili-e-theming)
7. [Configurazioni Critiche](#-configurazioni-critiche)
8. [Punti di Intervento](#-punti-di-intervento-per-miglioramenti)
9. [Bug Noti e Fix](#-bug-noti-e-fix-necessari)
10. [Come Avviare](#-come-avviare)

---

## 🎯 OVERVIEW PROGETTO

**Tipo:** Portfolio Personale / Single Page Application (SPA)  
**Proprietario:** Carmelo La Mantia  
**Ruolo:** Full Stack Developer (Junior)  
**Location:** Agrigento, Sicilia  
**Tema Visivo:** Dark Theme con accenti arancioni (ispirazione Dark Souls/Gaming)

### Scopo
Presentare competenze, progetti e permettere il contatto diretto con il proprietario.

### Sezioni Principali
1. **Banner** - Hero section con effetto typewriter
2. **Skills** - Carousel delle competenze tecniche
3. **Projects** - Galleria progetti con tabs
4. **Contact** - Form contatto con EmailJS
5. **Footer** - Newsletter Mailchimp + Social Links

---

## 🛠 STACK TECNOLOGICO

### Frontend Core
| Tecnologia | Versione | Utilizzo |
|------------|----------|----------|
| React | 18.2.0 | Framework principale |
| React-Bootstrap | 2.7.4 | Componenti UI |
| Bootstrap | 5.2.3 | Grid system e utilities |

### Librerie Aggiuntive
| Libreria | Scopo |
|----------|-------|
| `react-multi-carousel` | Slider skills con autoplay |
| `react-icons` / `react-bootstrap-icons` | Icone social e UI |
| `@emailjs/browser` | Invio email senza backend |
| `react-mailchimp-subscribe` | Newsletter subscription |

> ✅ **NOTA:** Backend rimosso (express, cors, nodemailer). Si usa EmailJS client-side.

---

## 📁 STRUTTURA FILES DETTAGLIATA

```
My_Profile-main/
├── public/
│   ├── index.html          # Entry point HTML - Contiene titolo e favicon
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt          # SEO
│   └── Melo_icon.ico       # Favicon personalizzata
│
├── src/
│   ├── App.js              # 🎯 ROOT COMPONENT - Assembla tutte le sezioni
│   ├── App.css             # 🎨 STILI GLOBALI (1026+ righe) - TUTTO QUI
│   ├── index.js            # Bootstrap React + imports CSS globali
│   ├── index.css           # Stili aggiuntivi minimi
│   │
│   ├── data/
│   │   └── profileData.js  # 📊 DATI CV CENTRALIZZATI - Modifica qui per aggiornare tutto
│   │
│   ├── components/
│   │   ├── Vnavbar.js      # Navigation bar con scroll effect
│   │   ├── Banner.js       # Hero section + Typewriter effect
│   │   ├── Skills.js       # Carousel competenze
│   │   ├── Projects.js     # Griglia progetti con tabs
│   │   ├── ProjectCard.js  # Card singolo progetto
│   │   ├── Contact.js      # Form contatto (EmailJS) + Easter egg bonfire
│   │   ├── Timeline.js     # Timeline orizzontale con frecce, usa profileData.js
│   │   ├── Footer.js       # Footer + Newsletter wrapper
│   │   ├── MailForm.js     # Wrapper Mailchimp
│   │   └── Newsletter.js   # Form newsletter
│   │
│   └── assets/
│       └── img/
│           ├── icon/       # 28 icone tecnologie (PNG)
│           ├── *.svg       # Immagini vettoriali (bonfire, solaire, arrows)
│           ├── *.png       # Backgrounds e decorazioni
│           └── *.jpeg      # Screenshot progetti
│
└── package.json            # Dipendenze e scripts
```

---

## 🔧 MAPPA COMPONENTI

### Gerarchia Rendering (App.js)
```
App
├── Loading Screen           → Dark Souls themed, bonfire animation (2.5s)
├── NavBar (Vnavbar.js)     → Fixed top, cambia stile on scroll
├── Banner                   → Hero con typewriter animation (responsive font-size)
├── Skills                   → Carousel auto-scroll
├── Projects                 → ProjectCard children con reveal on scroll
├── Timeline                 → Scorrimento orizzontale con frecce navigazione (5 tappe)
├── Contact                  → Form EmailJS + Easter egg bonfire
└── Footer
    └── MailForm
        └── Newsletter       → Form Mailchimp
```

### Componenti e loro Props/State

#### `Vnavbar.js`
```javascript
State: activeLink, scrolled
Effect: Listener scroll per cambio background
```

#### `Banner.js`
```javascript
State: loopNum, isDeleting, text, delta
Effect: Typewriter con array ["Web Dev", "Front-End Dev", "Back-End Dev"]
Props: Nessuna
```

#### `Skills.js`
```javascript
Data: Array skills con 14 tecnologie + livelli percentuali
Carousel: autoPlay, responsive config, progress bars animate
```

#### `Projects.js`
```javascript
Data: Array `projects` hardcoded (4 progetti reali)
Child: <ProjectCard /> con hover zoom effect
```

#### `ProjectCard.js`
```javascript
Props: { title, description, imgUrl, imgAncor }
Render: Card con hover effect
```

#### `Contact.js`
```javascript
State: formDetails, buttonText, status
Ref: form (per EmailJS)
Service: EmailJS
```

#### `Newsletter.js` (via MailForm.js)
```javascript
Props: { onValidated, status, message }
Service: Mailchimp Subscribe
```

#### `Timeline.js`
```javascript
Data: Importato da profileData.js (5 tappe: 2019-2025)
Feature: Scorrimento orizzontale, frecce navigazione
Ref: scrollRef per smooth scroll
```

---

## 🔄 FLUSSO DATI

### Form Contatto (Contact.js)
```
User Input → formDetails state → EmailJS.sendForm() → Console log result
                                                    → Status message UI
```

### Newsletter (Newsletter.js)
```
Email Input → handleSubmit → onValidated(EMAIL) → Mailchimp API → status prop
```

### Navigation
```
Click Nav.Link → setActiveLink() → CSS class .active
Scroll > 50px → setScrolled(true) → Navbar background change
```

### ProfileData (src/data/profileData.js)
```
File centralizzato → Esporta tutti i dati:
  - personalInfo (nome, email, social)
  - summary (profilo professionale)
  - technicalSkills (languages, frameworks, tools)
  - education (Diploma, Empatia, Aulab)
  - projects (SoulsSpace, Sushi, Shooter, etc.)
  - workExperience (Rueesch, Tabacchi, etc.)
  - timelineData (5 tappe per Timeline component)
```

---

## 🎨 STILI E THEMING

### CSS Variables (App.css :root)
```css
--first-color: rgb(0,0,0);           /* Nero puro */
--second-color: rgb(14,14,14);       /* Grigio scurissimo */
--main-color: rgb(224,136,33);       /* ARANCIONE PRINCIPALE */
--hover-color: rgba(224,135,33,0.804); /* Arancione trasparente */
```

### Palette Colori Usati
| Colore | HEX/RGB | Uso |
|--------|---------|-----|
| Background | #121212 | Body principale |
| Testo | #fff | Primario |
| Testo secondario | #B8B8B8 | Paragrafi |
| Accent | rgb(224,136,33) | CTA, bordi, hover |

### Sezioni CSS in App.css
1. **Default CSS** (righe 1-150) - Reset, base, loading screen
2. **Scrollbar** (righe 150-170) - Custom scrollbar arancione
3. **Navbar** (righe 170-320) - Fixed nav con transizioni
4. **Banner** (righe 320-470) - Hero + typewriter responsive
5. **Skills** (righe 470-520) - Carousel container + progress bars
6. **Projects** (righe 520-620) - Cards con hover effects
7. **Timeline** (righe 620-730) - Scorrimento orizzontale + frecce
8. **Contact** (righe 730-850) - Form styling + bonfire easter egg
9. **Footer** (righe 850-1000+) - Newsletter + credits

### Background Images
- `banner-bg2.png` - Background hero (fixed attachment)
- `color-sharp2.png` - Decorazione destra progetti

---

## ⚙️ CONFIGURAZIONI CRITICHE

### EmailJS (Contact.js)
```javascript
// Usa variabili d'ambiente con fallback
emailjs.sendForm(
  process.env.REACT_APP_EMAILJS_SERVICE || 'service_gt2uoevD',
  process.env.REACT_APP_EMAILJS_TEMPLATE || 'template_y6xpk4a',
  form.current,
  process.env.REACT_APP_EMAILJS_KEY || 'kforPiP9Kqq8o2cYk'
)
```

### Mailchimp (MailForm.js)
```javascript
const postUrl = `${process.env.REACT_APP_MAILCHIMP_URL}?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;
```

### Social Links
| Platform | URL |
|----------|-----|
| LinkedIn | linkedin.com/in/carmelo-la-mantia-web-developer/ |
| Instagram | @carmelo_coding |
| GitHub | github.com/MeloLM |
| Email | carmelo.la.mantia00@gmail.com |

---

## 🚨 BUG NOTI E FIX NECESSARI

> ✅ **TUTTI I BUG CRITICI SONO STATI RISOLTI** (Dicembre 2025)

### Bug Risolti:
1. ✅ Mailchimp URL ($id → &id)
2. ✅ Typo status Contact (succes → success)
3. ✅ setStatus logic con gestione errori corretta
4. ✅ Security: rel="noopener noreferrer" aggiunto
5. ✅ EmailJS usa variabili d'ambiente
6. ✅ useEffect dependencies in Banner
7. ✅ Dipendenze inutilizzate rimosse (express, cors, nodemailer)

---

## 🎯 PUNTI DI INTERVENTO PER MIGLIORAMENTI

### ✅ COMPLETATI (Dicembre 2025)
1. ✅ File .env creato con credenziali
2. ✅ Bug Mailchimp URL fixato (& invece di $)
3. ✅ Gestione errori Contact form corretta
4. ✅ Validazione form aggiunta
5. ✅ SEO: meta description e Open Graph
6. ✅ Accessibilità: aria-labels aggiunti
7. ✅ Placeholder progetti rimossi
8. ✅ Tabs inutilizzate rimosse
9. ✅ SocialIcons component creato
10. ✅ Skill progress bars con percentuali
11. ✅ Loading spinner per form
12. ✅ CV download button
13. ✅ Custom cursor tema gaming
14. ✅ Hover effects sui progetti
15. ✅ Bottoni banner uniformi
16. ✅ Skill images dimensioni uniformi
17. ✅ Banner stabile (no shift typewriter)
18. ✅ Lazy loading immagini
19. ✅ Loading screen Dark Souls (bonfire animation)
20. ✅ Easter egg Bonfire (click to lit!)
21. ✅ Reveal on scroll animations
22. ✅ Timeline carriera animata
23. ✅ Effetto parallax su scroll
24. ✅ Timeline orizzontale con scorrimento
25. ✅ ProfileData.js centralizzato
26. ✅ Banner responsive font-size
27. ✅ Typewriter white-space nowrap

### 🟡 DA IMPLEMENTARE (Futuro)

28. **Dark/Light mode toggle**
29. **Sezione "About Me"** più dettagliata
30. **i18n** (italiano/inglese)
31. **PWA completa** con offline support
32. **Unit tests**
33. **Achievements section** - Certificazioni/Badge
34. **Uso automatico profileData** - Popolare Skills, Projects, Banner da profileData.js

---

## 🚀 COME AVVIARE

### Prerequisiti
- Node.js >= 16
- npm o yarn

### Installazione
```bash
cd My_Profile-main
npm install
```

### Development
```bash
npm start
# Apre http://localhost:3000
```

### Build Production
```bash
npm run build
# Output in /build
```

### Environment Variables Necessarie
Creare file `.env` nella root:
```env
# Mailchimp
REACT_APP_MAILCHIMP_URL=your_mailchimp_url
REACT_APP_MAILCHIMP_U=your_u_value
REACT_APP_MAILCHIMP_ID=your_list_id

# EmailJS
REACT_APP_EMAILJS_SERVICE=service_gt2uoevD
REACT_APP_EMAILJS_TEMPLATE=template_y6xpk4a
REACT_APP_EMAILJS_KEY=kforPiP9Kqq8o2cYk
```

---

## 📝 NOTE PER AI AGENTS

### ⚡ Quick Reference - Dove Mettere le Mani

| Voglio modificare... | File |
|---------------------|------|
| **DATI CV/INFO PERSONALI** | `src/data/profileData.js` 🔥 **MODIFICA QUI!** |
| Colori/Stili | `src/App.css` |
| Testo hero | `src/components/Banner.js` |
| Skills carousel | `src/components/Skills.js` |
| Progetti | `src/components/Projects.js` |
| Timeline carriera | `src/data/profileData.js` (timelineData) |
| Form contatto | `src/components/Contact.js` |
| Social links | `src/components/Vnavbar.js` + `src/components/Footer.js` |
| SEO/Title | `public/index.html` |
| Nuove immagini | `src/assets/img/` |
| Nuove icone tech | `src/assets/img/icon/` |

### Pattern utilizzati:
- **Functional components** con Hooks (useState, useEffect, useRef)
- **Named exports** per componenti piccoli (`ProjectCard`, `Newsletter`, `MailForm`)
- **Default exports** per componenti sezione (`Banner`, `Skills`, `Projects`, `Contact`, `Footer`, `NavBar`)
- **Inline styles** solo per colori dinamici (es. scrolled GitHub icon color)
- **Bootstrap Grid** (Container, Row, Col) per layout responsive

### ⚠️ Non toccare senza capire:
- `index.js` - L'ordine degli import CSS è importante
- `useEffect` in `Banner.js` - Logica typewriter delicata, facilmente rompibile
- CSS transitions in `App.css` - Molti effetti hover sono interconnessi
- Carousel responsive breakpoints in `Skills.js`

### Testing:
- Nessun test significativo implementato
- `App.test.js` e `setupTests.js` sono default CRA (smoke test)

### Comandi utili per debug:
```bash
# Controllare errori lint
npm run build

# Vedere warnings in console
npm start
```

---

## 🔗 LINK UTILI

- **GitHub Repo Owner:** [github.com/MeloLM](https://github.com/MeloLM)
- **LinkedIn:** [Carmelo La Mantia](https://www.linkedin.com/in/carmelo-la-mantia-web-developer/)
- **EmailJS Dashboard:** [emailjs.com/docs](https://www.emailjs.com/docs/)
- **React Bootstrap Docs:** [react-bootstrap.github.io](https://react-bootstrap.github.io/)
- **React Multi Carousel:** [npm react-multi-carousel](https://www.npmjs.com/package/react-multi-carousel)

---

## 📊 LISTA ASSETS DISPONIBILI

### Icone Tecnologie (`src/assets/img/icon/`)
```
androidStudio.jpg, bootstrap.png, canva.png, chatgbt.png, css.png,
docker.png, figma.png, filament.png, flutter.png, git.png, github.png,
html.png, java.png, javascript.png, laravel.jpg, mongodbren.png,
mysql.png, nodejs.png, php.png, phyton.png, promptbase.jpg, react.png,
typescriptren.png, visual-studio-code.jpg, vite.png, vite.webp,
wordpress.png, xml.jpg
```

### Immagini Principali (`src/assets/img/`)
```
solaire.svg      → Immagine hero banner
bonfire.svg      → Immagine sezione contact
banner-bg2.png   → Background hero
color-sharp2.png → Decorazione projects
Melo_icon.png    → Logo footer
project_*.jpeg   → Screenshot progetti
```

---

*Ultimo aggiornamento: 21 Dicembre 2025*  
*Versione Portfolio: 1.2.0*  
*Ultimo commit: Timeline orizzontale + profileData.js centralizzato*  
