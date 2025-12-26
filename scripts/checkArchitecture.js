/**
 * 🔍 Architecture Checker Script
 * ================================
 * Questo script verifica che il progetto sia conforme all'architettura
 * definita in ARCHITECTURE.md e CONCEPTMAP.md
 * 
 * Esegui con: node scripts/checkArchitecture.js
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURAZIONE - Struttura attesa secondo ARCHITECTURE.md
// ============================================================================

const CONFIG = {
    rootPath: path.resolve(__dirname, '..'),
    srcPath: path.resolve(__dirname, '..', 'src'),
    
    // File attesi per cartella
    expectedStructure: {
        'src/components/layout': [
            'Banner.js',
            'Navbar.js',
            'Footer.js',
            'MailForm.js',
            'Newsletter.js'
        ],
        'src/components/sections': [
            'Skills.js',
            'Projects.js',
            'Timeline.js',
            'Contact.js'
        ],
        'src/components/cards': [
            'ProjectCard.js'
        ],
        'src/components/common': [
            'SocialIcons.js'
        ],
        'src/data': [
            'profileData.js'
        ]
    },
    
    // Cartelle che dovrebbero esistere (anche se vuote)
    expectedFolders: [
        'src/components/layout',
        'src/components/sections',
        'src/components/cards',
        'src/components/common',
        'src/data',
        'src/hooks',
        'src/utils',
        'src/styles',
        'src/assets/img/icon'
    ],
    
    // File che NON dovrebbero esistere nella root di components
    forbiddenInComponentsRoot: [
        'Banner.js',
        'Navbar.js',
        'Vnavbar.js',
        'Footer.js',
        'Skills.js',
        'Projects.js',
        'Timeline.js',
        'Contact.js',
        'ProjectCard.js',
        'SocialIcons.js',
        'MailForm.js',
        'Newsletter.js'
    ],
    
    // Export attesi da profileData.js
    expectedProfileDataExports: [
        'personalInfo',
        'summary',
        'technicalSkills',
        'education',
        'projects',
        'workExperience',
        'languages',
        'timelineData'
    ],
    
    // Import pattern attesi in App.js
    expectedAppImports: [
        { from: './components/layout/Banner', component: 'Banner' },
        { from: './components/layout/Navbar', component: 'NavBar' },
        { from: './components/layout/Footer', component: 'Footer' },
        { from: './components/sections/Skills', component: 'Skills' },
        { from: './components/sections/Projects', component: 'Projects' },
        { from: './components/sections/Timeline', component: 'Timeline' },
        { from: './components/sections/Contact', component: 'Contact' }
    ]
};

// ============================================================================
// CHECKER FUNCTIONS
// ============================================================================

const results = {
    passed: [],
    warnings: [],
    errors: [],
    todos: []
};

function log(type, message) {
    const icons = {
        pass: '✅',
        warn: '⚠️',
        error: '❌',
        info: 'ℹ️'
    };
    console.log(`${icons[type] || '•'} ${message}`);
    
    if (type === 'pass') results.passed.push(message);
    if (type === 'warn') results.warnings.push(message);
    if (type === 'error') results.errors.push(message);
}

function addTodo(priority, task, details) {
    results.todos.push({ priority, task, details });
}

// Check 1: Verifica esistenza cartelle
function checkFolders() {
    console.log('\n📁 Checking folder structure...\n');
    
    CONFIG.expectedFolders.forEach(folder => {
        const fullPath = path.join(CONFIG.rootPath, folder);
        if (fs.existsSync(fullPath)) {
            log('pass', `Folder exists: ${folder}`);
        } else {
            log('error', `Missing folder: ${folder}`);
            addTodo('HIGH', `Create folder: ${folder}`, 'Required by architecture');
        }
    });
}

// Check 2: Verifica file nelle cartelle corrette
function checkFileLocations() {
    console.log('\n📄 Checking file locations...\n');
    
    Object.entries(CONFIG.expectedStructure).forEach(([folder, files]) => {
        const fullPath = path.join(CONFIG.rootPath, folder);
        
        if (!fs.existsSync(fullPath)) {
            log('error', `Cannot check ${folder} - folder missing`);
            return;
        }
        
        files.forEach(file => {
            const filePath = path.join(fullPath, file);
            if (fs.existsSync(filePath)) {
                log('pass', `Found: ${folder}/${file}`);
            } else {
                log('error', `Missing: ${folder}/${file}`);
                addTodo('HIGH', `Create or move file: ${file}`, `Expected in ${folder}`);
            }
        });
    });
}

// Check 3: Verifica che non ci siano file nella root di components
function checkComponentsRoot() {
    console.log('\n🚫 Checking for misplaced files in components root...\n');
    
    const componentsPath = path.join(CONFIG.srcPath, 'components');
    
    if (!fs.existsSync(componentsPath)) {
        log('error', 'Components folder missing!');
        return;
    }
    
    const files = fs.readdirSync(componentsPath);
    
    CONFIG.forbiddenInComponentsRoot.forEach(file => {
        if (files.includes(file)) {
            log('error', `Misplaced file: components/${file} (should be in subfolder)`);
            addTodo('MEDIUM', `Move ${file} to correct subfolder`, 'File should not be in components root');
        }
    });
    
    // Check for any .js files in root (except index.js if exists)
    const jsFiles = files.filter(f => f.endsWith('.js') && f !== 'index.js');
    if (jsFiles.length === 0) {
        log('pass', 'No misplaced .js files in components root');
    }
}

// Check 4: Verifica imports in App.js
function checkAppImports() {
    console.log('\n📦 Checking App.js imports...\n');
    
    const appPath = path.join(CONFIG.srcPath, 'App.js');
    
    if (!fs.existsSync(appPath)) {
        log('error', 'App.js not found!');
        return;
    }
    
    const appContent = fs.readFileSync(appPath, 'utf8');
    
    CONFIG.expectedAppImports.forEach(({ from, component }) => {
        const importRegex = new RegExp(`import.*${component}.*from.*['"]${from.replace('./', './')}['"]`);
        const oldImportRegex = new RegExp(`import.*${component}.*from.*['"]./components/${component}['"]`);
        
        if (importRegex.test(appContent)) {
            log('pass', `Correct import: ${component} from ${from}`);
        } else if (oldImportRegex.test(appContent)) {
            log('error', `Old import path for ${component} - needs update`);
            addTodo('HIGH', `Update import for ${component}`, `Change to: import from '${from}'`);
        } else {
            log('warn', `Import not found or different: ${component}`);
        }
    });
}

// Check 5: Verifica profileData exports
function checkProfileData() {
    console.log('\n🧠 Checking profileData.js exports...\n');
    
    const dataPath = path.join(CONFIG.srcPath, 'data', 'profileData.js');
    
    if (!fs.existsSync(dataPath)) {
        log('error', 'profileData.js not found!');
        addTodo('CRITICAL', 'Create profileData.js', 'Single source of truth for data');
        return;
    }
    
    const content = fs.readFileSync(dataPath, 'utf8');
    
    CONFIG.expectedProfileDataExports.forEach(exportName => {
        const exportRegex = new RegExp(`export\\s+(const|let|var|function)\\s+${exportName}`);
        if (exportRegex.test(content)) {
            log('pass', `Export found: ${exportName}`);
        } else {
            log('warn', `Export not found: ${exportName}`);
            addTodo('LOW', `Add export: ${exportName}`, 'Expected in profileData.js');
        }
    });
}

// Check 6: Verifica Data-Driven UI (no hardcoded strings)
function checkDataDriven() {
    console.log('\n🔗 Checking Data-Driven pattern compliance...\n');
    
    const sectionsPath = path.join(CONFIG.srcPath, 'components', 'sections');
    
    if (!fs.existsSync(sectionsPath)) {
        log('warn', 'Sections folder not found, skipping data-driven check');
        return;
    }
    
    const files = fs.readdirSync(sectionsPath).filter(f => f.endsWith('.js'));
    
    files.forEach(file => {
        const filePath = path.join(sectionsPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check if imports from profileData
        if (content.includes('profileData') || content.includes('../data/')) {
            log('pass', `${file} imports from data source`);
        } else {
            // Check for hardcoded data arrays
            if (content.includes('const projects = [') || 
                content.includes('const skills = [') ||
                content.includes('const timeline = [')) {
                log('warn', `${file} has hardcoded data array - consider moving to profileData.js`);
                addTodo('LOW', `Refactor ${file}`, 'Move hardcoded data to profileData.js');
            }
        }
    });
}

// Check 7: Verifica hooks/utils/styles folders
function checkFutureFolders() {
    console.log('\n🔮 Checking future expansion folders...\n');
    
    const folders = ['hooks', 'utils', 'styles'];
    
    folders.forEach(folder => {
        const folderPath = path.join(CONFIG.srcPath, folder);
        
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath);
            if (files.length === 0) {
                log('info', `${folder}/ exists but is empty (ready for expansion)`);
            } else {
                log('pass', `${folder}/ exists with ${files.length} file(s)`);
            }
        } else {
            log('warn', `${folder}/ folder missing`);
            addTodo('LOW', `Create ${folder}/ folder`, 'For future code organization');
        }
    });
}

// ============================================================================
// GENERATE TODO.md REPORT
// ============================================================================

function generateTodoReport() {
    const timestamp = new Date().toISOString().split('T')[0];
    
    let report = `# 📋 TODO - Architecture Compliance Report
> Generated: ${timestamp}
> Script: scripts/checkArchitecture.js

---

## 📊 Summary

| Status | Count |
|--------|-------|
| ✅ Passed | ${results.passed.length} |
| ⚠️ Warnings | ${results.warnings.length} |
| ❌ Errors | ${results.errors.length} |

---

## 🔴 Critical & High Priority

`;

    const critical = results.todos.filter(t => t.priority === 'CRITICAL' || t.priority === 'HIGH');
    if (critical.length === 0) {
        report += `✅ No critical issues found!\n\n`;
    } else {
        critical.forEach((todo, i) => {
            report += `- [ ] **[${todo.priority}]** ${todo.task}\n  - ${todo.details}\n\n`;
        });
    }

    report += `---

## 🟡 Medium Priority

`;

    const medium = results.todos.filter(t => t.priority === 'MEDIUM');
    if (medium.length === 0) {
        report += `✅ No medium priority issues!\n\n`;
    } else {
        medium.forEach((todo, i) => {
            report += `- [ ] ${todo.task}\n  - ${todo.details}\n\n`;
        });
    }

    report += `---

## 🟢 Low Priority (Improvements)

`;

    const low = results.todos.filter(t => t.priority === 'LOW');
    if (low.length === 0) {
        report += `✅ No low priority improvements needed!\n\n`;
    } else {
        low.forEach((todo, i) => {
            report += `- [ ] ${todo.task}\n  - ${todo.details}\n\n`;
        });
    }

    report += `---

## ⚠️ Warnings

`;

    if (results.warnings.length === 0) {
        report += `✅ No warnings!\n\n`;
    } else {
        results.warnings.forEach(w => {
            report += `- ${w}\n`;
        });
    }

    report += `
---

## ❌ Errors Found

`;

    if (results.errors.length === 0) {
        report += `✅ No errors found!\n\n`;
    } else {
        results.errors.forEach(e => {
            report += `- ${e}\n`;
        });
    }

    report += `
---

## ✅ Passed Checks

<details>
<summary>Click to expand (${results.passed.length} items)</summary>

`;

    results.passed.forEach(p => {
        report += `- ${p}\n`;
    });

    report += `
</details>

---

## 🔧 How to Fix

### Missing Files
\`\`\`bash
# Create missing folders
mkdir -p src/hooks src/utils src/styles

# Move misplaced files (example)
mv src/components/OldFile.js src/components/correct-folder/
\`\`\`

### Update Imports
\`\`\`javascript
// Old (wrong)
import Component from './components/Component';

// New (correct)
import Component from './components/category/Component';
\`\`\`

### Data-Driven Refactor
Move hardcoded arrays from components to \`src/data/profileData.js\`

---

**Run check again:** \`node scripts/checkArchitecture.js\`
`;

    return report;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main() {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('   🔍 ARCHITECTURE CHECKER - Portfolio Project');
    console.log('═══════════════════════════════════════════════════════════════');
    
    // Run all checks
    checkFolders();
    checkFileLocations();
    checkComponentsRoot();
    checkAppImports();
    checkProfileData();
    checkDataDriven();
    checkFutureFolders();
    
    // Generate report
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('   📋 GENERATING TODO REPORT');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    const report = generateTodoReport();
    const todoPath = path.join(CONFIG.rootPath, 'TODO.md');
    
    fs.writeFileSync(todoPath, report);
    
    console.log(`✅ Report generated: TODO.md`);
    console.log(`\n📊 Final Summary:`);
    console.log(`   ✅ Passed:   ${results.passed.length}`);
    console.log(`   ⚠️  Warnings: ${results.warnings.length}`);
    console.log(`   ❌ Errors:   ${results.errors.length}`);
    console.log(`   📝 TODOs:    ${results.todos.length}`);
    
    // Exit code based on errors
    if (results.errors.length > 0) {
        console.log('\n❌ Architecture check completed with errors.');
        process.exit(1);
    } else {
        console.log('\n✅ Architecture check completed successfully!');
        process.exit(0);
    }
}

// Run
main();
