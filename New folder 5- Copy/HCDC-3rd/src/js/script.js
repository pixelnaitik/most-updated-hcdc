// ===== Health Care Diagnostic Center - JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initBookTestModal();
  initScrollToTop();
  initTestOptions();
  initLabOptions();
  initContactForm();
  initWhatsAppInquiryForm();
  initHomepageInteractions();
  initPartnerCarousel();
});

function initPartnerCarousel() {
  const wrapper = document.querySelector('.partner-carousel-wrapper');
  const carousel = document.querySelector('.partner-carousel');
  if (!wrapper || !carousel) return;

  carousel.style.animation = 'none';
  const RESET_THRESHOLD = 1750;
  const AUTO_SPEED = 0.8;
  const PAUSE_DURATION = 3000;

  let currentX = 0;
  let isDragging = false;
  let isPaused = false;
  let startX = 0;
  let dragStartX = 0;
  let restartTimeout = null;

  function animate() {
    if (!isDragging && !isPaused) {
      currentX -= AUTO_SPEED;
      checkBounds();
      updateTransform();
    }
    requestAnimationFrame(animate);
  }

  function checkBounds() {
    if (currentX <= -RESET_THRESHOLD) currentX += RESET_THRESHOLD;
    else if (currentX > 0) currentX -= RESET_THRESHOLD;
  }

  function updateTransform() {
    carousel.style.transform = `translate3d(${currentX}px, 0, 0)`;
  }

  function startDrag(clientX) {
    isDragging = true;
    isPaused = true;
    startX = clientX;
    dragStartX = currentX;
    if (restartTimeout) {
      clearTimeout(restartTimeout);
      restartTimeout = null;
    }
    wrapper.style.cursor = 'grabbing';
    carousel.style.transition = 'none';
  }

  function moveDrag(clientX) {
    if (!isDragging) return;
    currentX = dragStartX + (clientX - startX);
    checkBounds();
    updateTransform();
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    wrapper.style.cursor = 'grab';
    restartTimeout = setTimeout(() => {
      isPaused = false;
    }, PAUSE_DURATION);
  }

  wrapper.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX), { passive: true });
  wrapper.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX), { passive: true });
  wrapper.addEventListener('touchend', endDrag);
  wrapper.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startDrag(e.clientX);
  });
  window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
  window.addEventListener('mouseup', endDrag);

  wrapper.addEventListener('mouseenter', () => {
    if (isDragging) return;
    isPaused = true;
    if (restartTimeout) clearTimeout(restartTimeout);
  });

  wrapper.addEventListener('mouseleave', () => {
    if (isDragging) return;
    restartTimeout = setTimeout(() => {
      isPaused = false;
    }, PAUSE_DURATION);
  });

  requestAnimationFrame(animate);
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  if (!mobileMenuBtn || !navMenu) return;

  mobileMenuBtn.setAttribute('aria-controls', 'navMenu');
  mobileMenuBtn.setAttribute('aria-expanded', 'false');

  function closeMenu() {
    navMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  mobileMenuBtn.addEventListener('click', () => {
    const willOpen = !navMenu.classList.contains('active');
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', String(willOpen));
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length === 0 || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach((el) => observer.observe(el));
}

function initBookTestModal() {
  const modal = document.getElementById('bookTestModal');
  const bookTestBtn = document.getElementById('bookTestBtn');
  const heroBookTest = document.getElementById('heroBookTest');
  const modalClose = document.getElementById('modalClose');
  const prevBtn = document.getElementById('prevStep');
  const nextBtn = document.getElementById('nextStep');
  const confirmWhatsApp = document.getElementById('confirmWhatsApp');
  const confirmCall = document.getElementById('confirmCall');

  // Keep modal opening resilient even if some footer controls are removed from a page.
  if (!modal) return;

  let currentStep = 1;
  const totalSteps = 2;

  const triggerButtons = document.querySelectorAll('.trigger-booking-modal');
  [bookTestBtn, heroBookTest, ...triggerButtons].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      updateSteps();
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentStep = 1;
    updateSteps();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep -= 1;
        updateSteps();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep === 1) {
        currentStep = 2;
        updateSteps();
        updateBookingSummary();
        return;
      }

      if (validateBookingDetails()) {
        currentStep = totalSteps;
        updateSteps();
      }
    });
  }

  function updateSteps() {
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index < currentStep);
    });

    document.querySelectorAll('.step-content').forEach((content, index) => {
      content.classList.toggle('active', index + 1 === Math.min(currentStep, 2));
    });

    if (prevBtn) prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
    if (nextBtn) nextBtn.style.display = currentStep < totalSteps ? 'block' : 'none';
    if (confirmWhatsApp) confirmWhatsApp.style.display = currentStep === totalSteps ? 'flex' : 'none';
    if (confirmCall) confirmCall.style.display = currentStep === totalSteps ? 'flex' : 'none';
  }

  if (confirmWhatsApp) {
    confirmWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      if (!validateBookingDetails()) {
        currentStep = 2;
        updateSteps();
        return;
      }

      const message = generateWhatsAppMessage();
      window.open(`https://wa.me/9162216654?text=${encodeURIComponent(message)}`, '_blank');
    });
  }

  updateSteps();
}

function validateBookingDetails() {
  const nameInput = document.getElementById('patientName');
  const phoneInput = document.getElementById('patientPhone');
  if (!nameInput || !phoneInput) return true;

  const hasName = nameInput.value.trim().length >= 2;
  const hasPhone = /^[0-9]{10}$/.test(phoneInput.value.replace(/\D/g, ''));

  nameInput.classList.toggle('invalid', !hasName);
  phoneInput.classList.toggle('invalid', !hasPhone);

  if (!hasName) nameInput.setAttribute('aria-invalid', 'true');
  else nameInput.removeAttribute('aria-invalid');

  if (!hasPhone) phoneInput.setAttribute('aria-invalid', 'true');
  else phoneInput.removeAttribute('aria-invalid');

  return hasName && hasPhone;
}

function initTestOptions() {
  document.querySelectorAll('.test-option input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const option = checkbox.closest('.test-option');
      if (option) option.classList.toggle('selected', checkbox.checked);
    });
  });
}

function initLabOptions() {
  document.querySelectorAll('.lab-option').forEach((option) => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.lab-option').forEach((opt) => {
        opt.classList.remove('selected');
        const input = opt.querySelector('input[type="radio"]');
        if (input) input.checked = false;
      });

      option.classList.add('selected');
      const selectedInput = option.querySelector('input[type="radio"]');
      if (selectedInput) selectedInput.checked = true;
    });
  });
}

function updateBookingSummary() {
  const summary = document.getElementById('bookingSummary');
  if (!summary) return;

  const selectedTests = [];
  document.querySelectorAll('.test-option.selected').forEach((option) => {
    const testName = option.querySelector('span:first-of-type')?.textContent;
    if (testName) selectedTests.push(testName);
  });

  const customTests = document.getElementById('customTests')?.value?.trim();
  if (customTests) selectedTests.push(customTests);

  const preferredSlot = document.getElementById('preferredSlot')?.value || 'Not specified';

  summary.innerHTML = `
    <h4 class="booking-summary-title">Booking Summary</h4>
    <p><strong>Tests:</strong> ${selectedTests.length > 0 ? selectedTests.join(', ') : 'None selected'}</p>
    <p><strong>Preferred Slot:</strong> ${preferredSlot}</p>
  `;
}

function generateWhatsAppMessage() {
  const name = document.getElementById('patientName')?.value || 'Not provided';
  const phone = document.getElementById('patientPhone')?.value || 'Not provided';
  const preferredSlot = document.getElementById('preferredSlot')?.value || 'Not specified';

  const selectedTests = [];
  document.querySelectorAll('.test-option.selected').forEach((option) => {
    const testName = option.querySelector('span:first-of-type')?.textContent;
    if (testName) selectedTests.push(testName);
  });

  const customTests = document.getElementById('customTests')?.value?.trim();
  if (customTests) selectedTests.push(customTests);

  const queries = document.getElementById('patientQueries')?.value?.trim() || '';

  return `Hello! I would like to book a test at Health Care Diagnostic Center.

*Patient Name:* ${name}
*Phone:* ${phone}
*Tests:* ${selectedTests.join(', ') || 'None selected'}
*Preferred Slot:* ${preferredSlot}
${queries ? `*Queries:* ${queries}` : ''}

Please confirm my booking. Thank you!`;
}

function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form || form.tagName === 'DIV') return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');

    if (!name || !email || !phone || !message) return;

    let isValid = true;

    if (!name.value.trim()) {
      showError(name, 'Name is required');
      isValid = false;
    } else clearError(name);

    if (!email.value.trim() || !isValidEmail(email.value)) {
      showError(email, 'Valid email is required');
      isValid = false;
    } else clearError(email);

    if (!phone.value.trim() || !isValidPhone(phone.value)) {
      showError(phone, 'Valid phone number is required');
      isValid = false;
    } else clearError(phone);

    if (!message.value.trim()) {
      showError(message, 'Message is required');
      isValid = false;
    } else clearError(message);

    if (isValid) {
      showSuccessMessage('Thank you! Your message has been prepared.');
      form.reset();
    }
  });
}

function initWhatsAppInquiryForm() {
  const form = document.getElementById('whatsappForm');
  const successAlert = document.getElementById('successAlert');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    if (!name || !subject || !message) return;

    let isValid = true;
    [name, subject, message].forEach((field) => {
      const valid = field.value.trim().length > 0;
      field.closest('.form-group')?.classList.toggle('error', !valid);
      if (!valid) isValid = false;
    });

    if (!isValid) return;

    const payload = {
      name: name.value.trim(),
      subject: subject.value.trim(),
      message: message.value.trim(),
      _subject: `Website Inquiry: ${subject.value.trim()}`
    };

    let submitted = false;
    try {
      const response = await fetch('https://formsubmit.co/ajax/arunkumaratul@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });
      submitted = response.ok;
    } catch (error) {
      submitted = false;
    }

    const whatsappMessage = `*New Inquiry from Website*\n\n*Name:* ${payload.name}\n*Subject:* ${payload.subject}\n\n*Message:*\n${payload.message}`;
    const whatsappUrl = `https://wa.me/9162216654?text=${encodeURIComponent(whatsappMessage)}`;

    if (successAlert) {
      successAlert.classList.add('show');
      successAlert.querySelector('span').textContent = submitted
        ? 'Message sent successfully. Opening WhatsApp for instant confirmation...'
        : 'Opening WhatsApp for quick delivery...';
    }

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      form.reset();
      if (successAlert) successAlert.classList.remove('show');
    }, 900);
  });

  form.querySelectorAll('input, textarea, select').forEach((input) => {
    input.addEventListener('input', () => {
      input.closest('.form-group')?.classList.remove('error');
    });
  });
}

function initHomepageInteractions() {
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.removeAttribute('onclick');
    langBtn.addEventListener('click', () => {
      if (typeof window.toggleLanguage === 'function') {
        window.toggleLanguage();
      }
    });
  }

  document.querySelectorAll('[data-view]').forEach((card) => {
    card.removeAttribute('onclick');
    card.addEventListener('click', () => {
      const view = card.getAttribute('data-view');
      if (view) localStorage.setItem('serviceView', view);
    });
  });
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  if (!formGroup) return;

  formGroup.classList.add('error');
  let errorEl = formGroup.querySelector('.error-message');
  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.className = 'error-message';
    errorEl.style.cssText = 'color: var(--rose-500); font-size: 0.875rem; margin-top: 4px; display: block;';
    formGroup.appendChild(errorEl);
  }

  errorEl.textContent = message;
  input.style.borderColor = 'var(--rose-400)';
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  if (!formGroup) return;

  formGroup.classList.remove('error');
  const errorEl = formGroup.querySelector('.error-message');
  if (errorEl) errorEl.remove();
  input.style.borderColor = '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
}

function showSuccessMessage(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.style.cssText = `
    background: var(--safety-green-100);
    color: var(--safety-green-500);
    padding: 16px 24px;
    border-radius: 12px;
    margin-bottom: 20px;
    text-align: center;
    animation: fadeIn 0.3s ease;
  `;
  successDiv.innerHTML = `
    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 8px;"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    ${message}
  `;

  const form = document.querySelector('#contactForm form, #contactForm');
  if (!form || !form.parentNode) return;

  form.parentNode.insertBefore(successDiv, form);
  setTimeout(() => successDiv.remove(), 5000);
}

function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach((el) => {
      const speed = Number(el.dataset.parallax || 0.5);
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}
