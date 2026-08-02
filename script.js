// ==========================================================================
// Krishivpb.github.io - Main Interactive Application Script v7.0
// ==========================================================================

// 1. Typewriter Animation Engine
const typedItems = [
    "Full Stack Software Engineer",
    "12-Year-Old Prodigy (Grade 7)",
    "Founder of Krishiv Studios",
    "Creator of Krims Code AI",
    "Minecraft SMP Architect",
    "Monetized SaaS Developer"
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
<span class="text-cyan">Available CLI Commands (Master Hub: Krishivpb.github.io):</span><br>
  <span class="text-gold">ecosystem</span> - View unified Vercel, Netlify, AI & Discord hub summary<br>
  <span class="text-gold">vercel</span>    - List live Vercel cloud apps & serverless APIs<br>
  <span class="text-gold">netlify</span>   - Inspect Netlify deployments & web toolkits<br>
  <span class="text-gold">bots</span>      - Display Discord bot status & webhooks<br>
  <span class="text-gold">ai</span>        - Overview of Krims Code AI agents<br>
  <span class="text-gold">bio</span>       - View Krishiv's profile background & developer overview<br>
  <span class="text-gold">projects</span>  - List major software engineering projects<br>
  <span class="text-gold">skills</span>    - Display technical skills & framework mastery<br>
  <span class="text-gold">contact</span>   - Get direct email & Discord contact details<br>
  <span class="text-gold">clear</span>     - Wipe terminal output log`;
            break;

        case "ecosystem":
            responseLine.innerHTML = `
<span class="text-cyan">=== UNIFIED CLOUD & AI ECOSYSTEM ===</span><br>
Master Canonical Domain: <span class="text-gold">https://krishivpb.github.io</span><br>
Connected Platforms: Vercel Cloud, Netlify Edge, Discord Bot Gateway, OpenAI Agent Suite.`;
            break;

        case "vercel":
            responseLine.innerHTML = `
<span class="text-cyan">=== VERCEL CLOUD APPLICATIONS ===</span><br>
1. <span class="text-gold">SMPLink SaaS</span> - https://smplink-saas.vercel.app (Serverless Store & AI Webhooks)<br>
2. <span class="text-gold">KryloSMP Portal</span> - https://krylosmp-player-portal.vercel.app (Live Telemetry & Player Portal)`;
            break;

        case "netlify":
            responseLine.innerHTML = `
<span class="text-cyan">=== NETLIFY APPLICATIONS ===</span><br>
Krishiv Studios Web Tools & Static Edge Endpoints hosted & linked to <span class="text-gold">krishivpb.github.io</span>.`;
            break;

        case "bots":
            responseLine.innerHTML = `
<span class="text-cyan">=== DISCORD BOTS & WEBHOOKS ===</span><br>
Krims Discord Bot Suite (Discord.js v14) - Gateway Online. Features moderation, server status polling, and AI response handlers.`;
            break;

        case "ai":
            responseLine.innerHTML = `
<span class="text-cyan">=== KRIMS CODE AI AGENTS ===</span><br>
Agent Workspace & Prompt Evaluator - Automated refactoring, subagent execution, and AI sales responder API.`;
            break;

        case "bio":
            responseLine.innerHTML = `
<span class="text-cyan">=== KRISHIV PB (KRYLO-60) BIO ===</span><br>
Age: 12 (Grade 7 Student & Software Engineer from India)<br>
Title: Founder of Krishiv Studios & KryloSMP Network<br>
GitHub Commits: 840+ in 2026<br>
Master Hub: krishivpb.github.io`;
            break;

        case "projects":
            responseLine.innerHTML = `
<span class="text-cyan">=== FEATURED PROJECTS ===</span><br>
1. <span class="text-gold">Krims Code AI</span> - AI developer assistant & workflow agent.<br>
2. <span class="text-gold">KryloSMP Network</span> - Minecraft survival server & player portal.<br>
3. <span class="text-gold">SMPLink SaaS</span> - Multi-tenant store & API link ecosystem.<br>
4. <span class="text-gold">Krims Discord Bot</span> - Multi-purpose Discord v14 bot.<br>
5. <span class="text-gold">Custom Java Plugins</span> - Spigot & Paper Minecraft plugins.`;
            break;

        case "skills":
            responseLine.innerHTML = `
<span class="text-cyan">=== TECH STACK ===</span><br>
Languages: JavaScript (ES6+), Node.js, Python, Java, HTML5/CSS3<br>
Frameworks & Platforms: Express.js, Vercel Serverless, Netlify Edge, Discord.js v14, Spigot API`;
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

// 7. In-Page App Drawer Preview
function openAppPreview(url, title, iconClass = 'bx-window-open') {
    const modal = document.getElementById("appPreviewModal");
    const iframe = document.getElementById("appModalIframe");
    const modalTitle = document.getElementById("appModalTitle");
    const modalIcon = document.getElementById("appModalIcon");
    const extLink = document.getElementById("appModalExternalLink");

    if (modal && iframe) {
        modalTitle.textContent = title;
        modalIcon.className = `bx ${iconClass} modal-icon text-cyan`;
        iframe.src = url;
        extLink.href = url;
        modal.classList.remove("hidden");
    }
}

function closeAppPreview() {
    const modal = document.getElementById("appPreviewModal");
    const iframe = document.getElementById("appModalIframe");
    if (modal) modal.classList.add("hidden");
    if (iframe) iframe.src = "about:blank";
}

// 8. Form Submission Handler & AI Agent Responder
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
                message: `🚀 NEW COMMISSION INQUIRY (Krishivpb.github.io Master Hub)\n\nClient Name: ${name}\nClient Email: ${email}\nEstimated Budget: ${budget}\nTracker ID: ${orderId}\n\nProject Requirements:\n${message}`,
                _subject: `🤖 New Order: ${name} (${orderId})`
            })
        }).catch(err => console.error("FormSubmit dispatch notification:", err));
    } catch (err) {}

    // Vercel AI Agent Auto-responder API Call
    try {
        const res = await fetch("https://smplink-saas.vercel.app/api/commissions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientEmail: email,
                serverName: name,
                requirements: message,
                budget: budget
            })
        });

        if (res.ok) {
            const data = await res.json();
            messageBox.textContent = data.aiMessage || data.aiResponse || data.message || `🤖 [KRISHIV PB AI SALES AGENT]\n-----------------------------------\nHello ${name} (${email})!\nYour commission inquiry for "${message}" has been received!\nTracker ID: ${orderId}\nBudget Selected: ${budget}\nAn email notification has been dispatched to 71krishivpb@gmail.com.`;
        } else {
            messageBox.textContent = `🤖 [KRISHIV PB AI SALES AGENT]\n-----------------------------------\nHello ${name} (${email})!\nYour commission inquiry for "${message}" has been received and queued!\nTracker ID: ${orderId}\nBudget Selected: ${budget}\nAn email notification has been dispatched to 71krishivpb@gmail.com.`;
        }
    } catch (err) {
        messageBox.textContent = `🤖 [KRISHIV PB AI SALES AGENT]\n-----------------------------------\nHello ${name} (${email})!\nYour commission inquiry for "${message}" has been received and queued!\nTracker ID: ${orderId}\nBudget Selected: ${budget}\nAn email notification has been dispatched to 71krishivpb@gmail.com.`;
    }

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
