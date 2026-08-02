// ==========================================================================
// Krishivpb.github.io - Main Interactive Application Script v7.0
// Hosted 100% natively on GitHub Pages
// ==========================================================================

// 1. Typewriter Animation Engine
const typedItems = [
    "Full Stack Software Engineer",
    "12-Year-Old Prodigy (Grade 7)",
    "Founder of Krishiv Studios",
    "Creator of Krims Code AI",
    "Minecraft SMP Architect",
    "GitHub Open-Source Developer"
];

let itemIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100;
const delayBetweenWords = 1800;

function typeEffect() {
    const targetElement = document.getElementById("typedText");
    if (!targetElement) return;

    const currentWord = typedItems[itemIndex];

    if (isDeleting) {
        targetElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        targetElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let currentSpeed = isDeleting ? speed / 2 : speed;

    if (!isDeleting && charIndex === currentWord.length) {
        currentSpeed = delayBetweenWords;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        itemIndex = (itemIndex + 1) % typedItems.length;
        currentSpeed = 400;
    }

    setTimeout(typeEffect, currentSpeed);
}

// 2. DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    initMobileNav();
    initScrollSpy();
    initProjectFilters();
    initTerminalInput();
});

// 3. Mobile Navigation Toggler
function initMobileNav() {
    const toggleBtn = document.getElementById("mobileNavToggle");
    const sidebar = document.getElementById("header");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("active");
            const icon = toggleBtn.querySelector("i");
            if (sidebar.classList.contains("active")) {
                icon.className = "bx bx-x";
            } else {
                icon.className = "bx bx-menu";
            }
        });
    }
}

// 4. ScrollSpy Active Link Tracking
function initScrollSpy() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 180) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
}

// 5. Project Filtering Tabs
function initProjectFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

// 6. Interactive Web Terminal CLI Engine
const commandHistory = [];
let historyIndex = -1;

function initTerminalInput() {
    const input = document.getElementById("terminalInput");
    if (!input) return;

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const cmd = input.value.trim();
            if (cmd) {
                commandHistory.push(cmd);
                historyIndex = commandHistory.length;
                runTerminalCommand(cmd);
                input.value = "";
            }
        } else if (e.key === "ArrowUp") {
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === "ArrowDown") {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = "";
            }
        }
    });
}

function runTerminalCommand(commandStr) {
    const output = document.getElementById("terminalOutput");
    if (!output) return;

    const cmdLower = commandStr.toLowerCase().trim();

    // Print Prompt Line
    const promptLine = document.createElement("div");
    promptLine.className = "terminal-line";
    promptLine.innerHTML = `<span class="terminal-prompt">krishiv@github.io:~$</span> <span class="text-gold">${escapeHtml(commandStr)}</span>`;
    output.appendChild(promptLine);

    // Response Container
    const responseLine = document.createElement("div");
    responseLine.className = "terminal-line";

    switch (cmdLower) {
        case "help":
            responseLine.innerHTML = `
<span class="text-cyan">Available CLI Commands (Krishivpb.github.io):</span><br>
  <span class="text-gold">bio</span>       - View Krishiv's profile background & developer overview<br>
  <span class="text-gold">projects</span>  - List major software engineering projects<br>
  <span class="text-gold">skills</span>    - Display technical skills & framework mastery<br>
  <span class="text-gold">github</span>    - Open GitHub repositories & commit stats<br>
  <span class="text-gold">contact</span>   - Get direct email & Discord contact details<br>
  <span class="text-gold">clear</span>     - Wipe terminal output log`;
            break;

        case "bio":
            responseLine.innerHTML = `
<span class="text-cyan">=== KRISHIV PB (KRYLO-60) BIO ===</span><br>
Age: 12 (Grade 7 Student & Software Engineer from India)<br>
Title: Founder of Krishiv Studios & KryloSMP Network<br>
GitHub Commits: 840+ in 2026<br>
Platform: Hosted 100% on GitHub Pages (krishivpb.github.io)<br>
Focus: AI Agent Systems, Full-Stack Web Development, Discord Bot Architecture, and Paper Minecraft Plugins.`;
            break;

        case "projects":
            responseLine.innerHTML = `
<span class="text-cyan">=== FEATURED GITHUB PROJECTS ===</span><br>
1. <span class="text-gold">Krims Code AI</span> - Intelligent AI developer assistant & workflow agent.<br>
2. <span class="text-gold">KryloSMP Network</span> - Minecraft survival server ecosystem & live telemetry portal.<br>
3. <span class="text-gold">SMPLink SaaS</span> - Multi-tenant server link ecosystem on GitHub.<br>
4. <span class="text-gold">Krims Discord Bot</span> - Multi-purpose Discord v14 application with webhooks.<br>
5. <span class="text-gold">Paper / Spigot Plugins</span> - Custom Java server plugins (CoreProtect, TAB, AuraSkills hooks).`;
            break;

        case "github":
            responseLine.innerHTML = `
<span class="text-gold">🚀 GitHub Profile: https://github.com/Krylo-60</span><br>
Open Source Repositories: 15+ Public Projects<br>
Total Commits in 2026: 840+ Commits<br>
GitHub Pages URL: https://krishivpb.github.io`;
            break;

        case "skills":
            responseLine.innerHTML = `
<span class="text-cyan">=== TECH STACK & MASTERY ===</span><br>
Languages: JavaScript (ES6+), Node.js, Python, Java, HTML5/CSS3<br>
Frameworks: Express.js, GitHub Pages & GitHub Actions, Vanilla CSS<br>
APIs & Tools: Discord.js v14, Paper/Spigot API, Git/GitHub, REST APIs, JSON Webhooks`;
            break;

        case "contact":
            responseLine.innerHTML = `
Email: <a href="mailto:71krishivpb@gmail.com" class="text-cyan">71krishivpb@gmail.com</a><br>
GitHub: <a href="https://github.com/Krylo-60" target="_blank" class="text-cyan">@Krylo-60</a><br>
Discord: <a href="https://discord.gg/2hSXQKHvvX" target="_blank" class="text-cyan">KryloSMP Discord Server</a>`;
            break;

        case "clear":
            output.innerHTML = `
<div class="terminal-line system-msg">
    <span class="text-cyan">Terminal cleared. Type 'help' for available commands.</span>
</div>`;
            return;

        default:
            responseLine.innerHTML = `<span class="text-cyan">zsh: command not found: ${escapeHtml(commandStr)}</span>. Type <span class="text-gold">'help'</span> for a list of available commands.`;
            break;
    }

    output.appendChild(responseLine);
    output.scrollTop = output.scrollHeight;
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 7. Form Submission Handler & AI Agent Responder (Pure Client / FormSubmit)
async function submitCommissionForm(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const budget = document.getElementById("budget").value;
    const message = document.getElementById("message").value.trim();

    const modal = document.getElementById("aiAgentModal");
    const messageBox = document.getElementById("aiMessageResult");

    const randomHex = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1).toUpperCase();
    const orderId = `COMM-${randomHex}`;

    // Direct FormSubmit email dispatch
    try {
        fetch("https://formsubmit.co/ajax/71krishivpb@gmail.com", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: `Commission Inquiry from ${name}`,
                email: email,
                message: `🚀 NEW COMMISSION INQUIRY (Krishivpb.github.io)\n\nClient Name: ${name}\nClient Email: ${email}\nEstimated Budget: ${budget}\nTracker ID: ${orderId}\n\nProject Requirements:\n${message}`,
                _subject: `🤖 New Order: ${name} (${orderId})`
            })
        }).catch(err => console.error("FormSubmit dispatch notification:", err));
    } catch (err) {}

    // Native Client AI Sales Agent Response
    messageBox.textContent = `🤖 [KRISHIV STUDIOS AI SALES AGENT]\n-----------------------------------\nHello ${name} (${email})!\nYour commission inquiry for "${message}" has been received!\nTracker ID: ${orderId}\nBudget Selected: ${budget}\nHosting: GitHub Pages (krishivpb.github.io)\n\nAn email notification has been dispatched to 71krishivpb@gmail.com. Krishiv will contact you shortly on Discord / Email!`;

    modal.classList.remove("hidden");
}

function closeAiModal() {
    const modal = document.getElementById("aiAgentModal");
    if (modal) modal.classList.add("hidden");
    const form = document.getElementById("contactForm");
    if (form) form.reset();
}

function openResumeModal() {
    const modal = document.getElementById("digitalResumeModal");
    if (modal) modal.classList.remove("hidden");
}

function closeResumeModal() {
    const modal = document.getElementById("digitalResumeModal");
    if (modal) modal.classList.add("hidden");
}
