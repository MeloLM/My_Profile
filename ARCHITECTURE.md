# 🏛️ Software Architecture & AI Guidelines - Carmelo La Mantia Portfolio

> **DOCUMENTO DI RIFERIMENTO TECNICO**
> Questo file definisce l'architettura software, i flussi di dati e le convenzioni di codice per il progetto Portfolio.
> **AI AGENTS:** Utilizzare questo contesto prima di generare codice.

---

## 1. 🏗 ARCHITECTURAL PATTERN

Il progetto segue un'architettura **Component-Based SPA (Single Page Application)** basata su React, con una forte separazione tra **Dati Statici** e **Logica di Presentazione**.

### Principi Core
1.  **Data-Driven UI:** L'interfaccia deve essere popolata dinamicamente leggendo `src/data/profileData.js`. Evitare hardcoding di testi nei componenti.
2.  **Centralized Configuration:** Tutte le configurazioni (API Keys, URL) passano tramite variabili d'ambiente (.env).
3.  **Serviceless Backend:** Nessun backend custom. Si utilizzano servizi PaaS/SaaS (EmailJS, Mailchimp) invocati direttamente dal client.

---

## 2. 🗺 DIRECTORY STRUCTURE (Target Architecture)

L'obiettivo è migrare dalla struttura piatta attuale a una più modulare per facilitare la manutenzione.

```text
src/
├── assets/                 # Risorse statiche (img, svg, icons)
├── components/             # Componenti UI puri
│   ├── common/             # Componenti riutilizzabili (Buttons, Loaders, SocialIcons)
│   ├── layout/             # Componenti strutturali (Navbar, Footer, Banner)
│   ├── sections/           # Sezioni della pagina (Skills, Projects, Contact, Timeline)
│   └── cards/              # Sotto-componenti specifici (ProjectCard, SkillItem)
├── data/
│   └── profileData.js      # 🧠 SINGLE SOURCE OF TRUTH (Dati CV)
├── hooks/                  # 🎣 Custom Hooks (Logica estratta dai componenti)
│   ├── useScroll.js        # Gestione scroll e navbar
│   ├── useTypewriter.js    # Logica effetto macchina da scrivere
│   └── useEmail.js         # Logica invio form (EmailJS)
├── styles/                 # 🎨 Refactoring CSS
│   ├── variables.css       # Colori globali e temi
│   ├── global.css          # Reset e typography
│   └── components/         # CSS specifici per componente (o CSS Modules)
├── utils/                  # Helper functions (validatori, formattatori date)
├── App.js                  # Main Entry point & Routing (se necessario)
└── index.js                # Bootstrap mounting