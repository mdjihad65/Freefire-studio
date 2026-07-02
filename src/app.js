// Free Fire Bio Making Tool - Client-side Logic Matrix
// Designed with ultra-minimalism, high performance, and robust limits enforcement.

import { categories as FANCY_CATEGORIES, styles as FANCY_STYLES } from './fancy_data.js';
import { symbolsData } from './symbols_data.js';
import { generateAllStyles as GENERATE_NAMEGEN_STYLES } from './name_generator_data.js';

// 1. JSON Preset Matrix
const PRESET_BIOS = [
  {
    category: "🏆 Esports & Pro Signature Layouts",
    presets: [
      { rawCode: "[b][FF0000]ESPORT [FFFFFF]PLAYER", description: "Pro Red/White ESPORT Tag" },
      { rawCode: "[b][FFD700]★ [FFFFFF]K I N G [FFD700]★", description: "The Golden King Crowned Bio" },
      { rawCode: "[b][00FFFF]❖ [FFFFFF]S N I P E R [00FFFF]❖", description: "Neon Cyan Sniper Signature" },
      { rawCode: "[b][FF0055]⚡ [FFFFFF]O N E [FF0055]S H O T", description: "One-Shot Legend Vibe" }
    ]
  },
  {
    category: "✨ Cool Symbols & Radiant Glows",
    presets: [
      { rawCode: "[b][c][FF0055]✨ [FFFFFF]G L O W [FF0055]✨", description: "Vibrant Glowing Pink Accent" },
      { rawCode: "[i][00FF00]☣ [FFFFFF]T O X I C [00FF00]☣", description: "Green Toxic Hazard Bio" },
      { rawCode: "[b][FF9900]☠ [FFFFFF]D E A T H [FF9900]☠", description: "Warm Orange Skull Hunter" },
      { rawCode: "[b][00FFFF]⚔ [FFFFFF]W A R R I O R [00FFFF]⚔", description: "Dueling Swords Warrior Bio" }
    ]
  },
  {
    category: "❤️ Regional Pride & Symbolic Flags",
    presets: [
      { rawCode: "[b][FF0000]🇮🇳 [FFFFFF]I N D I A [00FF00]🇮🇳", description: "Indian Flag Color Theme" },
      { rawCode: "[u][E11D48]♥ LOVER BOY ♥", description: "Underlined Rose Red Heart" },
      { rawCode: "[b][FF00FF]🌸 [FFFFFF]Q U E E N [FF00FF]🌸", description: "Pink Cherry Blossom Queen" },
      { rawCode: "[b][0055FF]⚽ [FFFFFF]S P O R T S ⚽", description: "Blue Dynamic Athlete Vibe" }
    ]
  },
  {
    category: "🎨 Premium Gradients & Spectral Rainbows",
    presets: [
      { rawCode: "[b][FF0000]R[FF7F00]A[FFFF00]I[00FF00]N[0000FF]B[4B0082]O[9400D3]W", description: "Multi-color Rainbow Gradient" },
      { rawCode: "[b][FF0055]F[FF3377]I[FF6699]R[FF99BB]E", description: "Vibrant Sunset Fire Theme" },
      { rawCode: "[b][00FFFF]N[00CCFF]E[0099FF]O[0066FF]N", description: "Cyan-Blue High Tech Wave" },
      { rawCode: "[i][FFFF00]G[FFCC00]O[FF9900]L[FF6600]D", description: "Luxurious Golden Style" }
    ]
  }
];

// 2. Interpreter Utility for Free Fire BBCodes
function parseFreeFireBio(text) {
  if (!text) {
    return `<span class="text-zinc-400 font-mono text-sm italic select-none">Your styled bio will preview here in real-time...</span>`;
  }

  // Escape HTML characters to prevent cross-site scripting (XSS)
  let escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Regex matches BBCodes like [b], [i], [u], [c], [RRGGBB] and closing tags
  const tagRegex = /\[(\/?)(b|i|u|c|[0-9a-fA-F]{6})\]/g;
  
  let resultHTML = "";
  let lastIndex = 0;
  
  // Style flags
  let activeStyles = {
    bold: false,
    italic: false,
    underline: false,
    glow: false,
    color: null
  };

  function getSpanStyle() {
    let styles = [];
    if (activeStyles.bold) styles.push("font-weight: 700");
    if (activeStyles.italic) styles.push("font-style: italic");
    if (activeStyles.underline) styles.push("text-decoration: underline");
    if (activeStyles.color) {
      styles.push(`color: #${activeStyles.color}`);
    }
    return styles.join("; ");
  }

  function getSpanClass() {
    let classes = [];
    if (activeStyles.glow) {
      classes.push("ff-glow-text");
    }
    return classes.join(" ");
  }

  let match;
  while ((match = tagRegex.exec(escaped)) !== null) {
    const isClosing = match[1] === "/";
    const tagContent = match[2].toLowerCase();
    
    // Process plain text preceding this tag
    const plainText = escaped.substring(lastIndex, match.index);
    if (plainText) {
      const formattedText = plainText.replace(/\n/g, "<br>");
      resultHTML += `<span style="${getSpanStyle()}" class="${getSpanClass()}">${formattedText}</span>`;
    } else if (escaped.substring(lastIndex, match.index).includes('\n')) {
      const newlines = (escaped.substring(lastIndex, match.index).match(/\n/g) || []).length;
      resultHTML += "<br>".repeat(newlines);
    }

    // Toggle active state
    if (isClosing) {
      if (tagContent === 'b') activeStyles.bold = false;
      else if (tagContent === 'i') activeStyles.italic = false;
      else if (tagContent === 'u') activeStyles.underline = false;
      else if (tagContent === 'c') activeStyles.glow = false;
      else if (tagContent === 'color' || /^[0-9a-fA-F]{6}$/.test(tagContent)) activeStyles.color = null;
    } else {
      if (tagContent === 'b') activeStyles.bold = true;
      else if (tagContent === 'i') activeStyles.italic = true;
      else if (tagContent === 'u') activeStyles.underline = true;
      else if (tagContent === 'c') activeStyles.glow = true;
      else if (/^[0-9a-fA-F]{6}$/.test(tagContent)) {
        activeStyles.color = tagContent;
      }
    }

    lastIndex = tagRegex.lastIndex;
  }

  // Handle remaining trailing text
  const remainingText = escaped.substring(lastIndex);
  if (remainingText) {
    const formattedText = remainingText.replace(/\n/g, "<br>");
    resultHTML += `<span style="${getSpanStyle()}" class="${getSpanClass()}">${formattedText}</span>`;
  }

  return resultHTML;
}

// 3. Global Toast Notifications
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl transform translate-y-3 opacity-0 transition-all duration-300 max-w-sm shrink-0 ${
    type === 'success' 
      ? 'bg-zinc-900 border-zinc-800 text-white' 
      : 'bg-rose-50 border-rose-200 text-rose-800'
  }`;
  
  const icon = type === 'success' 
    ? `<svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`
    : `<svg class="w-4 h-4 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;

  toast.innerHTML = `
    ${icon}
    <span class="text-xs font-semibold tracking-wide">${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Trigger animation frame for sliding in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
  });
  
  // Clean remove with sliding out
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-[-8px]');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

// 4. Clipboard API Core Wrapper
function copyToClipboard(text, successMessage = "Copied to clipboard!") {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(successMessage))
      .catch(() => fallbackCopyToClipboard(text, successMessage));
  } else {
    fallbackCopyToClipboard(text, successMessage);
  }
}

function fallbackCopyToClipboard(text, successMessage) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showToast(successMessage);
    } else {
      showToast("Unable to copy code", "error");
    }
  } catch (err) {
    showToast("Copy error occurred", "error");
  }
  document.body.removeChild(textArea);
}

// 5. Initializer & Event Setup
document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById('workspace-textarea');
  const lineGutter = document.getElementById('line-gutter');
  const charCounter = document.getElementById('char-counter');
  const livePreview = document.getElementById('live-preview-box');

  // --- SINGLE PAGE ROUTING ENGINE ---
  let currentPage = 'home';

  const viewHome = document.getElementById('view-home');
  const viewBio = document.getElementById('view-bio');
  const viewFancy = document.getElementById('view-fancy-text');
  const viewSymbols = document.getElementById('view-symbols');
  const viewAuthor = document.getElementById('view-author');
  const viewNameGen = document.getElementById('view-name-gen');

  const btnHeaderLogoHome = document.getElementById('btn-header-logo-home');
  const btnSidebarAuthor = document.getElementById('btn-sidebar-author');
  const sidebarLinkHome = document.getElementById('sidebar-link-home');
  const sidebarLinkBio = document.getElementById('sidebar-link-bio');
  const sidebarLinkFancy = document.getElementById('sidebar-link-fancy');
  const sidebarLinkSymbols = document.getElementById('sidebar-link-symbols');
  const sidebarLinkNameGen = document.getElementById('sidebar-link-namegen');
  const sidebarLinkProfileItem = document.getElementById('sidebar-link-profile-item');
  const btnAuthorBackHome = document.getElementById('btn-author-back-home');

  function navigateTo(pageId) {
    currentPage = pageId;

    const views = [
      { el: viewHome, id: 'home' },
      { el: viewBio, id: 'bio' },
      { el: viewFancy, id: 'fancy' },
      { el: viewSymbols, id: 'symbols' },
      { el: viewAuthor, id: 'author' },
      { el: viewNameGen, id: 'namegen' }
    ];

    const activeView = views.find(v => v.el && !v.el.classList.contains('hidden'));

    if (activeView && activeView.id !== pageId) {
      activeView.el.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
      activeView.el.classList.add('opacity-0', 'translate-y-2', 'scale-98');

      setTimeout(() => {
        switchViewDOM(pageId, views);
      }, 150);
    } else {
      switchViewDOM(pageId, views);
    }
  }

  function switchViewDOM(pageId, views) {
    views.forEach(v => {
      if (v.el) {
        v.el.classList.add('hidden');
        v.el.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
        v.el.classList.add('opacity-0', 'translate-y-2', 'scale-98');
      }
    });

    // Reset Home Workspace link
    if (sidebarLinkHome) {
      sidebarLinkHome.className = 'w-full text-left flex items-center gap-2.5 p-3 rounded-lg text-sm font-medium text-zinc-600 bg-zinc-50 border border-zinc-100 transition-all duration-300 hover:translate-x-1 hover:shadow-sm cursor-pointer';
    }

    // Reset Developer Profile link
    if (sidebarLinkProfileItem) {
      sidebarLinkProfileItem.className = 'w-full text-left flex items-center gap-2.5 p-3 rounded-lg text-sm font-medium text-zinc-600 bg-zinc-50 border border-zinc-100 transition-all duration-300 hover:text-zinc-900 hover:bg-zinc-100/50 hover:translate-x-1 hover:shadow-sm cursor-pointer';
    }

    // Reset Tools Sidebar links
    [sidebarLinkBio, sidebarLinkFancy, sidebarLinkSymbols, sidebarLinkNameGen].forEach(link => {
      if (link) {
        link.className = 'w-full text-left flex items-center justify-between p-3 rounded-lg text-sm font-medium text-rose-700 bg-rose-50/40 border border-rose-100/30 transition-all duration-300 hover:text-rose-700 hover:bg-rose-50 hover:translate-x-1 hover:shadow-sm cursor-pointer';
        const badge = link.querySelector('.tool-badge');
        if (badge) {
          badge.className = 'tool-badge text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-rose-500/10 text-rose-600 border border-rose-200/40 tracking-wider';
        }
      }
    });

    // Clear fancy text DOM nodes when leaving fancy view to preserve memory/performance
    if (pageId !== 'fancy') {
      if (fancyPreviewsContainer) {
        fancyPreviewsContainer.innerHTML = '';
      }
    }

    let targetEl = null;
    const mainHeader = document.getElementById('main-header');
    if (pageId === 'home') {
      if (mainHeader) mainHeader.classList.add('hidden');
    } else {
      if (mainHeader) mainHeader.classList.remove('hidden');
    }

    if (pageId === 'home') {
      targetEl = viewHome;
      if (sidebarLinkHome) {
        sidebarLinkHome.className = 'w-full text-left flex items-center gap-2.5 p-3 rounded-lg text-sm font-semibold text-zinc-950 bg-zinc-100 border border-zinc-200/80 transition-all duration-300 hover:translate-x-1 hover:shadow-sm cursor-pointer';
      }
    } else if (pageId === 'bio') {
      targetEl = viewBio;
      if (sidebarLinkBio) {
        sidebarLinkBio.className = 'w-full text-left flex items-center justify-between p-3 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-rose-500 border border-rose-600 shadow-md shadow-rose-500/10 transition-all duration-300 hover:translate-x-1 cursor-pointer';
        const badge = sidebarLinkBio.querySelector('.tool-badge');
        if (badge) {
          badge.className = 'tool-badge text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-white/20 text-white border border-white/25 tracking-wider';
        }
      }
      updateWorkspaceState();
    } else if (pageId === 'fancy') {
      targetEl = viewFancy;
      if (sidebarLinkFancy) {
        sidebarLinkFancy.className = 'w-full text-left flex items-center justify-between p-3 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-rose-500 border border-rose-600 shadow-md shadow-rose-500/10 transition-all duration-300 hover:translate-x-1 cursor-pointer';
        const badge = sidebarLinkFancy.querySelector('.tool-badge');
        if (badge) {
          badge.className = 'tool-badge text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-white/20 text-white border border-white/25 tracking-wider';
        }
      }
      generateAllFancyText();
    } else if (pageId === 'symbols') {
      targetEl = viewSymbols;
      if (sidebarLinkSymbols) {
        sidebarLinkSymbols.className = 'w-full text-left flex items-center justify-between p-3 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-rose-500 border border-rose-600 shadow-md shadow-rose-500/10 transition-all duration-300 hover:translate-x-1 cursor-pointer';
        const badge = sidebarLinkSymbols.querySelector('.tool-badge');
        if (badge) {
          badge.className = 'tool-badge text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-white/20 text-white border border-white/25 tracking-wider';
        }
      }
      renderSymbolsPage();
    } else if (pageId === 'namegen') {
      targetEl = viewNameGen;
      if (sidebarLinkNameGen) {
        sidebarLinkNameGen.className = 'w-full text-left flex items-center justify-between p-3 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-rose-500 border border-rose-600 shadow-md shadow-rose-500/10 transition-all duration-300 hover:translate-x-1 cursor-pointer';
        const badge = sidebarLinkNameGen.querySelector('.tool-badge');
        if (badge) {
          badge.className = 'tool-badge text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-white/20 text-white border border-white/25 tracking-wider';
        }
      }
      generateAllNameGenText();
    } else if (pageId === 'author') {
      targetEl = viewAuthor;
      if (sidebarLinkProfileItem) {
        sidebarLinkProfileItem.className = 'w-full text-left flex items-center gap-2.5 p-3 rounded-lg text-sm font-semibold text-zinc-950 bg-zinc-100 border border-zinc-200/80 transition-all duration-300 hover:translate-x-1 hover:shadow-sm cursor-pointer';
      }
    }

    if (targetEl) {
      targetEl.classList.remove('hidden');
      setTimeout(() => {
        targetEl.classList.remove('opacity-0', 'translate-y-2', 'scale-98');
        targetEl.classList.add('opacity-100', 'translate-y-0', 'scale-100');
      }, 20);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeDrawer();
  }

  if (btnHeaderLogoHome) btnHeaderLogoHome.addEventListener('click', () => navigateTo('home'));
  if (btnSidebarAuthor) btnSidebarAuthor.addEventListener('click', () => navigateTo('author'));
  if (sidebarLinkHome) sidebarLinkHome.addEventListener('click', () => navigateTo('home'));
  if (sidebarLinkBio) sidebarLinkBio.addEventListener('click', () => navigateTo('bio'));
  if (sidebarLinkFancy) sidebarLinkFancy.addEventListener('click', () => navigateTo('fancy'));
  if (sidebarLinkSymbols) sidebarLinkSymbols.addEventListener('click', () => navigateTo('symbols'));
  if (sidebarLinkNameGen) sidebarLinkNameGen.addEventListener('click', () => navigateTo('namegen'));
  if (sidebarLinkProfileItem) sidebarLinkProfileItem.addEventListener('click', () => navigateTo('author'));
  if (btnAuthorBackHome) btnAuthorBackHome.addEventListener('click', () => navigateTo('home'));

  // Homepage Card Navigation listeners
  const btnCardBio = document.getElementById('btn-card-bio');
  if (btnCardBio) btnCardBio.addEventListener('click', () => navigateTo('bio'));

  const btnCardNameGen = document.getElementById('btn-card-namegen');
  if (btnCardNameGen) btnCardNameGen.addEventListener('click', () => navigateTo('namegen'));

  const btnCardFancy = document.getElementById('btn-card-fancy');
  if (btnCardFancy) btnCardFancy.addEventListener('click', () => navigateTo('fancy'));

  const btnCardSymbols = document.getElementById('btn-card-symbols');
  if (btnCardSymbols) btnCardSymbols.addEventListener('click', () => navigateTo('symbols'));

  const btnHomeViewAuthorProfile = document.getElementById('btn-home-view-author-profile');
  if (btnHomeViewAuthorProfile) btnHomeViewAuthorProfile.addEventListener('click', () => navigateTo('author'));

  const btnQuickSymbols = document.getElementById('btn-quick-symbols');
  if (btnQuickSymbols) {
    btnQuickSymbols.addEventListener('click', () => navigateTo('symbols'));
  }
  const btnHomeQuickSymbols = document.getElementById('btn-home-quick-symbols');
  if (btnHomeQuickSymbols) {
    btnHomeQuickSymbols.addEventListener('click', () => navigateTo('symbols'));
  }
  const btnQuickSymbolsNameGen = document.getElementById('btn-quick-symbols-namegen');
  if (btnQuickSymbolsNameGen) {
    btnQuickSymbolsNameGen.addEventListener('click', () => navigateTo('symbols'));
  }

  // Cross-tool navigation linked buttons
  const addNavLink = (id, dest) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => navigateTo(dest));
  };
  addNavLink('btn-link-bio-to-namegen', 'namegen');
  addNavLink('btn-link-bio-to-fancy', 'fancy');
  addNavLink('btn-link-bio-to-symbols', 'symbols');

  addNavLink('btn-link-fancy-to-bio', 'bio');
  addNavLink('btn-link-fancy-to-namegen', 'namegen');
  addNavLink('btn-link-fancy-to-symbols', 'symbols');

  addNavLink('btn-link-symbols-to-bio', 'bio');
  addNavLink('btn-link-symbols-to-namegen', 'namegen');
  addNavLink('btn-link-symbols-to-fancy', 'fancy');

  addNavLink('btn-link-namegen-to-bio', 'bio');
  addNavLink('btn-link-namegen-to-fancy', 'fancy');
  addNavLink('btn-link-namegen-to-symbols', 'symbols');

  // Homepage Quick Copy Event Delegation
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.btn-quick-copy');
    if (copyBtn) {
      e.stopPropagation();
      e.preventDefault();
      const textToCopy = copyBtn.getAttribute('data-copy');
      if (textToCopy) {
        copyToClipboard(textToCopy, `Symbol "${textToCopy}" copied!`);
      }
    }
  });

  // --- FANCY TEXT GENERATOR LOGIC ---
  const fancyInputText = document.getElementById('fancy-input-text');
  const fancyCharCounter = document.getElementById('fancy-char-counter');
  const fancyPreviewsContainer = document.getElementById('fancy-previews-container');

  function convertToFancyText(text, styleKey) {
    const charMap = FANCY_STYLES[styleKey];
    if (!charMap) return text;
    
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (charMap[char] !== undefined && charMap[char] !== "") {
        result += charMap[char];
      } else {
        result += char;
      }
    }
    return result;
  }

  function generateAllFancyText() {
    if (currentPage !== 'fancy') return;
    if (!fancyPreviewsContainer) return;
    
    const textVal = fancyInputText ? fancyInputText.value : "K I N G";
    const charCount = textVal.length;
    
    if (fancyCharCounter) {
      fancyCharCounter.innerText = `${charCount} / 12 characters`;
      if (charCount > 12) {
        fancyCharCounter.className = "text-[10px] font-mono font-bold text-rose-500 bg-rose-50 border border-rose-150 py-1 px-2.5 rounded-lg";
      } else {
        fancyCharCounter.className = "text-[10px] font-mono font-bold text-zinc-500 bg-zinc-50 border border-zinc-150 py-1 px-2.5 rounded-lg";
      }
    }

    fancyPreviewsContainer.innerHTML = '';

    Object.keys(FANCY_CATEGORIES).forEach(categoryName => {
      const styleKeys = FANCY_CATEGORIES[categoryName];
      
      const categorySection = document.createElement('div');
      categorySection.className = "space-y-3 text-left";
      
      const headerDiv = document.createElement('div');
      headerDiv.className = "border-b border-zinc-100 pb-1 flex justify-between items-center select-none";
      headerDiv.innerHTML = `
        <h3 class="text-xs font-extrabold text-zinc-800 tracking-wider uppercase">
          ${categoryName} Styles
        </h3>
        <span class="text-[9px] font-bold text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded-md">${styleKeys.length} variations</span>
      `;
      categorySection.appendChild(headerDiv);

      const gridDiv = document.createElement('div');
      gridDiv.className = "grid grid-cols-1 md:grid-cols-2 gap-3.5";

      styleKeys.forEach(styleKey => {
        const convertedText = convertToFancyText(textVal || "K I N G", styleKey);
        const fontNameHuman = styleKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        const previewBlock = document.createElement('div');
        previewBlock.className = "flex items-stretch justify-between bg-zinc-50/40 border border-zinc-200/80 hover:border-zinc-300 hover:bg-white rounded-xl overflow-hidden hover:shadow-sm transition-all duration-200 cursor-pointer";
        
        previewBlock.innerHTML = `
          <div class="flex-1 p-3.5 flex flex-col justify-center gap-1.5 overflow-hidden">
            <span class="text-[9px] font-bold text-zinc-400 font-mono tracking-wide uppercase select-none">${fontNameHuman}</span>
            <div class="font-mono text-base font-medium text-zinc-850 truncate select-all leading-tight">${convertedText}</div>
          </div>
          <button class="btn-copy-fancy w-12 shrink-0 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 text-zinc-400 border-l border-zinc-100 cursor-pointer active:scale-90 transition-all" title="Copy Stylish Nickname">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
            </svg>
          </button>
        `;
        
        previewBlock.querySelector('.btn-copy-fancy').addEventListener('click', (e) => {
          e.stopPropagation();
          copyToClipboard(convertedText, "Stylish nickname copied to clipboard!");
        });
        
        previewBlock.addEventListener('click', () => {
          copyToClipboard(convertedText, "Stylish nickname copied to clipboard!");
        });

        gridDiv.appendChild(previewBlock);
      });
      
      categorySection.appendChild(gridDiv);
      fancyPreviewsContainer.appendChild(categorySection);
    });
  }

  if (fancyInputText) {
    fancyInputText.addEventListener('input', generateAllFancyText);
  }

  const btnToggleNoteFancy = document.getElementById('btn-toggle-note-fancy');
  const arrowIconNoteFancy = document.getElementById('arrow-icon-note-fancy');
  const quickNoteContentFancy = document.getElementById('quick-note-content-fancy');

  if (btnToggleNoteFancy) {
    btnToggleNoteFancy.addEventListener('click', () => {
      const isCollapsed = quickNoteContentFancy.classList.contains('max-h-0');
      if (isCollapsed) {
        quickNoteContentFancy.classList.remove('max-h-0', 'opacity-0');
        quickNoteContentFancy.classList.add('max-h-[400px]', 'opacity-100');
        arrowIconNoteFancy.classList.add('rotate-180');
      } else {
        quickNoteContentFancy.classList.remove('max-h-[400px]', 'opacity-100');
        quickNoteContentFancy.classList.add('max-h-0', 'opacity-0');
        arrowIconNoteFancy.classList.remove('rotate-180');
      }
    });
  }

  const btnClearFancy = document.getElementById('btn-clear-fancy');
  if (btnClearFancy) {
    btnClearFancy.addEventListener('click', () => {
      if (fancyInputText) {
        fancyInputText.value = '';
        fancyInputText.focus();
        generateAllFancyText();
        showToast("Cleared fancy text input!");
      }
    });
  }

  // --- FF NAME GENERATOR TOOL LOGIC ---
  const namegenInputText = document.getElementById('namegen-input-text');
  const namegenCharCounter = document.getElementById('namegen-char-counter');
  const namegenPreviewsContainer = document.getElementById('namegen-previews-container');

  function generateAllNameGenText() {
    if (currentPage !== 'namegen') return;
    if (!namegenPreviewsContainer) return;

    const textVal = namegenInputText ? namegenInputText.value : "K I N G";
    const charCount = textVal.length;

    if (namegenCharCounter) {
      namegenCharCounter.innerText = `${charCount} / 12 characters`;
      if (charCount > 12) {
        namegenCharCounter.className = "text-[10px] font-mono font-bold text-rose-500 bg-rose-50 border border-rose-150 py-1 px-2.5 rounded-lg shrink-0";
      } else {
        namegenCharCounter.className = "text-[10px] font-mono font-bold text-zinc-500 bg-zinc-50 border border-zinc-150 py-1 px-2.5 rounded-lg shrink-0";
      }
    }

    namegenPreviewsContainer.innerHTML = '';

    const nameStyles = GENERATE_NAMEGEN_STYLES(textVal || "K I N G");

    Object.keys(nameStyles).forEach(categoryName => {
      const stylishList = nameStyles[categoryName];
      if (!stylishList || stylishList.length === 0) return;

      const categorySection = document.createElement('div');
      categorySection.className = "space-y-3 text-left";

      const headerDiv = document.createElement('div');
      headerDiv.className = "border-b border-zinc-100 pb-1 flex justify-between items-center select-none";
      headerDiv.innerHTML = `
        <h3 class="text-xs font-extrabold text-zinc-800 tracking-wider uppercase">
          ${categoryName}
        </h3>
      `;
      categorySection.appendChild(headerDiv);

      const gridDiv = document.createElement('div');
      gridDiv.className = "grid grid-cols-1 md:grid-cols-2 gap-3.5";

      stylishList.forEach((convertedText, idx) => {
        const textLen = convertedText.length;
        const limitExceeded = textLen > 12;
        const lenBadgeClass = limitExceeded 
          ? "bg-rose-500/10 text-rose-600 border-rose-200/40" 
          : "bg-emerald-500/10 text-emerald-600 border-emerald-200/40";

        const previewBlock = document.createElement('div');
        previewBlock.className = "flex items-stretch justify-between bg-zinc-50/40 border border-zinc-200/80 hover:border-zinc-300 hover:bg-white rounded-xl overflow-hidden hover:shadow-sm transition-all duration-200 cursor-pointer";

        previewBlock.innerHTML = `
          <div class="flex-1 p-3.5 flex flex-col justify-center gap-1.5 overflow-hidden">
            <div class="flex items-center gap-2 select-none">
              <span class="text-[8px] font-bold px-1.5 py-0.5 rounded-md border tracking-wide uppercase ${lenBadgeClass}">${textLen} Chars</span>
            </div>
            <div class="font-mono text-base font-medium text-zinc-850 truncate select-all leading-tight">${convertedText}</div>
          </div>
          <div class="flex items-stretch border-l border-zinc-100">
            <!-- Edit Button to load name back to input -->
            <button class="btn-edit-namegen w-11 shrink-0 flex items-center justify-center hover:bg-zinc-100 hover:text-zinc-800 text-zinc-400 border-r border-zinc-100 cursor-pointer active:scale-90 transition-all" title="Load styled name to continue editing">
              <i class="fa-solid fa-pen text-xs"></i>
            </button>
            <!-- Copy Button -->
            <button class="btn-copy-namegen w-11 shrink-0 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 text-zinc-400 cursor-pointer active:scale-90 transition-all" title="Copy Stylish Nickname">
              <i class="fa-solid fa-copy text-sm"></i>
            </button>
          </div>
        `;

        previewBlock.querySelector('.btn-copy-namegen').addEventListener('click', (e) => {
          e.stopPropagation();
          copyToClipboard(convertedText, "Stylish nickname copied to clipboard!");
        });

        previewBlock.querySelector('.btn-edit-namegen').addEventListener('click', (e) => {
          e.stopPropagation();
          if (namegenInputText) {
            namegenInputText.value = convertedText;
            namegenInputText.focus();
            generateAllNameGenText();
            showToast("Loaded nickname into editor!");
          }
        });

        previewBlock.addEventListener('click', () => {
          copyToClipboard(convertedText, "Stylish nickname copied to clipboard!");
        });

        gridDiv.appendChild(previewBlock);
      });

      categorySection.appendChild(gridDiv);
      namegenPreviewsContainer.appendChild(categorySection);
    });
  }

  if (namegenInputText) {
    namegenInputText.addEventListener('input', generateAllNameGenText);
  }

  const btnToggleNoteNameGen = document.getElementById('btn-toggle-note-namegen');
  const arrowIconNoteNameGen = document.getElementById('arrow-icon-note-namegen');
  const quickNoteContentNameGen = document.getElementById('quick-note-content-namegen');

  if (btnToggleNoteNameGen) {
    btnToggleNoteNameGen.addEventListener('click', () => {
      const isCollapsed = quickNoteContentNameGen.classList.contains('max-h-0');
      if (isCollapsed) {
        quickNoteContentNameGen.classList.remove('max-h-0', 'opacity-0');
        quickNoteContentNameGen.classList.add('max-h-[400px]', 'opacity-100');
        arrowIconNoteNameGen.classList.add('rotate-180');
      } else {
        quickNoteContentNameGen.classList.remove('max-h-[400px]', 'opacity-100');
        quickNoteContentNameGen.classList.add('max-h-0', 'opacity-0');
        arrowIconNoteNameGen.classList.remove('rotate-180');
      }
    });
  }

  const btnClearNameGen = document.getElementById('btn-clear-namegen');
  if (btnClearNameGen) {
    btnClearNameGen.addEventListener('click', () => {
      if (namegenInputText) {
        namegenInputText.value = '';
        namegenInputText.focus();
        generateAllNameGenText();
        showToast("Cleared nickname input!");
      }
    });
  }
  
  const btnBold = document.getElementById('btn-bold');
  const btnItalic = document.getElementById('btn-italic');
  const btnGlow = document.getElementById('btn-glow');
  const btnUnderline = document.getElementById('btn-underline');
  
  const btnClear = document.getElementById('btn-clear-workspace');
  const btnCopyWorkspace = document.getElementById('btn-copy-workspace');
  
  const sidebar = document.getElementById('nav-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const btnToggleSidebar = document.getElementById('btn-menu-toggle');
  const btnCloseSidebar = document.getElementById('btn-close-sidebar');

  // Collapse / expand rules banner
  const btnToggleNote = document.getElementById('btn-toggle-note');
  const arrowIconNote = document.getElementById('arrow-icon-note');
  const quickNoteContent = document.getElementById('quick-note-content');

  // Modal Picker Elements
  const btnOpenPicker = document.getElementById('btn-open-picker');
  const pickerModal = document.getElementById('picker-modal');
  const pickerModalContent = document.getElementById('picker-modal-content');
  const btnClosePickerModal = document.getElementById('btn-close-picker-modal');
  const btnCancelPicker = document.getElementById('btn-cancel-picker');
  const btnSelectPicker = document.getElementById('btn-select-picker');

  // Radial Canvas Picker Elements
  const colorWheelCanvas = document.getElementById('color-wheel-canvas');
  const brightnessSlider = document.getElementById('picker-brightness-slider');
  const valV = document.getElementById('picker-v-val');
  const valR = document.getElementById('picker-r-val');
  const valG = document.getElementById('picker-g-val');
  const valB = document.getElementById('picker-b-val');
  const pickerSwatch = document.getElementById('picker-swatch');
  const pickerHexText = document.getElementById('picker-hex-text');

  // Color picker custom state variables
  let currentH = 345;   // Default hue (rose red accent E11D48)
  let currentS = 0.85;  // Default saturation
  let currentV = 0.88;  // Default brightness (Value)
  let isDraggingColor = false;

  // Info Modal Pages Elements
  const infoModal = document.getElementById('info-modal');
  const infoModalContent = document.getElementById('info-modal-content');
  const infoModalTitle = document.getElementById('info-modal-title');
  const infoModalBody = document.getElementById('info-modal-body');
  const btnCloseInfoModal = document.getElementById('btn-close-info-modal');
  const btnCloseInfoModalFooter = document.getElementById('btn-close-info-modal-footer');

  // Close sidebar drawer link helper
  const sidebarLinkPresets = document.getElementById('sidebar-link-presets');
  if (sidebarLinkPresets) {
    sidebarLinkPresets.addEventListener('click', () => {
      closeDrawer();
    });
  }

  const pageWrapper = document.getElementById('page-wrapper');

  // Toggle Collapse / Expand Quick Note Rules with smooth animation
  btnToggleNote.addEventListener('click', () => {
    const isCollapsed = quickNoteContent.classList.contains('max-h-0');
    if (isCollapsed) {
      quickNoteContent.classList.remove('max-h-0', 'opacity-0');
      quickNoteContent.classList.add('max-h-[400px]', 'opacity-100');
      arrowIconNote.classList.add('rotate-180');
    } else {
      quickNoteContent.classList.remove('max-h-[400px]', 'opacity-100');
      quickNoteContent.classList.add('max-h-0', 'opacity-0');
      arrowIconNote.classList.remove('rotate-180');
    }
  });

  // Sync line number gutter to line breaks (fully unlimited)
  function updateLineGutter() {
    const value = textarea.value;
    const lines = value.split('\n').length;
    let gutterHTML = '';
    for (let i = 1; i <= lines; i++) {
      gutterHTML += `<div class="h-6 flex items-center justify-center font-bold text-[10px] text-zinc-300 font-mono select-none">${i}</div>`;
    }
    lineGutter.innerHTML = gutterHTML;
  }

  // State calculations & Limits monitoring
  function updateWorkspaceState() {
    if (currentPage !== 'bio') return;
    const value = textarea.value;
    
    // Character length counter
    const length = value.length;
    charCounter.innerText = `${length} characters`;
    
    charCounter.className = "text-xs font-mono font-bold text-zinc-500 bg-zinc-50 border border-zinc-150 py-1 px-2.5 rounded-lg select-none flex items-center gap-1";

    updateLineGutter();

    // Render parsed emulator result
    livePreview.innerHTML = parseFreeFireBio(value);
  }

  // Formatting BBCode selection insertion helper
  function insertFormatTag(tag) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    // Insert text at cursor position
    const before = text.substring(0, start);
    const after = text.substring(end);
    const newText = before + tag + after;

    textarea.value = newText;
    updateWorkspaceState();
    // Reset cursor position to right after inserted tag
    const cursorOffset = start + tag.length;
    textarea.setSelectionRange(cursorOffset, cursorOffset);
    textarea.focus();
  }

  // Dynamic update workspace state on input
  textarea.addEventListener('input', () => {
    updateWorkspaceState();
  });

  // Action Bar event linkings
  btnBold.addEventListener('click', () => insertFormatTag('[b]'));
  btnItalic.addEventListener('click', () => insertFormatTag('[i]'));
  btnGlow.addEventListener('click', () => insertFormatTag('[c]'));
  btnUnderline.addEventListener('click', () => insertFormatTag('[u]'));
  
  btnClear.addEventListener('click', () => {
    textarea.value = "";
    updateWorkspaceState();
    textarea.focus();
    showToast("Workspace cleared successfully!");
  });

  btnCopyWorkspace.addEventListener('click', () => {
    const text = textarea.value;
    if (text) {
      copyToClipboard(text, "Your custom signature is copied! Paste it in-game.");
    } else {
      showToast("Cannot copy empty workspace signature!", "error");
    }
  });

  // Slide-out Drawer Navigation Controls
  function openDrawer() {
    sidebarOverlay.classList.remove('pointer-events-none', 'opacity-0');
    sidebarOverlay.classList.add('opacity-100');
    sidebar.classList.remove('translate-x-full');
    if (pageWrapper) pageWrapper.classList.add('blur-[4px]');
  }

  function closeDrawer() {
    sidebarOverlay.classList.remove('opacity-100');
    sidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
    sidebar.classList.add('translate-x-full');
    if (pageWrapper) pageWrapper.classList.remove('blur-[4px]');
  }

  btnToggleSidebar.addEventListener('click', openDrawer);
  btnCloseSidebar.addEventListener('click', closeDrawer);
  sidebarOverlay.addEventListener('click', closeDrawer);

  // --- HSV Canvas Radial Color Wheel Implementation ---
  
  // HSV to RGB conversion helper
  function hsvToRgb(h, s, v) {
    let r, g, b;
    const i = Math.floor(h / 60) % 6;
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

  // Draw HSV Color Wheel with Indicator Ring
  function drawColorWheel() {
    if (!colorWheelCanvas) return;
    const ctx = colorWheelCanvas.getContext('2d');
    const width = colorWheelCanvas.width;
    const height = colorWheelCanvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = cx - 5;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= radius) {
          let angle = Math.atan2(dy, dx) * (180 / Math.PI);
          if (angle < 0) angle += 360;
          const saturation = dist / radius;
          const rgb = hsvToRgb(angle, saturation, currentV);
          const index = (y * width + x) * 4;
          data[index] = rgb.r;
          data[index + 1] = rgb.g;
          data[index + 2] = rgb.b;
          data[index + 3] = 255;
        } else {
          const index = (y * width + x) * 4;
          data[index + 3] = 0;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);

    // Draw the selection indicator ring
    const indicatorX = cx + currentS * radius * Math.cos(currentH * Math.PI / 180);
    const indicatorY = cy + currentS * radius * Math.sin(currentH * Math.PI / 180);

    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 6, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, 6, 0, 2 * Math.PI);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // RGB to HSV helper
  function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s;
    const v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: s,
      v: v
    };
  }

  // Calculate hex chunks and update colors
  function updateModalColors() {
    const rgb = hsvToRgb(currentH, currentS, currentV);

    // Update text labels
    if (valR) valR.innerText = rgb.r;
    if (valG) valG.innerText = rgb.g;
    if (valB) valB.innerText = rgb.b;

    // Convert to exactly 6 digit hex uppercase code
    const rHex = rgb.r.toString(16).padStart(2, '0').toUpperCase();
    const gHex = rgb.g.toString(16).padStart(2, '0').toUpperCase();
    const bHex = rgb.b.toString(16).padStart(2, '0').toUpperCase();
    const finalHex = `${rHex}${gHex}${bHex}`;

    // Update the swatch and the generated tag string
    if (pickerSwatch) pickerSwatch.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    if (pickerHexText) pickerHexText.innerText = `[${finalHex}]`;

    // Sync manual input if user is not currently typing in it
    const hexInput = document.getElementById('picker-hex-input');
    if (hexInput && document.activeElement !== hexInput) {
      hexInput.value = finalHex;
    }
  }

  function handleColorSelect(clientX, clientY) {
    const rect = colorWheelCanvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const cx = colorWheelCanvas.width / 2;
    const cy = colorWheelCanvas.height / 2;
    const radius = cx - 5;

    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let selectedDist = dist;
    if (dist > radius) {
      selectedDist = radius;
    }

    currentH = Math.atan2(dy, dx) * (180 / Math.PI);
    if (currentH < 0) currentH += 360;
    currentS = selectedDist / radius;

    updateModalColors();
    drawColorWheel();
  }

  // Drag listeners
  if (colorWheelCanvas) {
    colorWheelCanvas.addEventListener('mousedown', (e) => {
      isDraggingColor = true;
      handleColorSelect(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingColor) return;
      handleColorSelect(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      isDraggingColor = false;
    });

    // Touch support for mobile devices
    colorWheelCanvas.addEventListener('touchstart', (e) => {
      isDraggingColor = true;
      handleColorSelect(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDraggingColor) return;
      handleColorSelect(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDraggingColor = false;
    });
  }

  if (brightnessSlider) {
    brightnessSlider.addEventListener('input', () => {
      const val = parseInt(brightnessSlider.value);
      if (valV) valV.innerText = `${val}%`;
      currentV = val / 100;
      updateModalColors();
      drawColorWheel();
    });
  }

  const pickerHexInput = document.getElementById('picker-hex-input');
  if (pickerHexInput) {
    pickerHexInput.addEventListener('input', () => {
      let val = pickerHexInput.value.trim().toUpperCase();
      // Remove starting '#' or '[' or ']' if typed
      val = val.replace(/[#[\]]/g, '');
      
      // Match valid 6-char hex code
      if (/^[0-9A-F]{6}$/i.test(val)) {
        const r = parseInt(val.substring(0, 2), 16);
        const g = parseInt(val.substring(2, 4), 16);
        const b = parseInt(val.substring(4, 6), 16);
        
        const hsv = rgbToHsv(r, g, b);
        currentH = hsv.h;
        currentS = hsv.s;
        currentV = hsv.v;
        
        // Sync brightness slider
        if (brightnessSlider) {
          brightnessSlider.value = Math.round(currentV * 100);
          if (valV) valV.innerText = `${brightnessSlider.value}%`;
        }
        
        updateModalColors();
        drawColorWheel();
      }
    });
  }

  // Set color from Hex helper (used by suggested colors)
  function setHexColor(hex) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const hsv = rgbToHsv(r, g, b);
    currentH = hsv.h;
    currentS = hsv.s;
    currentV = hsv.v;
    
    if (brightnessSlider) {
      brightnessSlider.value = Math.round(currentV * 100);
      if (valV) valV.innerText = `${brightnessSlider.value}%`;
    }
    
    updateModalColors();
    drawColorWheel();
  }

  // Bind click event for suggested color buttons
  document.querySelectorAll('.btn-suggested-color').forEach(btn => {
    btn.addEventListener('click', () => {
      const hex = btn.getAttribute('data-hex');
      if (hex) {
        setHexColor(hex);
      }
    });
  });

  function openColorPicker() {
    pickerModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    if (pageWrapper) pageWrapper.classList.add('blur-[4px]');
    requestAnimationFrame(() => {
      pickerModal.classList.add('opacity-100');
      pickerModalContent.classList.remove('scale-95', 'opacity-0');
      pickerModalContent.classList.add('scale-100', 'opacity-100');
    });
    updateModalColors();
    drawColorWheel();
  }

  function closeColorPicker() {
    pickerModal.classList.remove('opacity-100');
    pickerModalContent.classList.remove('scale-100', 'opacity-100');
    pickerModalContent.classList.add('scale-95', 'opacity-0');
    document.body.classList.remove('overflow-hidden');
    if (pageWrapper) pageWrapper.classList.remove('blur-[4px]');
    setTimeout(() => {
      pickerModal.classList.add('hidden');
    }, 250);
  }

  btnOpenPicker.addEventListener('click', openColorPicker);
  btnClosePickerModal.addEventListener('click', closeColorPicker);
  btnCancelPicker.addEventListener('click', closeColorPicker);

  // Inject computed hex code directly inside user's editor
  btnSelectPicker.addEventListener('click', () => {
    const rgb = hsvToRgb(currentH, currentS, currentV);
    const rHex = rgb.r.toString(16).padStart(2, '0').toUpperCase();
    const gHex = rgb.g.toString(16).padStart(2, '0').toUpperCase();
    const bHex = rgb.b.toString(16).padStart(2, '0').toUpperCase();
    const finalHex = `${rHex}${gHex}${bHex}`;

    insertFormatTag(`[${finalHex}]`);
    closeColorPicker();
    showToast(`Injected color tag [${finalHex}]`);
  });


  // --- INFO MODAL PAGES INTERACTIVITY ---
  const infoPagesContent = {
    about: {
      title: `<span class="text-rose-600 font-bold">About Us</span> • Free Fire Bio Studio`,
      body: `
        <div class="space-y-4">
          <p class="text-zinc-600 font-medium">
            Welcome to the ultimate Free Fire signature customization playground! 
          </p>
          <p>
            This application is designed as an offline-first, modern creative workshop to help Garena Free Fire gamers build visually striking player signatures without wasting diamonds testing layout codes in-game.
          </p>
          <p>
            Using clean visual markup templates, high-contrast indicators, and state-of-the-art live parsing algorithms, you can craft, test, and instantly generate compliant BBCode combinations tailored precisely to Garena's official client parameters.
          </p>
          <div class="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <h5 class="text-xs font-bold text-zinc-800">Core Mission</h5>
            <p class="text-xs text-zinc-500">Provide an accessible, completely free, and ultra-polished layout editor for esports teams, competitive players, and community designers.</p>
          </div>
        </div>
      `
    },
    faq: {
      title: `<span class="text-rose-600 font-bold">F.A.Q. Help Center</span> • Common Questions`,
      body: `
        <div class="space-y-4 text-xs">
          <div class="border-b border-zinc-100 pb-3">
            <h4 class="font-bold text-zinc-800 text-sm">1. How do I put these codes inside Free Fire?</h4>
            <p class="text-zinc-500 mt-1 leading-relaxed">Design your signature in the workspace above, copy it by clicking the Copy icon, launch Free Fire, navigate to your Profile, tap on Player Settings, find the Signature / Bio box, paste the code, and click Save!</p>
          </div>
          <div class="border-b border-zinc-100 pb-3">
            <h4 class="font-bold text-zinc-800 text-sm">2. Why doesn't color display inside the workspace input?</h4>
            <p class="text-zinc-500 mt-1 leading-relaxed">Browser input fields cannot parse custom in-game BBCodes natively. The colored rendering is emulated in real-time inside the in-game simulator box right below the text area.</p>
          </div>
          <div class="border-b border-zinc-100 pb-3">
            <h4 class="font-bold text-zinc-800 text-sm">3. Why is there a 50-character limit?</h4>
            <p class="text-zinc-500 mt-1 leading-relaxed">Garena Free Fire strictly sets a 50-character limit on signature bios. Any code characters (like <code class="font-mono bg-zinc-100 px-1 py-0.5 rounded font-bold">[b]</code> or color tags) count towards this 50-char cap. Going over this will break your signature inside the game.</p>
          </div>
          <div>
            <h4 class="font-bold text-zinc-800 text-sm">4. Are symbols like stars, swords, or crowns supported?</h4>
            <p class="text-zinc-500 mt-1 leading-relaxed">Absolutely! You can paste any beautiful unicode character directly into the editor, style it using tags, and preview how it responds live.</p>
          </div>
        </div>
      `
    },
    symbols: {
      title: `<span class="text-rose-600 font-bold">Special Game Symbols</span> • Tap to Insert`,
      body: `
        <div class="space-y-4">
          <p class="text-xs text-zinc-500 leading-relaxed">
            These unique unicode symbols are fully supported inside Garena Free Fire player signatures. Tap any symbol to copy and insert it directly into your workspace editor cursor position!
          </p>
          
          <div class="space-y-3">
            <h5 class="text-xs font-bold text-zinc-800 flex items-center gap-1.5 border-b border-zinc-100 pb-1">
              🏆 Pro Esports & Stars
            </h5>
            <div class="grid grid-cols-6 sm:grid-cols-8 gap-2" id="symbols-esports-grid">
              <!-- Rendered programmatically -->
            </div>
          </div>
          
          <div class="space-y-3 pt-1">
            <h5 class="text-xs font-bold text-zinc-800 flex items-center gap-1.5 border-b border-zinc-100 pb-1">
              ⚔️ Weapons & Hazards
            </h5>
            <div class="grid grid-cols-6 sm:grid-cols-8 gap-2" id="symbols-weapons-grid">
              <!-- Rendered programmatically -->
            </div>
          </div>

          <div class="space-y-3 pt-1">
            <h5 class="text-xs font-bold text-zinc-800 flex items-center gap-1.5 border-b border-zinc-100 pb-1">
              👑 Crowns, Badges & Brackets
            </h5>
            <div class="grid grid-cols-6 sm:grid-cols-8 gap-2" id="symbols-brackets-grid">
              <!-- Rendered programmatically -->
            </div>
          </div>
        </div>
      `
    },
    disclaimer: {
      title: `<span class="text-rose-600 font-bold">Legal Disclaimer</span> • Not Affiliated with Garena`,
      body: `
        <div class="space-y-4">
          <p class="font-bold text-rose-600 text-sm">⚠️ OFFICIAL BRAND NOTICE</p>
          <p>
            Free Fire Bio Studio is a completely independent, third-party utility. 
          </p>
          <p class="text-zinc-500">
            This tool is <strong>not affiliated, associated, authorized, endorsed, sponsored by, or in any way officially connected with Garena</strong>, Garena Free Fire, or any of their parent corporations, subsidiaries, or affiliates.
          </p>
          <p class="text-zinc-500">
            All trademarks, registered graphics, game names, official logo designs, and player profile frameworks are the absolute intellectual property of Garena and their respective copyright holders.
          </p>
        </div>
      `
    },
    terms: {
      title: `<span class="text-rose-600 font-bold">Terms of Service</span> • Usage Framework`,
      body: `
        <div class="space-y-3">
          <p>By accessing or testing layouts inside Free Fire Bio Studio, you agree to the following terms:</p>
          <ul class="list-disc pl-5 space-y-2 text-zinc-500">
            <li>The software is provided strictly free, "as is" without representations of warranty or compatibility.</li>
            <li>You agree not to use this tool to generate hateful, offensive, or abusive signature bios inside the live game client.</li>
            <li>You acknowledge that this tool only acts as a preview simulator, and cannot write parameters directly into your live Garena client.</li>
          </ul>
        </div>
      `
    },
    privacy: {
      title: `<span class="text-rose-600 font-bold">Privacy Policy</span> • 100% Offline Client Privacy`,
      body: `
        <div class="space-y-4">
          <p class="font-semibold text-zinc-800">Your custom creative work is completely safe.</p>
          <p>
            We strongly believe in an offline-first and tracker-free user experience:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-zinc-500">
            <li><strong>Zero Server Storage:</strong> Your custom bios, selected colors, and templates reside strictly inside your local web browser memory. No data is ever transmitted to a server database.</li>
            <li><strong>No Analytics Tracking:</strong> We run zero analytics suites, tracking cookies, or Facebook/Google advertising pixels.</li>
            <li><strong>No Account Signups:</strong> We do not ask for player emails, IDs, character passwords, or phone details. Just open, create, and copy!</li>
          </ul>
        </div>
      `
    }
  };

  function openInfoModal(pageKey) {
    const data = infoPagesContent[pageKey];
    if (!data) return;

    infoModalTitle.innerHTML = data.title;
    infoModalBody.innerHTML = data.body;

    // Toggle visual visibility smoothly
    infoModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    if (pageWrapper) pageWrapper.classList.add('blur-[4px]');
    requestAnimationFrame(() => {
      infoModal.classList.add('opacity-100');
      infoModalContent.classList.remove('scale-95', 'opacity-0');
      infoModalContent.classList.add('scale-100', 'opacity-100');
    });

    // Populate interactive symbols list if opened
    if (pageKey === 'symbols') {
      const esportsGrid = document.getElementById('symbols-esports-grid');
      const weaponsGrid = document.getElementById('symbols-weapons-grid');
      const bracketsGrid = document.getElementById('symbols-brackets-grid');

      const categories = {
        esports: ["★", "☆", "⚡", "✨", "❖", "⚜", "❂", "👑", "✪", "🎯", "🛡️", "🔥", "☄", "⚽", "🔱", "⚓"],
        weapons: ["⚔", "☠", "☣", "🔫", "🏹", "🗡️", "⚔️", "⛓️", "🛡️", "🧬", "🦠", "☯", "☄", "💣", "⚡", "☘"],
        brackets: ["꧁", "꧂", "𓆩", "𓆪", "♛", "♔", "♥", "♦", "♣", "♠", "⚚", "⚕", "⚖", "⚓", "✿", "❀"]
      };

      const populateGrid = (gridEl, list) => {
        if (!gridEl) return;
        gridEl.innerHTML = '';
        list.forEach(sym => {
          const btn = document.createElement('button');
          btn.className = "btn-symbol-insert py-2 px-1 text-center bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-sm font-bold active:scale-90 transition-all cursor-pointer";
          btn.innerText = sym;
          btn.addEventListener('click', () => {
            insertFormatTag(sym);
            showToast(`Inserted symbol: ${sym}`);
          });
          gridEl.appendChild(btn);
        });
      };

      populateGrid(esportsGrid, categories.esports);
      populateGrid(weaponsGrid, categories.weapons);
      populateGrid(bracketsGrid, categories.brackets);
    }
  }

  function closeInfoModal() {
    infoModal.classList.remove('opacity-100');
    infoModalContent.classList.remove('scale-100', 'opacity-100');
    infoModalContent.classList.add('scale-95', 'opacity-0');
    document.body.classList.remove('overflow-hidden');
    if (pageWrapper) pageWrapper.classList.remove('blur-[4px]');
    setTimeout(() => {
      infoModal.classList.add('hidden');
    }, 250);
  }

  // Bind all info page triggers programmatically (Handles both sidebar list and footer links)
  document.querySelectorAll('.btn-info-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const page = e.currentTarget.getAttribute('data-page');
      if (page) {
        closeDrawer(); // Auto close navigation drawer if opened
        openInfoModal(page);
      }
    });
  });

  btnCloseInfoModal.addEventListener('click', closeInfoModal);
  btnCloseInfoModalFooter.addEventListener('click', closeInfoModal);


  // --- 6. Programmatically Populate Ready-Made Category Matrices ---
  // (Stacking them one after another instead of swappable tabs!)
  function renderAllPresets() {
    const listContainer = document.getElementById('presets-items-grid');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    
    PRESET_BIOS.forEach((catObj) => {
      // Category Section Header Divider
      const headerDiv = document.createElement('div');
      headerDiv.className = "col-span-1 md:col-span-2 pt-6 pb-2 mt-4 first:mt-0";
      headerDiv.innerHTML = `
        <h3 class="text-sm sm:text-base font-extrabold text-zinc-800 tracking-tight select-none inline-block border-b-2 border-rose-600 pb-1" data-category="${catObj.category}">
          ${catObj.category}
        </h3>
      `;
      listContainer.appendChild(headerDiv);

      // Render preset cards under this category
      catObj.presets.forEach((preset) => {
        const codeLength = preset.rawCode.length;
        
        // Card Layout (Minimalist compact with extra text labels removed)
        const card = document.createElement('div');
        card.className = "flex flex-row items-stretch justify-between bg-white border border-zinc-200/80 rounded-xl overflow-hidden hover:shadow-md hover:border-zinc-300 transition-all duration-300 transform hover:-translate-y-[2px]";
        
        const parsedPreview = parseFreeFireBio(preset.rawCode);
        
        card.innerHTML = `
          <!-- Left Wide Column: Stacked preview and copy fields -->
          <div class="flex-1 p-4 flex flex-col gap-2.5 justify-between border-r border-zinc-100 bg-gradient-to-br from-zinc-50/10 to-white">
            <!-- Rendered preview row -->
            <div class="flex flex-col gap-1">
              <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 min-h-[46px] flex items-center justify-start shadow-inner overflow-x-auto">
                <div class="font-mono text-xs leading-relaxed text-zinc-100">${parsedPreview}</div>
              </div>
            </div>
            <!-- Raw code block row -->
            <div class="flex flex-col gap-1">
              <div class="relative bg-zinc-50 border border-zinc-200 rounded-lg py-1.5 px-2.5 flex items-center justify-between">
                <code class="font-mono text-[11px] text-zinc-600 select-all break-all pr-8 leading-relaxed">${preset.rawCode}</code>
                <button class="absolute right-2 text-zinc-400 hover:text-zinc-900 transition-colors p-1" title="${preset.description}" disabled>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Right Narrow Column: Compact action icons -->
          <div class="w-14 shrink-0 bg-zinc-50/50 p-2.5 flex flex-col justify-between items-center gap-2 border-l border-zinc-100 select-none">
            <!-- Character Count badge -->
            <div class="flex flex-col items-center">
              <span class="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-200/50 px-1.5 py-0.5 rounded">${codeLength} chars</span>
            </div>
            
            <!-- Pencil / Edit Icon (Instant Load) -->
            <button class="btn-load-preset group flex items-center justify-center w-8 h-8 rounded-lg hover:bg-rose-50 hover:text-rose-600 text-zinc-400 transition-colors cursor-pointer" title="Load into Workspace">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </button>
            
            <!-- Copy trigger button -->
            <button class="btn-copy-preset group flex items-center justify-center w-8 h-8 rounded-lg hover:bg-zinc-100 hover:text-zinc-900 text-zinc-400 transition-colors cursor-pointer" title="Copy Raw Code">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
              </svg>
            </button>
          </div>
        `;

        card.querySelector('.btn-load-preset').addEventListener('click', () => {
          textarea.value = preset.rawCode;
          updateWorkspaceState();
          textarea.focus();
          showToast("Preset bio loaded into workspace!");
          window.scrollTo({ top: textarea.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
        });

        card.querySelector('.btn-copy-preset').addEventListener('click', () => {
          copyToClipboard(preset.rawCode, "Preset bio code copied!");
        });

        listContainer.appendChild(card);
      });
    });
  }

  // Populate custom animated category navigation dropdown
  const dropdownTrigger = document.getElementById('custom-dropdown-trigger');
  const dropdownMenu = document.getElementById('custom-dropdown-menu');
  const selectedText = document.getElementById('custom-dropdown-selected-text');
  const dropdownArrow = document.getElementById('custom-dropdown-arrow');
  const btnJumpToCategory = document.getElementById('btn-jump-to-category');
  
  let selectedCategoryValue = "";

  if (dropdownMenu) {
    dropdownMenu.innerHTML = '';
    PRESET_BIOS.forEach((catObj, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = "w-full text-left py-2 px-3 text-xs font-semibold text-zinc-600 hover:text-rose-600 hover:bg-zinc-50 transition-all cursor-pointer block border-b border-zinc-100 last:border-0";
      btn.innerText = catObj.category;
      btn.setAttribute('data-value', catObj.category);
      
      // Select the first category by default
      if (index === 0) {
        selectedCategoryValue = catObj.category;
        if (selectedText) selectedText.innerText = catObj.category;
      }

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedCategoryValue = catObj.category;
        if (selectedText) selectedText.innerText = catObj.category;
        closeCustomDropdown();
      });

      dropdownMenu.appendChild(btn);
    });
  }

  function toggleCustomDropdown() {
    if (!dropdownMenu) return;
    const isClosed = dropdownMenu.classList.contains('pointer-events-none');
    if (isClosed) {
      openCustomDropdown();
    } else {
      closeCustomDropdown();
    }
  }

  function openCustomDropdown() {
    if (!dropdownMenu) return;
    dropdownMenu.classList.remove('scale-y-0', 'opacity-0', 'pointer-events-none');
    dropdownMenu.classList.add('scale-y-100', 'opacity-100');
    if (dropdownArrow) dropdownArrow.classList.add('rotate-180');
  }

  function closeCustomDropdown() {
    if (!dropdownMenu) return;
    dropdownMenu.classList.remove('scale-y-100', 'opacity-100');
    dropdownMenu.classList.add('scale-y-0', 'opacity-0', 'pointer-events-none');
    if (dropdownArrow) dropdownArrow.classList.remove('rotate-180');
  }

  if (dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCustomDropdown();
    });
  }

  // Click outside to close custom dropdown
  document.addEventListener('click', () => {
    if (dropdownMenu && !dropdownMenu.classList.contains('pointer-events-none')) {
      closeCustomDropdown();
    }
  });

  if (btnJumpToCategory) {
    btnJumpToCategory.addEventListener('click', () => {
      if (!selectedCategoryValue) {
        showToast("Please select a category first!", "warning");
        return;
      }
      const targetHeader = document.querySelector(`[data-category="${selectedCategoryValue}"]`);
      if (targetHeader) {
        const headerOffset = 85;
        const elementPosition = targetHeader.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        showToast(`Navigated to: ${selectedCategoryValue}`);
      }
    });
  }

  // --- FF STYLISH SYMBOLS LOGIC ---
  const symbolsDropdownTrigger = document.getElementById('symbols-dropdown-trigger');
  const symbolsDropdownSelectedText = document.getElementById('symbols-dropdown-selected-text');
  const symbolsDropdownMenu = document.getElementById('symbols-dropdown-menu');
  const symbolsDropdownArrow = document.getElementById('symbols-dropdown-arrow');
  const symbolsWrapperCards = document.getElementById('symbols-wrapper-cards');

  let selectedSymbolsCategory = "All Categories";

  function renderSymbolsPage(filterCategory = "All Categories") {
    if (!symbolsWrapperCards) return;
    symbolsWrapperCards.innerHTML = '';

    Object.entries(symbolsData).forEach(([category, symbols]) => {
      if (filterCategory !== "All Categories" && category !== filterCategory) return;

      // Wrapper card
      const card = document.createElement('div');
      card.className = "bg-white border border-zinc-200/80 rounded-2xl shadow-sm hover:shadow transition-shadow duration-300 p-5 space-y-4";
      
      // Card Header
      const header = document.createElement('div');
      header.className = "flex items-center justify-between border-b border-zinc-100 pb-3";
      header.innerHTML = `
        <div class="flex items-center gap-2 select-none">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
          <h3 class="text-sm font-extrabold text-zinc-900 tracking-wider uppercase">${category}</h3>
        </div>
        <span class="text-[10px] font-mono font-bold bg-zinc-50 border border-zinc-150 py-0.5 px-2 rounded-md text-zinc-400 select-none">
          ${symbols.length} elements
        </span>
      `;
      card.appendChild(header);

      // Grid/Flex wrap of symbols buttons
      const grid = document.createElement('div');
      grid.className = "flex flex-wrap gap-2 pt-1";

      symbols.forEach(symbol => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = "group flex items-center justify-center px-4 py-2.5 bg-zinc-50/50 hover:bg-rose-50 border border-zinc-200 hover:border-rose-200 text-zinc-800 hover:text-rose-600 rounded-xl font-medium transition-all duration-200 active:scale-95 cursor-pointer relative overflow-hidden text-sm shrink-0";
        btn.innerText = symbol;
        btn.title = `Click to Copy "${symbol}"`;

        btn.addEventListener('click', () => {
          navigator.clipboard.writeText(symbol).then(() => {
            showToast(`Copied: ${symbol}`);
            // Temporary copy animation feedback
            btn.classList.remove('bg-zinc-50/50', 'hover:bg-rose-50', 'border-zinc-200', 'hover:border-rose-200', 'text-zinc-800', 'hover:text-rose-600');
            btn.classList.add('bg-emerald-500', 'text-white', 'border-emerald-500');
            setTimeout(() => {
              btn.classList.remove('bg-emerald-500', 'text-white', 'border-emerald-500');
              btn.classList.add('bg-zinc-50/50', 'hover:bg-rose-50', 'border-zinc-200', 'hover:border-rose-200', 'text-zinc-800', 'hover:text-rose-600');
            }, 600);
          }).catch(err => {
            console.error("Clipboard copy failed:", err);
          });
        });

        grid.appendChild(btn);
      });

      card.appendChild(grid);
      symbolsWrapperCards.appendChild(card);
    });
  }

  function renderSymbolsDropdown() {
    if (!symbolsDropdownMenu) return;
    symbolsDropdownMenu.innerHTML = '';

    // "All Categories" option
    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = "w-full text-left py-2.5 px-4 text-xs font-semibold text-zinc-600 hover:text-rose-600 hover:bg-zinc-50 transition-all cursor-pointer block border-b border-zinc-100 last:border-0";
    allBtn.innerText = "All Categories";
    allBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedSymbolsCategory = "All Categories";
      if (symbolsDropdownSelectedText) symbolsDropdownSelectedText.innerText = "All Categories";
      closeSymbolsDropdown();
      renderSymbolsPage("All Categories");
    });
    symbolsDropdownMenu.appendChild(allBtn);

    // Dynamic categories options
    Object.keys(symbolsData).forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = "w-full text-left py-2.5 px-4 text-xs font-semibold text-zinc-600 hover:text-rose-600 hover:bg-zinc-50 transition-all cursor-pointer block border-b border-zinc-100 last:border-0";
      btn.innerText = cat;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedSymbolsCategory = cat;
        if (symbolsDropdownSelectedText) symbolsDropdownSelectedText.innerText = cat;
        closeSymbolsDropdown();
        renderSymbolsPage(cat);
      });
      symbolsDropdownMenu.appendChild(btn);
    });
  }

  function toggleSymbolsDropdown() {
    if (!symbolsDropdownMenu) return;
    const isClosed = symbolsDropdownMenu.classList.contains('pointer-events-none');
    if (isClosed) {
      openSymbolsDropdown();
    } else {
      closeSymbolsDropdown();
    }
  }

  function openSymbolsDropdown() {
    if (!symbolsDropdownMenu) return;
    symbolsDropdownMenu.classList.remove('scale-y-0', 'opacity-0', 'pointer-events-none');
    symbolsDropdownMenu.classList.add('scale-y-100', 'opacity-100');
    if (symbolsDropdownArrow) symbolsDropdownArrow.classList.add('rotate-180');
  }

  function closeSymbolsDropdown() {
    if (!symbolsDropdownMenu) return;
    symbolsDropdownMenu.classList.remove('scale-y-100', 'opacity-100');
    symbolsDropdownMenu.classList.add('scale-y-0', 'opacity-0', 'pointer-events-none');
    if (symbolsDropdownArrow) symbolsDropdownArrow.classList.remove('rotate-180');
  }

  if (symbolsDropdownTrigger) {
    symbolsDropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSymbolsDropdown();
    });
  }

  // Close symbols dropdown on outside click
  document.addEventListener('click', () => {
    if (symbolsDropdownMenu && !symbolsDropdownMenu.classList.contains('pointer-events-none')) {
      closeSymbolsDropdown();
    }
  });

  // Call initialization for symbols dropdown options
  renderSymbolsDropdown();

  // Initial State Render
  updateWorkspaceState();
  renderAllPresets();

  // Check URL Hash for initial navigation
  const hash = window.location.hash;
  if (hash === '#fancy') {
    navigateTo('fancy');
  } else if (hash === '#symbols') {
    navigateTo('symbols');
  } else if (hash === '#namegen') {
    navigateTo('namegen');
  } else if (hash === '#bio') {
    navigateTo('bio');
  } else if (hash === '#author') {
    navigateTo('author');
  } else {
    navigateTo('home');
  }
});
