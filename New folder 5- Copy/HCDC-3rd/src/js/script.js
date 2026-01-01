// ===== Health Care Diagnostic Center - JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initBookTestModal();
  initScrollToTop();
  initTestOptions();
  initLabOptions();
  initContactForm();
  initPartnerCarousel();
});

// ===== Partner Carousel Touch Support =====
function initPartnerCarousel() {
  const wrapper = document.querySelector('.partner-carousel-wrapper');
  const carousel = document.querySelector('.partner-carousel');

  if (!wrapper || !carousel) return;

  // Disable CSS animation
  carousel.style.animation = 'none';

  // Constants based on CSS layout
  // Card width (320px) + Gap (30px) = 350px per item
  const ITEM_WIDTH = 350;
  // 5 duplicate items at the end for seamless looping = 1750px
  const RESET_THRESHOLD = 1750;
  const AUTO_SPEED = 0.8; // Pixels per frame (~50px/sec at 60fps)
  const PAUSE_DURATION = 3000; // ms

  // State
  let currentX = 0;
  let isDragging = false;
  let isPaused = false;
  let startX = 0;
  let dragStartX = 0;
  let restartTimeout = null;

  // Main Animation Loop
  function animate() {
    if (!isDragging && !isPaused) {
      currentX -= AUTO_SPEED;
      checkBounds();
      updateTransform();
    }
    requestAnimationFrame(animate);
  }

  // Helper to handle wrapping for infinite scroll
  function checkBounds() {
    // If we've scrolled past the reset point (moving left)
    if (currentX <= -RESET_THRESHOLD) {
      currentX += RESET_THRESHOLD;
    }
    // If we've dragged past the start (moving right)
    else if (currentX > 0) {
      currentX -= RESET_THRESHOLD;
    }
  }

  function updateTransform() {
    carousel.style.transform = `translate3d(${currentX}px, 0, 0)`;
  }

  function startDrag(clientX) {
    isDragging = true;
    isPaused = true; // Ensure auto-scroll stops
    startX = clientX;
    dragStartX = currentX;

    // Clear any pending restart timer
    if (restartTimeout) {
      clearTimeout(restartTimeout);
      restartTimeout = null;
    }

    // Change cursor
    wrapper.style.cursor = 'grabbing';
    // Remove transition if any (not used in this logic, but good practice)
    carousel.style.transition = 'none';
  }

  function moveDrag(clientX) {
    if (!isDragging) return;

    const delta = clientX - startX;
    currentX = dragStartX + delta;

    checkBounds();
    updateTransform();
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    wrapper.style.cursor = 'grab';

    // Restart auto-scroll after delay
    restartTimeout = setTimeout(() => {
      isPaused = false;
    }, PAUSE_DURATION);
  }

  // Touch Events
  wrapper.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX), { passive: true });
  wrapper.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX), { passive: true });
  wrapper.addEventListener('touchend', endDrag);

  // Mouse Events
  wrapper.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Prevent text selection
    startDrag(e.clientX);
  });
  window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
  window.addEventListener('mouseup', endDrag);

  // Pause on hover (Desktop)
  wrapper.addEventListener('mouseenter', () => {
    if (!isDragging) {
      isPaused = true;
      if (restartTimeout) clearTimeout(restartTimeout);
    }
  });

  wrapper.addEventListener('mouseleave', () => {
    if (!isDragging) {
      restartTimeout = setTimeout(() => {
        isPaused = false;
      }, PAUSE_DURATION);
    }
  });

  // Start the loop
  requestAnimationFrame(animate);
}


// ===== Navbar Scroll Effect =====
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));
}

// ===== Book Test Modal =====
function initBookTestModal() {
  const modal = document.getElementById('bookTestModal');
  const bookTestBtn = document.getElementById('bookTestBtn');
  const heroBookTest = document.getElementById('heroBookTest');
  const modalClose = document.getElementById('modalClose');
  const prevBtn = document.getElementById('prevStep');
  const nextBtn = document.getElementById('nextStep');
  const confirmWhatsApp = document.getElementById('confirmWhatsApp');
  const confirmCall = document.getElementById('confirmCall');

  let currentStep = 1;
  const totalSteps = 2;

  // Open modal
  const triggerButtons = document.querySelectorAll('.trigger-booking-modal');
  [bookTestBtn, heroBookTest, ...triggerButtons].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      closeModal();
    });
  }

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Reset to step 1
    currentStep = 1;
    updateSteps();
  }

  // Navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateSteps();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        currentStep++;
        updateSteps();
        if (currentStep === 2) {
          updateBookingSummary();
        }
      }
    });
  }

  function updateSteps() {
    // Update step indicators
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index < currentStep);
    });

    // Update step content
    document.querySelectorAll('.step-content').forEach((content, index) => {
      content.classList.toggle('active', index + 1 === currentStep);
    });

    // Update buttons visibility
    prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
    nextBtn.style.display = currentStep < totalSteps ? 'block' : 'none';
    confirmWhatsApp.style.display = currentStep === totalSteps ? 'flex' : 'none';
    confirmCall.style.display = currentStep === totalSteps ? 'flex' : 'none';
  }

  // WhatsApp confirmation
  if (confirmWhatsApp) {
    confirmWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      const message = generateWhatsAppMessage();
      const phone = '9162216654'; // Updated contact number
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
  }
}

// ===== Test Options Selection =====
// ===== Test Options Selection =====
function initTestOptions() {
  // Use change event on inputs to handle state correctly
  // This avoids double-toggling issues when clicking labels
  document.querySelectorAll('.test-option input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const option = checkbox.closest('.test-option');
      if (checkbox.checked) {
        option.classList.add('selected');
      } else {
        option.classList.remove('selected');
      }
    });
  });
}

// ===== Lab Options Selection =====
function initLabOptions() {
  document.querySelectorAll('.lab-option').forEach(option => {
    option.addEventListener('click', () => {
      // Remove selection from all
      document.querySelectorAll('.lab-option').forEach(opt => {
        opt.classList.remove('selected');
        opt.querySelector('input[type="radio"]').checked = false;
      });
      // Select clicked option
      option.classList.add('selected');
      option.querySelector('input[type="radio"]').checked = true;
    });
  });
}

// ===== Update Booking Summary =====
function updateBookingSummary() {
  const summary = document.getElementById('bookingSummary');
  if (!summary) return;

  const selectedTests = [];
  document.querySelectorAll('.test-option.selected').forEach(option => {
    const testName = option.querySelector('span:first-of-type').textContent;
    selectedTests.push(testName);
  });

  // Get custom tests
  const customTestsInput = document.getElementById('customTests');
  const customTests = customTestsInput?.value?.trim() || '';
  if (customTests) {
    selectedTests.push(customTests);
  }

  summary.innerHTML = `
    <h4 style="margin-bottom: 12px; color: var(--slate-800);">Booking Summary</h4>
    <p style="margin-bottom: 8px;"><strong>Tests:</strong> ${selectedTests.length > 0 ? selectedTests.join(', ') : 'None selected'}</p>
  `;
}

// ===== Generate WhatsApp Message =====
function generateWhatsAppMessage() {
  const name = document.getElementById('patientName')?.value || 'Not provided';
  const phone = document.getElementById('patientPhone')?.value || 'Not provided';

  const selectedTests = [];
  document.querySelectorAll('.test-option.selected').forEach(option => {
    const testName = option.querySelector('span:first-of-type').textContent;
    selectedTests.push(testName);
  });

  // Get custom tests
  const customTestsInput = document.getElementById('customTests');
  const customTests = customTestsInput?.value?.trim() || '';
  if (customTests) {
    selectedTests.push(customTests);
  }

  const queries = document.getElementById('patientQueries')?.value?.trim() || '';

  return `Hello! I would like to book a test at Health Care Diagnostic Center.

*Patient Name:* ${name}
*Phone:* ${phone}
*Tests:* ${selectedTests.join(', ') || 'None selected'}
${queries ? `*Queries:* ${queries}` : ''}

Please confirm my booking. Thank you!`;
}

// ===== Scroll to Top Button =====
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ===== Contact Form Validation =====
function initContactForm() {
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const message = document.getElementById('message');

      let isValid = true;

      if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
      } else {
        clearError(name);
      }

      if (!email.value.trim() || !isValidEmail(email.value)) {
        showError(email, 'Valid email is required');
        isValid = false;
      } else {
        clearError(email);
      }

      if (!phone.value.trim() || !isValidPhone(phone.value)) {
        showError(phone, 'Valid phone number is required');
        isValid = false;
      } else {
        clearError(phone);
      }

      if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
      } else {
        clearError(message);
      }

      if (isValid) {
        // Show success message
        showSuccessMessage();
        form.reset();
      }
    });
  }
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
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
  formGroup.classList.remove('error');

  const errorEl = formGroup.querySelector('.error-message');
  if (errorEl) {
    errorEl.remove();
  }
  input.style.borderColor = '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
}

function showSuccessMessage() {
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
    Thank you! We'll contact you shortly.
  `;

  const form = document.getElementById('contactForm');
  form.parentNode.insertBefore(successDiv, form);

  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// ===== Smooth Parallax Effect =====
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(el => {
      const speed = el.dataset.parallax || 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Contact form is initialized via the main DOMContentLoaded handler above
