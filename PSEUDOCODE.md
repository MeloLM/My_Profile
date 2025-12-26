# 🔍 PSEUDOCODE ARCHITECTURE - Portfolio Project

> **AI NAVIGATION GUIDE**
> Questo documento traduce l'architettura in pseudocodice logico per facilitare la comprensione dei flussi e delle dipendenze.
> **STATO**: ✅ Struttura implementata e funzionante

---

## 🎯 PATTERN ARCHITETTURALE

```
PATTERN: Component-Based SPA
├── PRINCIPLE_1: Data-Driven UI
│   └── READ profileData.js → RENDER Components
├── PRINCIPLE_2: Centralized Config  
│   └── READ .env → INJECT into Services
└── PRINCIPLE_3: Serviceless Backend
    └── CALL External_APIs (EmailJS, Mailchimp)
```

---

## 📂 STRUTTURA ATTUALE (Implementata)

```pseudocode
PROJECT_ROOT/
│
├── public/
│   ├── index.html          # HTML_TEMPLATE
│   ├── manifest.json       # PWA_CONFIG
│   └── robots.txt          # SEO_DIRECTIVES
│
└── src/
    │
    ├── index.js            # ENTRY_POINT
    │   └── RENDER(<App />, DOM_ROOT)
    │
    ├── App.js              # MAIN_ORCHESTRATOR
    │   ├── IMPORT all_section_components
    │   ├── DEFINE routing (if needed)
    │   └── RETURN (
    │       <Layout>
    │           <Banner />
    │           <Skills />
    │           <Timeline />
    │           <Projects />
    │           <Contact />
    │       </Layout>
    │   )
    │
    ├── data/
    │   └── profileData.js  # 🧠 SINGLE_SOURCE_OF_TRUTH
    │       ├── EXPORT personalInfo { name, title, bio, avatar }
    │       ├── EXPORT skills [ { name, level, icon } ]
    │       ├── EXPORT timeline [ { date, title, description } ]
    │       ├── EXPORT projects [ { title, description, tech, links, image } ]
    │       ├── EXPORT socialLinks [ { platform, url, icon } ]
    │       └── EXPORT contactInfo { email, phone, location }
    │
    ├── components/
    │   │
    │   ├── common/         # REUSABLE_COMPONENTS
    │   │   ├── Button.js
    │   │   │   └── FUNCTION Button(props)
    │   │   │       ├── DESTRUCTURE { text, onClick, variant }
    │   │   │       └── RETURN <button className={variant} onClick={onClick}>{text}</button>
    │   │   │
    │   │   ├── Loader.js
    │   │   │   └── FUNCTION Loader()
    │   │   │       └── RETURN <div className="spinner">Loading...</div>
    │   │   │
    │   │   └── SocialIcons.js
    │   │       └── FUNCTION SocialIcons()
    │   │           ├── IMPORT { socialLinks } from data/profileData
    │   │           └── RETURN socialLinks.map(link => 
    │   │               <a href={link.url}>
    │   │                   <img src={link.icon} alt={link.platform} />
    │   │               </a>
    │   │           )
    │   │
    │   ├── layout/         # STRUCTURAL_COMPONENTS
    │   │   ├── Navbar.js
    │   │   │   └── FUNCTION Navbar()
    │   │   │       ├── USE_HOOK useScroll() → scrolled
    │   │   │       ├── IF scrolled THEN className="navbar-scrolled"
    │   │   │       └── RETURN <nav className={navClass}>
    │   │   │           <Logo />
    │   │   │           <NavLinks />
    │   │   │       </nav>
    │   │   │
    │   │   ├── Footer.js
    │   │   │   └── FUNCTION Footer()
    │   │   │       ├── IMPORT { personalInfo } from data/profileData
    │   │   │       └── RETURN <footer>
    │   │   │           <SocialIcons />
    │   │   │           <Copyright>{personalInfo.name}</Copyright>
    │   │   │       </footer>
    │   │   │
    │   │   └── Banner.js
    │   │       └── FUNCTION Banner()
    │   │           ├── IMPORT { personalInfo } from data/profileData
    │   │           ├── USE_HOOK useTypewriter(personalInfo.title) → typedText
    │   │           └── RETURN <header>
    │   │               <h1>{personalInfo.name}</h1>
    │   │               <p>{typedText}</p>
    │   │               <img src={personalInfo.avatar} />
    │   │           </header>
    │   │
    │   ├── sections/       # PAGE_SECTIONS
    │   │   ├── Skills.js
    │   │   │   └── FUNCTION Skills()
    │   │   │       ├── IMPORT { skills } from data/profileData
    │   │   │       └── RETURN <section id="skills">
    │   │   │           <h2>My Skills</h2>
    │   │   │           {skills.map(skill => 
    │   │   │               <SkillItem key={skill.name} {...skill} />
    │   │   │           )}
    │   │   │       </section>
    │   │   │
    │   │   ├── Timeline.js
    │   │   │   └── FUNCTION Timeline()
    │   │   │       ├── IMPORT { timeline } from data/profileData
    │   │   │       └── RETURN <section id="timeline">
    │   │   │           <h2>My Journey</h2>
    │   │   │           {timeline.map(event => 
    │   │   │               <TimelineItem key={event.date} {...event} />
    │   │   │           )}
    │   │   │       </section>
    │   │   │
    │   │   ├── Projects.js
    │   │   │   └── FUNCTION Projects()
    │   │   │       ├── IMPORT { projects } from data/profileData
    │   │   │       └── RETURN <section id="projects">
    │   │   │           <h2>My Projects</h2>
    │   │   │           <div className="project-grid">
    │   │   │               {projects.map(project => 
    │   │   │                   <ProjectCard key={project.title} {...project} />
    │   │   │               )}
    │   │   │           </div>
    │   │   │       </section>
    │   │   │
    │   │   └── Contact.js
    │   │       └── FUNCTION Contact()
    │   │           ├── IMPORT { contactInfo } from data/profileData
    │   │           ├── USE_HOOK useEmail() → { sendEmail, status }
    │   │           └── RETURN <section id="contact">
    │   │               <h2>Contact Me</h2>
    │   │               <p>{contactInfo.email}</p>
    │   │               <MailForm onSubmit={sendEmail} />
    │   │               <Newsletter />
    │   │           </section>
    │   │
    │   └── cards/          # SUB_COMPONENTS
    │       ├── ProjectCard.js
    │       │   └── FUNCTION ProjectCard({ title, description, tech, links, image })
    │       │       └── RETURN <div className="card">
    │       │           <img src={image} alt={title} />
    │       │           <h3>{title}</h3>
    │       │           <p>{description}</p>
    │       │           <TechStack techs={tech} />
    │       │           <CardActions links={links} />
    │       │       </div>
    │       │
    │       ├── SkillItem.js
    │       │   └── FUNCTION SkillItem({ name, level, icon })
    │       │       └── RETURN <div className="skill">
    │       │           <img src={icon} alt={name} />
    │       │           <span>{name}</span>
    │       │           <ProgressBar value={level} />
    │       │       </div>
    │       │
    │       └── TimelineItem.js
    │           └── FUNCTION TimelineItem({ date, title, description })
    │               └── RETURN <div className="timeline-event">
    │                   <time>{formatDate(date)}</time>
    │                   <h4>{title}</h4>
    │                   <p>{description}</p>
    │               </div>
    │
    ├── hooks/              # CUSTOM_HOOKS (Logic Extraction)
    │   ├── useScroll.js
    │   │   └── FUNCTION useScroll()
    │   │       ├── STATE scrolled = false
    │   │       ├── EFFECT on_mount
    │   │       │   ├── LISTEN window.scroll
    │   │       │   └── IF scrollY > 50 THEN setScrolled(true)
    │   │       └── RETURN scrolled
    │   │
    │   ├── useTypewriter.js
    │   │   └── FUNCTION useTypewriter(text, speed=100)
    │   │       ├── STATE displayedText = ""
    │   │       ├── EFFECT on_mount
    │   │       │   ├── FOR each char in text
    │   │       │   │   ├── WAIT speed ms
    │   │       │   │   └── APPEND char to displayedText
    │   │       └── RETURN displayedText
    │   │
    │   └── useEmail.js
    │       └── FUNCTION useEmail()
    │           ├── STATE status = { loading, error, success }
    │           ├── FUNCTION sendEmail(formData)
    │           │   ├── SET status.loading = true
    │           │   ├── TRY
    │           │   │   ├── CALL EmailJS.send(
    │           │   │   │   service_id: ENV.EMAILJS_SERVICE_ID,
    │           │   │   │   template_id: ENV.EMAILJS_TEMPLATE_ID,
    │           │   │   │   data: formData
    │           │   │   │   )
    │           │   │   └── SET status.success = true
    │           │   ├── CATCH error
    │           │   │   └── SET status.error = error.message
    │           │   └── FINALLY
    │           │       └── SET status.loading = false
    │           └── RETURN { sendEmail, status }
    │
    ├── styles/             # CSS_ARCHITECTURE
    │   ├── variables.css
    │   │   └── DEFINE
    │   │       ├── --color-primary
    │   │       ├── --color-secondary
    │   │       ├── --font-family
    │   │       ├── --spacing-unit
    │   │       └── --breakpoint-*
    │   │
    │   ├── global.css
    │   │   └── DEFINE
    │   │       ├── * { box-sizing, margin, padding }
    │   │       ├── body { font, background, color }
    │   │       └── TYPOGRAPHY (h1, h2, p, a)
    │   │
    │   └── components/
    │       ├── Banner.module.css
    │       ├── Skills.module.css
    │       ├── Projects.module.css
    │       └── Contact.module.css
    │
    ├── utils/              # HELPER_FUNCTIONS
    │   ├── validators.js
    │   │   ├── FUNCTION validateEmail(email)
    │   │   │   └── RETURN REGEX.test(email)
    │   │   └── FUNCTION validateForm(data)
    │   │       └── RETURN errors[]
    │   │
    │   └── formatters.js
    │       ├── FUNCTION formatDate(date)
    │       │   └── RETURN new Date(date).toLocaleDateString()
    │       └── FUNCTION truncateText(text, maxLength)
    │           └── RETURN text.slice(0, maxLength) + "..."
    │
    └── assets/             # STATIC_RESOURCES
        ├── img/
        │   ├── avatar.png
        │   ├── projects/
        │   │   └── project-*.png
        │   └── icon/
        │       └── skill-icons/
        │           ├── react.svg
        │           ├── javascript.svg
        │           └── ...
        └── fonts/ (optional)
```

---

## 🔄 FLUSSO DATI PRINCIPALE

```pseudocode
USER_OPENS_APP
    ↓
index.js → ReactDOM.render(<App />)
    ↓
App.js → LOAD all_components
    ↓
COMPONENTS → IMPORT data from profileData.js
    ↓
RENDER UI with_dynamic_data
    ↓
USER_INTERACTION (click, scroll, form_submit)
    ↓
IF form_submit THEN
    ↓
    useEmail() → EmailJS.send()
        ↓
        IF success THEN show_success_message
        IF error THEN show_error_message
```

---

## 🎨 FLUSSO STYLING

```pseudocode
GLOBAL_STYLES
    ├── LOAD variables.css → CSS_VARS
    ├── LOAD global.css → BASE_RESET + TYPOGRAPHY
    └── FOR each component
        └── LOAD component.module.css → SCOPED_STYLES
```

---

## 🔌 INTEGRAZIONE SERVIZI ESTERNI

### EmailJS (Contact Form)
```pseudocode
FUNCTION handleFormSubmit(formData)
    ↓
VALIDATE formData
    ├── IF invalid THEN RETURN errors
    └── IF valid THEN
        ↓
        CALL useEmail().sendEmail()
            ↓
            INIT EmailJS.init(ENV.EMAILJS_USER_ID)
            ↓
            SEND EmailJS.send({
                service_id: ENV.EMAILJS_SERVICE_ID,
                template_id: ENV.EMAILJS_TEMPLATE_ID,
                template_params: {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message
                }
            })
            ↓
            RETURN { success: true } OR { error: error_message }
```

### Mailchimp (Newsletter)
```pseudocode
FUNCTION handleNewsletterSubmit(email)
    ↓
VALIDATE email
    ├── IF invalid THEN RETURN error
    └── IF valid THEN
        ↓
        FETCH Mailchimp_API_Endpoint {
            method: POST,
            headers: { Authorization: ENV.MAILCHIMP_API_KEY },
            body: { email_address: email, status: "subscribed" }
        }
        ↓
        RETURN { success: true } OR { error: error_message }
```

---

## 🧩 COMPONENTI DEPENDENCIES GRAPH

```
App.js
├── Navbar.js
│   └── useScroll() hook
├── Banner.js
│   ├── profileData.personalInfo
│   └── useTypewriter() hook
├── Skills.js
│   ├── profileData.skills
│   └── SkillItem.js (card)
├── Timeline.js
│   ├── profileData.timeline
│   └── TimelineItem.js (card)
├── Projects.js
│   ├── profileData.projects
│   └── ProjectCard.js (card)
├── Contact.js
│   ├── profileData.contactInfo
│   ├── MailForm.js
│   │   └── useEmail() hook
│   └── Newsletter.js
└── Footer.js
    ├── profileData.personalInfo
    └── SocialIcons.js (common)
```

---

## 📋 CHECKLIST IMPLEMENTAZIONE

```pseudocode
STEP_1: CREATE directory_structure
    └── RUN mkdir commands for all folders

STEP_2: REFACTOR existing_components
    └── MOVE components to appropriate folders
        ├── Banner.js → components/layout/
        ├── Skills.js → components/sections/
        ├── ProjectCard.js → components/cards/
        └── etc...

STEP_3: EXTRACT custom_hooks
    └── CREATE hooks/ folder
        ├── EXTRACT scroll logic → useScroll.js
        ├── EXTRACT typewriter effect → useTypewriter.js
        └── EXTRACT email logic → useEmail.js

STEP_4: CENTRALIZE styles
    └── CREATE styles/ folder
        ├── CREATE variables.css
        ├── CREATE global.css
        └── REFACTOR component CSS to modules

STEP_5: CREATE utils
    └── CREATE utils/ folder
        ├── CREATE validators.js
        └── CREATE formatters.js

STEP_6: VERIFY data_flow
    └── ENSURE all components READ from profileData.js
    └── NO hardcoded strings in JSX

STEP_7: TEST environment_variables
    └── CREATE .env.example
    └── DOCUMENT required keys

STEP_8: RUN & VALIDATE
    └── npm start
    └── TEST all features
```

---

## 🎯 CONVENZIONI DI CODICE

### Naming Conventions
```pseudocode
COMPONENTS: PascalCase (Banner.js, ProjectCard.js)
HOOKS: camelCase with "use" prefix (useScroll.js, useEmail.js)
UTILS: camelCase (validators.js, formatDate.js)
CSS_MODULES: ComponentName.module.css
CSS_CLASSES: kebab-case (.project-card, .nav-link)
```

### Import Order
```pseudocode
1. React imports
2. Third-party libraries
3. Local components
4. Hooks
5. Utils
6. Data
7. Styles
8. Assets
```

### Component Structure
```pseudocode
FUNCTION ComponentName(props) {
    // 1. Hooks
    // 2. State
    // 3. Effects
    // 4. Handlers
    // 5. Render helpers
    // 6. Return JSX
}
```

---

## 🔍 AI DEVELOPMENT GUIDELINES

```pseudocode
WHEN generating_code:
    1. READ profileData.js FIRST
    2. USE data props, NOT hardcoded strings
    3. EXTRACT logic to hooks when reusable
    4. FOLLOW naming conventions
    5. IMPORT from correct folder structure
    6. USE CSS modules or styled-components
    7. VALIDATE user input in forms
    8. HANDLE loading/error states
    9. ENSURE responsive design
    10. ADD meaningful comments
```

---

**Fine Pseudocode Document** 🎉
