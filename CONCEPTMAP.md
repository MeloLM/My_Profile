# 🗺️ CONCEPT MAP - AI Navigation System

> **FAST ACCESS GUIDE**
> Mappa concettuale per navigazione rapida nel progetto.
> Usare questa guida per localizzare immediatamente file e logiche.

---

## 🎯 QUICK LOOKUP TABLE

```
┌─────────────────────────────────────────────────────────────────────────┐
│  COSA CERCHI?              │  DOVE TROVARLO                            │
├─────────────────────────────────────────────────────────────────────────┤
│  Entry Point               │  src/index.js                             │
│  App Principal             │  src/App.js                               │
│  Dati Personali           │  src/data/profileData.js                  │
│  Stili Globali            │  src/App.css                              │
├─────────────────────────────────────────────────────────────────────────┤
│  LAYOUT                                                                 │
│  ├─ Navbar                │  src/components/layout/Navbar.js          │
│  ├─ Banner (Hero)         │  src/components/layout/Banner.js          │
│  ├─ Footer                │  src/components/layout/Footer.js          │
│  ├─ Newsletter Form       │  src/components/layout/Newsletter.js      │
│  └─ Mailchimp Form        │  src/components/layout/MailForm.js        │
├─────────────────────────────────────────────────────────────────────────┤
│  SECTIONS                                                               │
│  ├─ Skills                │  src/components/sections/Skills.js        │
│  ├─ Projects              │  src/components/sections/Projects.js      │
│  ├─ Timeline              │  src/components/sections/Timeline.js      │
│  └─ Contact               │  src/components/sections/Contact.js       │
├─────────────────────────────────────────────────────────────────────────┤
│  CARDS                                                                  │
│  └─ ProjectCard           │  src/components/cards/ProjectCard.js      │
├─────────────────────────────────────────────────────────────────────────┤
│  COMMON                                                                 │
│  └─ SocialIcons           │  src/components/common/SocialIcons.js     │
├─────────────────────────────────────────────────────────────────────────┤
│  HOOKS (Future)           │  src/hooks/                               │
│  UTILS (Future)           │  src/utils/                               │
│  STYLES (Future)          │  src/styles/                              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔗 DEPENDENCY GRAPH (Chi importa cosa)

```
                            ┌─────────────┐
                            │   App.js    │
                            └──────┬──────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
        ▼                          ▼                          ▼
   ┌─────────┐              ┌─────────────┐            ┌──────────┐
   │ LAYOUT  │              │  SECTIONS   │            │  STYLES  │
   └────┬────┘              └──────┬──────┘            └──────────┘
        │                          │                        │
   ┌────┴────┐              ┌──────┴──────┐                 │
   │         │              │             │                 ▼
   ▼         ▼              ▼             ▼            App.css
Navbar   Banner          Skills       Projects
   │       │              │             │
   │       │              ▼             ▼
   │       │           Carousel    ProjectCard
   │       │              │             │
   └───┬───┘              └──────┬──────┘
       │                         │
       ▼                         ▼
  SocialIcons              profileData.js
```

---

## 📍 PATH SHORTCUTS

```pseudocode
// Definizione paths assoluti per accesso rapido
PATHS = {
    ROOT:       "c:/Users/xlrot/OneDrive/Desktop/WA_VScode/Web/My_Profile-main",
    SRC:        "{ROOT}/src",
    COMPONENTS: "{SRC}/components",
    LAYOUT:     "{COMPONENTS}/layout",
    SECTIONS:   "{COMPONENTS}/sections",
    CARDS:      "{COMPONENTS}/cards",
    COMMON:     "{COMPONENTS}/common",
    DATA:       "{SRC}/data",
    HOOKS:      "{SRC}/hooks",
    UTILS:      "{SRC}/utils",
    STYLES:     "{SRC}/styles",
    ASSETS:     "{SRC}/assets"
}
```

---

## 🧭 NAVIGATION COMMANDS

```pseudocode
// Per trovare rapidamente un componente
FIND_COMPONENT(name):
    IF name IN ["Navbar", "Banner", "Footer", "MailForm", "Newsletter"]:
        RETURN PATHS.LAYOUT + "/" + name + ".js"
    ELIF name IN ["Skills", "Projects", "Timeline", "Contact"]:
        RETURN PATHS.SECTIONS + "/" + name + ".js"
    ELIF name IN ["ProjectCard"]:
        RETURN PATHS.CARDS + "/" + name + ".js"
    ELIF name IN ["SocialIcons"]:
        RETURN PATHS.COMMON + "/" + name + ".js"
    ELSE:
        SEARCH_IN(PATHS.SRC)

// Per trovare dove sono i dati
FIND_DATA(type):
    SOURCE = PATHS.DATA + "/profileData.js"
    IF type == "personal":     RETURN "personalInfo"
    IF type == "skills":       RETURN "technicalSkills"  
    IF type == "timeline":     RETURN "timelineData"
    IF type == "projects":     RETURN "projects"
    IF type == "education":    RETURN "education"
    IF type == "work":         RETURN "workExperience"
```

---

## 🔧 EDIT PATTERNS

```pseudocode
// Pattern per modifiche comuni
EDIT_PATTERN = {
    
    // Aggiungere nuova skill
    ADD_SKILL: {
        FILE: "src/components/sections/Skills.js",
        LOCATION: "skills array",
        TEMPLATE: "{ img: logo, name: 'SKILL_NAME', level: XX }"
    },
    
    // Aggiungere nuovo progetto
    ADD_PROJECT: {
        FILE: "src/components/sections/Projects.js",
        LOCATION: "projects array",
        TEMPLATE: "{ title, description, imgUrl, imgAncor }"
    },
    
    // Modificare info personali
    EDIT_PERSONAL: {
        FILE: "src/data/profileData.js",
        EXPORT: "personalInfo"
    },
    
    // Modificare timeline
    EDIT_TIMELINE: {
        FILE: "src/data/profileData.js",
        EXPORT: "timelineData"
    },
    
    // Modificare stili globali
    EDIT_STYLES: {
        FILE: "src/App.css"
    },
    
    // Modificare link social
    EDIT_SOCIAL: {
        FILE: "src/components/common/SocialIcons.js"
    }
}
```

---

## 📊 FILE RELATIONSHIPS MATRIX

```
                    profileData │ SocialIcons │ ProjectCard │ App.css
─────────────────────────────────────────────────────────────────────
Navbar.js           │     ✗     │      ✓      │      ✗      │   ✓
Banner.js           │     ✗     │      ✗      │      ✗      │   ✓
Footer.js           │     ✗     │      ✓      │      ✗      │   ✓
Skills.js           │     ✗     │      ✗      │      ✗      │   ✓
Projects.js         │     ✗     │      ✗      │      ✓      │   ✓
Timeline.js         │     ✓     │      ✗      │      ✗      │   ✓
Contact.js          │     ✗     │      ✗      │      ✗      │   ✓

✓ = Dipende da    ✗ = Non dipende
```

---

## ⚡ ACTION RECIPES

```pseudocode
// Ricette per azioni comuni

RECIPE_NEW_SECTION:
    1. CREATE file in src/components/sections/NewSection.js
    2. IMPORT in App.js
    3. ADD to JSX in App.js
    4. ADD styles in App.css
    5. ADD navigation link in Navbar.js

RECIPE_NEW_CARD:
    1. CREATE file in src/components/cards/NewCard.js
    2. IMPORT in parent section component
    3. USE in parent's map function

RECIPE_UPDATE_DATA:
    1. OPEN src/data/profileData.js
    2. FIND relevant export (personalInfo, timelineData, etc.)
    3. MODIFY data
    4. SAVE → Auto-refresh

RECIPE_ADD_ENV_VAR:
    1. ADD to .env file: REACT_APP_VARNAME=value
    2. ACCESS via: process.env.REACT_APP_VARNAME
    3. RESTART dev server
```

---

## 🎯 COMPONENT ANATOMY

```pseudocode
// Struttura standard di un componente

COMPONENT_TEMPLATE:
    /**
     * 📄 ComponentName Component - [Category]
     * Descrizione breve
     */
    
    // 1. IMPORTS
    import { hooks } from 'react';
    import { libs } from 'libraries';
    import LocalComponent from './path';
    import data from '../data/profileData';
    import './styles.css';
    import asset from '../assets/path';
    
    // 2. COMPONENT DEFINITION
    export default function ComponentName() {
        // 2.1 Hooks
        const [state, setState] = useState(initial);
        
        // 2.2 Effects
        useEffect(() => {}, [deps]);
        
        // 2.3 Handlers
        const handleEvent = () => {};
        
        // 2.4 Render
        return (
            <section id="component-id">
                {/* JSX */}
            </section>
        );
    }
```

---

## 🔍 SEARCH PATTERNS

```pseudocode
// Pattern di ricerca per problemi comuni

FIND_BUG(type):
    IF type == "import_error":
        SEARCH: "import.*from"
        CHECK: paths relativi corretti
    
    IF type == "missing_export":
        SEARCH: "export default|export const"
        CHECK: nome corrisponde all'import
    
    IF type == "undefined_data":
        CHECK: profileData.js exports
        CHECK: destructuring corretto
    
    IF type == "style_not_applied":
        CHECK: className spelling
        CHECK: App.css selettori
        CHECK: specificità CSS
```

---

## 📁 EXPECTED STRUCTURE (Architecture Compliance)

```pseudocode
EXPECTED_FILES = {
    "src/components/layout/": [
        "Banner.js",
        "Navbar.js", 
        "Footer.js",
        "MailForm.js",
        "Newsletter.js"
    ],
    "src/components/sections/": [
        "Skills.js",
        "Projects.js",
        "Timeline.js",
        "Contact.js"
    ],
    "src/components/cards/": [
        "ProjectCard.js"
    ],
    "src/components/common/": [
        "SocialIcons.js"
    ],
    "src/data/": [
        "profileData.js"
    ],
    "src/hooks/": [],      // Future expansion
    "src/utils/": [],      // Future expansion  
    "src/styles/": []      // Future expansion
}

EXPECTED_EXPORTS_PROFILEDATA = [
    "personalInfo",
    "summary",
    "technicalSkills",
    "education",
    "projects",
    "workExperience",
    "languages",
    "timelineData"
]
```

---

**Fine Concept Map** 🗺️
