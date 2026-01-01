
// Detect base path for assets
function getAssetPath(relativePath) {
    // Remove /HCDC/ prefix if present (legacy support)
    const cleanPath = relativePath.replace(/^\/?HCDC\//, '');

    // If we're in a subdirectory, go up one level
    const isSubdirectory = window.location.pathname.includes('/services/') ||
        window.location.pathname.includes('/about/') ||
        window.location.pathname.includes('/contact/') ||
        window.location.pathname.includes('/technology/') ||
        window.location.pathname.includes('/partners/');

    if (isSubdirectory) {
        return '../' + cleanPath;
    } else {
        return cleanPath;
    }
}

// State
let currentView = 'single'; // 'single' or 'packages'

document.addEventListener('DOMContentLoaded', () => {
    // Check if a specific view was requested (from homepage service card clicks)
    const requestedView = localStorage.getItem('serviceView');
    if (requestedView === 'packages') {
        currentView = 'packages';
        localStorage.removeItem('serviceView'); // Clear after using
    } else if (requestedView === 'single') {
        currentView = 'single';
        localStorage.removeItem('serviceView'); // Clear after using
    }

    renderCatalog();
    setupModals();

    // Update toggle buttons to reflect current view
    document.querySelectorAll('.view-toggle-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(currentView === 'single' ? 'btnSingle' : 'btnPackages');
    if (activeBtn) activeBtn.classList.add('active');
});

// Function to refresh catalog when language changes
// This is called from translate.js when user toggles language
window.refreshCatalogLanguage = function () {
    const container = document.getElementById('catalogGrid');
    if (container) {
        renderCatalog();
    }
};

function switchView(view) {
    currentView = view;

    // Update buttons
    document.querySelectorAll('.view-toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(view === 'single' ? 'btnSingle' : 'btnPackages').classList.add('active');

    renderCatalog();
}

function renderCatalog() {
    const container = document.getElementById('catalogGrid');
    container.innerHTML = '';

    if (currentView === 'single') {
        container.className = 'catalog-sections'; // Vertical stacking for categories
        renderSingleTests(container);
    } else {
        container.className = 'catalog-grid'; // Grid for packages
        renderPackages(container);
    }
}

function renderSingleTests(container) {
    const lang = window.currentLang || 'en';
    const t = (key, fallback) => (window.translations && window.translations[lang] && window.translations[lang][key]) ? window.translations[lang][key] : fallback;

    container.innerHTML = catalogData.singleTests.map(category => `
        <div class="category-section" id="cat-${category.id}">
            <h3 class="category-heading" data-translate="${category.name_key}">
                ${t(category.name_key, category.name)}
            </h3>
            <div class="tests-grid">
                ${category.tests.map(test => `
                    <div class="test-card-flat" onclick="openTestModal('${category.id}', '${test.id}')" style="cursor: pointer;">
                        <div class="test-card-top">
                            <h4 class="test-name">${test.name}</h4>
                            <span class="test-arrow">
                                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                    <path d="M12 8l4 4-4 4M8 12h8" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </div>
                        ${test.aliases ? `
                            <p class="test-aliases">
                                <span class="alias-label" data-translate="label_also_known">${t('label_also_known', 'Also known as:')}</span> ${test.aliases}
                            </p>
                        ` : ''}
                        <div class="test-card-actions">
                            <button class="test-view-btn" data-translate="btn_view_details">${t('btn_view_details', 'View Details')}</button>
                            <button class="test-book-btn" data-translate="btn_book" onclick="event.stopPropagation(); openBookingModal('${test.name}')">${t('btn_book', 'Book')}</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}


function renderPackages(container) {
    const lang = window.currentLang || 'en';
    const t = (key, fallback) => (window.translations && window.translations[lang] && window.translations[lang][key]) ? window.translations[lang][key] : fallback;
    const isHindi = lang === 'hi';

    // Combine standard catalogData.packages with aarogyamPackages if available
    const allPackages = [
        ...(typeof aarogyamPackages !== 'undefined' ? aarogyamPackages : []),
        ...catalogData.packages.filter(p => !p.id.startsWith('aarogyam_1_'))
    ];

    container.innerHTML = allPackages.map(pkg => {
        // Use Hindi description and highlights if available and language is Hindi
        const desc = (isHindi && pkg.desc_hi) ? pkg.desc_hi : pkg.desc;
        const highlights = (isHindi && pkg.highlights_hi) ? pkg.highlights_hi : pkg.highlights;

        return `
        <div class="package-card" onclick="openPackageModal('${pkg.id}')">
            <div class="package-test-badge">${pkg.testCount || (pkg.includes ? pkg.includes.length : 0)}+ <span data-translate="label_tests">${t('label_tests', 'Tests')}</span></div>
            <div class="package-image-container">
                <img src="${getAssetPath(pkg.image)}" alt="${pkg.name}" loading="lazy">
            </div>
            <div class="package-content-body">
                <h3 class="package-title">${pkg.name}</h3>
                <p class="package-desc">${desc}</p>
                ${highlights ? `
                    <ul class="package-highlights-preview">
                        ${highlights.slice(0, 2).map(h => `<li>${h}</li>`).join('')}
                    </ul>
                ` : ''}
                <div class="package-meta">
                    <span class="view-details-link" data-translate="label_view_all_tests">${t('label_view_all_tests', 'View All Tests')} →</span>
                    <button class="package-book-btn" data-translate="btn_book" onclick="event.stopPropagation(); openBookingModal('${pkg.name}')">${t('btn_book', 'Book')}</button>
                </div>
            </div>
        </div>
    `}).join('');
}



function toggleCategory(catId) {
    const card = document.getElementById(`cat-${catId}`);
    const isExpanded = card.classList.contains('active');

    // Close all others
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));

    if (!isExpanded) {
        card.classList.add('active');
    }
}

// === Modals ===

function setupModals() {
    // All modal closing logic (close buttons, outside click, escape key) is handled by global event listeners below.
    // This function can be used for other modal setup if needed, but not for closing events.
}

// Global Event Delegation for Modals (More Robust)
document.addEventListener('click', (e) => {
    // Close Buttons
    if (e.target.matches('.modal-close') || e.target.closest('.modal-close')) {
        document.querySelectorAll('.detail-modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    // Outside Click
    if (e.target.matches('.detail-modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.detail-modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

function openTestModal(catId, testId) {
    const category = catalogData.singleTests.find(c => c.id === catId);
    const test = category.tests.find(t => t.id === testId);

    if (!test) return;

    // Populate Modal with new detailed format
    document.getElementById('modalTitle').textContent = test.name;
    document.getElementById('modalDesc').textContent = test.desc;
    document.getElementById('modalImp').textContent = test.importance;
    document.getElementById('modalCond').textContent = test.conditions;
    document.getElementById('modalSymp').textContent = test.symptoms;
    document.getElementById('modalFast').textContent = test.preparation;

    // Show normal range if available
    const rangeEl = document.getElementById('modalRange');
    if (rangeEl && test.normalRange) {
        rangeEl.textContent = test.normalRange;
        rangeEl.parentElement.style.display = 'block';
    } else if (rangeEl) {
        rangeEl.parentElement.style.display = 'none';
    }

    const modal = document.getElementById('testDetailModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openPackageModal(pkgId) {
    // Check both aarogyamPackages and catalogData.packages
    let pkg = null;
    if (typeof aarogyamPackages !== 'undefined') {
        pkg = aarogyamPackages.find(p => p.id === pkgId);
    }
    if (!pkg) {
        pkg = catalogData.packages.find(p => p.id === pkgId);
    }

    if (!pkg) return;

    // Translation helper
    const lang = window.currentLang || 'en';
    const t = (key, fallback) => (window.translations && window.translations[lang] && window.translations[lang][key]) ? window.translations[lang][key] : fallback;
    const isHindi = lang === 'hi';

    // Use Hindi content if available
    const desc = (isHindi && pkg.desc_hi) ? pkg.desc_hi : pkg.desc;
    const highlights = (isHindi && pkg.highlights_hi) ? pkg.highlights_hi : pkg.highlights;

    // Populate Package Modal
    document.getElementById('pkgModalTitle').textContent = pkg.name;

    // Show test count
    const testCountEl = document.getElementById('pkgTestCount');
    if (testCountEl) {
        testCountEl.textContent = `${pkg.testCount || (pkg.includes ? pkg.includes.length : 0)}+ ${t('label_tests', 'Tests')}`;
    }

    document.getElementById('pkgModalDesc').textContent = desc;

    // Populate highlights if container exists
    const highlightsContainer = document.getElementById('pkgHighlights');
    if (highlightsContainer && highlights) {
        highlightsContainer.innerHTML = highlights.map(h => `
            <li><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>${h}</li>
        `).join('');
        highlightsContainer.parentElement.style.display = 'block';
    } else if (highlightsContainer) {
        highlightsContainer.parentElement.style.display = 'none';
    }

    const listContainer = document.getElementById('pkgList');

    // Check if package has categories (new format) or includes (old format)
    if (pkg.categories && pkg.categories.length > 0) {
        // Render new card-based category layout
        listContainer.className = 'category-cards-grid';
        listContainer.innerHTML = pkg.categories.map((cat, index) => {
            const categoryName = getTranslatedCategoryName(cat, lang);
            const testCount = getCategoryTestCount(cat);
            const categoryIcon = getCategoryIcon(cat.profile || 'default');
            const isExpanded = index < 2; // Auto-expand first 2 categories
            const clickText = isExpanded ? t('label_click_to_collapse', 'Click to collapse') : t('label_click_to_view', 'Click to view tests');

            return `
                <div class="category-card ${isExpanded ? 'expanded' : ''}" onclick="toggleCategoryCard(this, event)">
                    <div class="category-card-header">
                        <div class="category-icon">
                            ${categoryIcon}
                        </div>
                        <div class="category-info">
                            <h5 class="category-name">${categoryName}</h5>
                            <p class="category-subtitle">${clickText}</p>
                        </div>
                        <span class="category-badge">${testCount} ${t('label_tests', 'tests')}</span>
                        <div class="category-toggle">
                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </div>
                    </div>
                    <div class="test-cards-container">
                        <ul class="test-cards-grid">
                            ${cat.tests.map(test => `
                                <li class="test-card-item">
                                    <span class="test-checkmark">
                                        <svg fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </span>
                                    <span class="test-name-text">${test}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }).join('');
    } else if (pkg.includes) {
        // Fallback to old format (simple list)
        listContainer.className = 'pkg-list';
        listContainer.innerHTML = pkg.includes.map(item => `<li>${item}</li>`).join('');
    }

    const modal = document.getElementById('packageDetailModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Get translated category name based on profile key
function getTranslatedCategoryName(category, lang) {
    if (!lang) lang = window.currentLang || 'en';
    const t = (key, fallback) => (window.translations && window.translations[lang] && window.translations[lang][key]) ? window.translations[lang][key] : fallback;

    if (category.name) return category.name;

    if (category.profile && testProfiles && testProfiles[category.profile]) {
        // Map profile keys to translation keys
        const profileToTransKey = {
            lipidProfile: 'profile_lipid',
            liverFunction: 'profile_liver',
            kidneyFunction: 'profile_kidney',
            thyroidProfile: 'profile_thyroid',
            ironDeficiency: 'profile_iron',
            cardiacRisk: 'profile_cardiac',
            toxicElements: 'profile_toxic',
            completeHemogram: 'profile_hemogram',
            diabetesScreening: 'profile_diabetes',
            vitamins: 'profile_vitamins',
            advancedMetabolic: 'profile_metabolic',
            autoimmune: 'profile_autoimmune',
            anemiaPlus: 'profile_anemia',
            homocysteine: 'profile_homocysteine'
        };
        const transKey = profileToTransKey[category.profile];
        if (transKey) {
            return t(transKey, testProfiles[category.profile].name);
        }
        return testProfiles[category.profile].name;
    }
    return 'Other Tests';
}

// Toggle category card expand/collapse
function toggleCategoryCard(card, event) {
    // Don't toggle if clicking inside test cards
    if (event.target.closest('.test-cards-container')) return;

    card.classList.toggle('expanded');

    // Update subtitle text with translation
    const lang = window.currentLang || 'en';
    const t = (key, fallback) => (window.translations && window.translations[lang] && window.translations[lang][key]) ? window.translations[lang][key] : fallback;
    const subtitle = card.querySelector('.category-subtitle');
    if (subtitle) {
        subtitle.textContent = card.classList.contains('expanded')
            ? t('label_click_to_collapse', 'Click to collapse')
            : t('label_click_to_view', 'Click to view tests');
    }
}

// Get category-specific icon SVG - Medical-themed icons
function getCategoryIcon(profileKey) {
    const icons = {
        // Lipid Profile - Heart icon (cholesterol/heart health)
        lipidProfile: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,

        // LFT - Liver organ shape
        liverFunction: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4c-4 0-7 3-7 7s2 6 4 8c1 1 2 2 3 2s2-1 3-2c2-2 4-4 4-8s-3-7-7-7z"/><path stroke-linecap="round" d="M9 10c0-1 1-2 3-2s3 1 3 2"/></svg>`,

        // KFT - Kidney bean shape
        kidneyFunction: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3c3.5 0 6 2.5 6 6 0 2-1 3.5-2.5 4.5 1.5 1 2.5 2.5 2.5 4.5 0 3.5-2.5 6-6 6s-6-2.5-6-6c0-2 1-3.5 2.5-4.5C7 11.5 6 10 6 8c0-3.5 2.5-5 6-5z"/><path stroke-linecap="round" d="M10 8c0 1 1 2 2 2s2-1 2-2"/></svg>`,

        // Thyroid - Butterfly/thyroid gland
        thyroidProfile: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m0-8c-2-3-5-4-7-3s-2 4 1 6c2 1 4 0 6-3zm0 0c2-3 5-4 7-3s2 4-1 6c-2 1-4 0-6-3z"/></svg>`,

        // Iron - Red blood cells / hemoglobin
        ironDeficiency: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><circle cx="12" cy="14" r="3"/><circle cx="8" cy="18" r="2"/><circle cx="16" cy="18" r="2"/></svg>`,

        // Cardiac Risk - Heart with pulse/ECG
        cardiacRisk: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h2l1-2 2 4 1-2h2"/></svg>`,

        // Toxic Elements - Hazard warning
        toxicElements: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,

        // CBC/Hemogram - Blood cells
        completeHemogram: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="7" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="12" cy="12" r="3"/><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/></svg>`,

        // Diabetes - Blood glucose drop
        diabetesScreening: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2c0 0-6 7-6 11a6 6 0 1012 0c0-4-6-11-6-11z"/><path stroke-linecap="round" d="M9 14h6m-3-3v6"/></svg>`,

        // Vitamins - Sun/sunshine
        vitamins: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path stroke-linecap="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-6.364l-1.414 1.414M8.05 15.95l-1.414 1.414m10.728 0l-1.414-1.414M8.05 8.05L6.636 6.636"/></svg>`,

        // Metabolic - Metabolism cycle
        advancedMetabolic: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M20 20v-5h-5"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.49 9A9 9 0 005.64 5.64L4 4m15.56 15.56A9 9 0 014.51 15L4 20"/></svg>`,

        // Autoimmune - Shield with check
        autoimmune: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,

        // Anemia - Plus/cross symbol
        anemiaPlus: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 8v8m-4-4h8"/></svg>`,

        // Homocysteine - Lab flask
        homocysteine: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3h6m-5 0v5.172a2 2 0 00.586 1.414l1.828 1.828A6 6 0 0118 17a4 4 0 01-4 4H10a4 4 0 01-4-4 6 6 0 015.586-5.586l1.828-1.828A2 2 0 0014 8.172V3"/></svg>`,

        // Fever Panel - Thermometer
        feverPanel: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0a3 3 0 100 0m0 0V4m-3 12a3 3 0 106 0"/><circle cx="12" cy="16" r="2"/><path stroke-linecap="round" d="M12 8v4"/></svg>`,

        // Default - Clipboard with checkmark
        default: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`
    };
    return icons[profileKey] || icons.default;
}


// === Booking Modal ===

function openBookingModal(testName) {
    // Set the selected test name
    document.getElementById('bookingTestName').textContent = testName;
    document.getElementById('bookingName').value = '';
    document.getElementById('bookingPhone').value = '';
    document.getElementById('bookingQueries').value = '';

    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function confirmViaWhatsApp() {
    const name = document.getElementById('bookingName').value.trim();
    const phone = document.getElementById('bookingPhone').value.trim();
    const queries = document.getElementById('bookingQueries').value.trim();
    const testName = document.getElementById('bookingTestName').textContent;

    if (!name || !phone) {
        alert('Please enter your name and phone number');
        return;
    }

    // Create WhatsApp message
    const message = `Hello! I would like to book a test.\n\n*Test:* ${testName}\n*Name:* ${name}\n*Phone:* ${phone}${queries ? '\n*Query:* ' + queries : ''}`;

    // WhatsApp number (replace with actual number)
    const whatsappNumber = '919162216654';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    closeBookingModal();
}

function confirmViaCall() {
    const name = document.getElementById('bookingName').value.trim();
    const phone = document.getElementById('bookingPhone').value.trim();

    if (!name || !phone) {
        alert('Please enter your name and phone number');
        return;
    }

    // Phone number to call (replace with actual number)
    const callNumber = '+919162216654';
    window.location.href = `tel:${callNumber}`;
}

// Helper to bridge translation (simplified for dynamic content)
function translateKey(key) {
    if (window.translations && window.currentLang && window.translations[window.currentLang]) {
        return window.translations[window.currentLang][key] || key;
    }
    return key;
}

// Fallback formatter for clean English names if translation is missing/loading
function formatCategoryName(key) {
    if (!key) return '';
    // Remove cat_ or service_ prefix, replace underscores with spaces, capitalize words
    return key
        .replace(/^(cat_|service_)/, '')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}
