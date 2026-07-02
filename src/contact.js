// FF Studio - Contact Form Handler & Client System Analytics Module
// Designed with clean form state validation, anti-spam honeypot, and dual-channel (Telegram & Email) dispatch.

document.addEventListener("DOMContentLoaded", () => {
  // --- A. SELECTING DOM NODES ---
  const contactForm = document.getElementById('contact-form');
  const btnSubmit = document.getElementById('btn-submit');
  const btnSendEmail = document.getElementById('btn-send-email');
  const formStatus = document.getElementById('form-status');
  
  // Input fields
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const honeyInput = document.getElementById('honey_field');

  // Input error feedback nodes
  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorSubject = document.getElementById('error-subject');
  const errorMessage = document.getElementById('error-message');

  // Drawer nodes
  const sidebar = document.getElementById('nav-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const btnToggleSidebar = document.getElementById('btn-menu-toggle');
  const btnCloseSidebar = document.getElementById('btn-close-sidebar');
  const pageWrapper = document.getElementById('page-wrapper');

  // --- B. NAVIGATION DRAWER SIDEBAR ---
  function openDrawer() {
    if (sidebarOverlay) {
      sidebarOverlay.classList.remove('pointer-events-none', 'opacity-0');
      sidebarOverlay.classList.add('opacity-100');
    }
    if (sidebar) {
      sidebar.classList.remove('translate-x-full');
    }
    if (pageWrapper) {
      pageWrapper.classList.add('blur-[4px]');
    }
  }

  // Close Navigation Drawer Sidebar
  function closeDrawer() {
    if (sidebarOverlay) {
      sidebarOverlay.classList.remove('opacity-100');
      sidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
    }
    if (sidebar) {
      sidebar.classList.add('translate-x-full');
    }
    if (pageWrapper) {
      pageWrapper.classList.remove('blur-[4px]');
    }
  }

  if (btnToggleSidebar) btnToggleSidebar.addEventListener('click', openDrawer);
  if (btnCloseSidebar) btnCloseSidebar.addEventListener('click', closeDrawer);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeDrawer);

  // --- C. FLOATING TOAST STACK ---
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
    
    // Trigger slide-in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
    });
    
    // Auto-remove
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-[-8px]');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3200);
  }

  // --- D. VALIDATION AND FORM STATE UTILS ---
  function clearErrors() {
    [errorName, errorEmail, errorSubject, errorMessage].forEach(el => {
      if (el) el.classList.add('hidden');
    });
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (input) {
        input.classList.remove('border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-500');
        input.classList.add('border-zinc-200');
      }
    });
  }

  function showFieldValidationError(inputNode, errorNode, text) {
    if (inputNode) {
      inputNode.classList.remove('border-zinc-200');
      inputNode.classList.add('border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-500');
    }
    if (errorNode) {
      errorNode.innerText = text;
      errorNode.classList.remove('hidden');
    }
  }

  function showFormStatus(message, type = 'success') {
    if (!formStatus) return;
    formStatus.innerText = message;
    formStatus.className = `p-4 rounded-xl border text-xs font-semibold leading-relaxed transition-all duration-300 block ${
      type === 'success' 
        ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800' 
        : 'bg-rose-50/50 border-rose-100 text-rose-800'
    }`;
  }

  function hideFormStatus() {
    if (formStatus) {
      formStatus.classList.add('hidden');
    }
  }

  // --- E. CLIENT-SIDE FORM VALIDATION ENGINE ---
  function validateAndGetFormData() {
    clearErrors();
    hideFormStatus();

    // Read values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();
    const honeypot = honeyInput ? honeyInput.value : '';

    // 1. Validate honeypot spam protection
    if (honeypot) {
      console.warn("Spam prevention triggered.");
      showToast("Message filtered as spam", "error");
      showFormStatus("Your message was processed as spam and filtered.", "error");
      return null;
    }

    // 2. Client Side Validations
    let isValid = true;

    if (!name) {
      showFieldValidationError(nameInput, errorName, "Your name is required.");
      isValid = false;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFieldValidationError(emailInput, errorEmail, "Please provide a valid email address.");
        isValid = false;
      }
    }

    if (!subject) {
      showFieldValidationError(subjectInput, errorSubject, "Subject is required.");
      isValid = false;
    }

    if (!message || message.length < 10) {
      showFieldValidationError(messageInput, errorMessage, "Your message must be at least 10 characters.");
      isValid = false;
    }

    if (!isValid) {
      showToast("Please check form inputs", "error");
      return null;
    }

    return { name, email, subject, message };
  }

  // --- F. ACTION ROUTING HANDLERS ---
  
  // Pathway A: Telegram Redirect
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = validateAndGetFormData();
      if (!formData) return;

      // Compile beautiful message template for Telegram
      const textMessage = `✉️ NEW MESSAGE FOR FF STUDIO\n\n👤 Sender: ${formData.name}\n📧 Email: ${formData.email ? formData.email : 'Not specified'}\n📝 Subject: ${formData.subject}\n\n💬 Message:\n${formData.message}\n\n---`;
      const encodedText = encodeURIComponent(textMessage);
      const telegramUrl = `https://t.me/jidu2529?text=${encodedText}`;

      // Open in a new tab securely
      window.open(telegramUrl, '_blank');

      showToast("Telegram application launched!");
      showFormStatus("Your message was formatted! Please press 'Send' in your Telegram application to deliver it to @jidu2529.", "success");
      contactForm.reset();
    });
  }

  // Pathway B: Email Mailto Client launch
  if (btnSendEmail) {
    btnSendEmail.addEventListener('click', (e) => {
      e.preventDefault();

      const formData = validateAndGetFormData();
      if (!formData) return;

      // Compile message body for email client
      const emailBody = `Sender: ${formData.name}\nEmail: ${formData.email ? formData.email : 'Not specified'}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
      const mailtoUrl = `mailto:iamjihad.com@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;

      // Launch email client
      window.location.href = mailtoUrl;

      showToast("Email client launched!");
      showFormStatus("Your default mail client has been opened with a pre-filled draft to iamjihad.com@gmail.com. Please review and hit send.", "success");
      contactForm.reset();
    });
  }
});
