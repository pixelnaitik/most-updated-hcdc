/**
 * Mobile Browser Back Button Handler
 * 
 * This module provides controlled handling of the mobile browser back button.
 * It intercepts back navigation and redirects it to meaningful in-app actions
 * such as closing modals, collapsing menus, or scrolling to the top.
 * 
 * @author Health Care Diagnostic Center
 * @version 1.0.0
 */

(function () {
    'use strict';

    /**
     * BackHandler - A modular, reusable back button controller
     */
    const BackHandler = {
        /**
         * Track if we've initialized the history state
         */
        initialized: false,

        /**
         * Stack to track UI states (modals, menus, etc.)
         */
        stateStack: [],

        /**
         * Initialize the back button handler
         */
        init: function () {
            if (this.initialized) return;

            // Push initial state to history
            this.pushState();

            // Listen for popstate (back button)
            window.addEventListener('popstate', this.handleBackButton.bind(this));

            // Re-push state after handling to maintain the trap
            this.initialized = true;

            console.log('[BackHandler] Initialized successfully');
        },

        /**
         * Push a state to browser history
         * @param {Object} data - Optional state data
         */
        pushState: function (data = null) {
            const stateData = data || { backHandler: true, timestamp: Date.now() };
            history.pushState(stateData, '', location.href);
        },

        /**
         * Register a UI element to the state stack
         * @param {string} id - Unique identifier for the UI element
         * @param {Function} closeHandler - Function to close/hide the element
         */
        registerState: function (id, closeHandler) {
            // Remove existing entry if present
            this.stateStack = this.stateStack.filter(s => s.id !== id);

            // Add new entry
            this.stateStack.push({ id, closeHandler });

            // Push new history state
            this.pushState({ uiState: id });
        },

        /**
         * Unregister a UI element from the state stack
         * @param {string} id - Unique identifier for the UI element
         */
        unregisterState: function (id) {
            this.stateStack = this.stateStack.filter(s => s.id !== id);
        },

        /**
         * Handle the browser back button press
         * @param {PopStateEvent} event - The popstate event
         */
        handleBackButton: function (event) {
            // Check for open modals first
            if (this.closeActiveModal()) {
                this.pushState();
                return;
            }

            // Check for open mobile menu
            if (this.closeMobileMenu()) {
                this.pushState();
                return;
            }

            // Check state stack for registered UI elements
            if (this.stateStack.length > 0) {
                const lastState = this.stateStack.pop();
                if (lastState && typeof lastState.closeHandler === 'function') {
                    lastState.closeHandler();
                    this.pushState();
                    return;
                }
            }

            // Default: scroll to main content or top
            this.scrollToTop();
            this.pushState();
        },

        /**
         * Close any active modal dialogs
         * @returns {boolean} True if a modal was closed
         */
        closeActiveModal: function () {
            // Check for booking modal
            const bookingModal = document.getElementById('bookingModal');
            if (bookingModal && bookingModal.classList.contains('active')) {
                bookingModal.classList.remove('active');
                document.body.style.overflow = '';
                console.log('[BackHandler] Closed booking modal');
                return true;
            }

            // Check for test detail modal
            const testModal = document.getElementById('testDetailModal');
            if (testModal && testModal.classList.contains('active')) {
                testModal.classList.remove('active');
                document.body.style.overflow = '';
                console.log('[BackHandler] Closed test detail modal');
                return true;
            }

            // Check for package detail modal
            const packageModal = document.getElementById('packageDetailModal');
            if (packageModal && packageModal.classList.contains('active')) {
                packageModal.classList.remove('active');
                document.body.style.overflow = '';
                console.log('[BackHandler] Closed package detail modal');
                return true;
            }

            // Check for generic detail-modal class
            const genericModals = document.querySelectorAll('.detail-modal.active');
            if (genericModals.length > 0) {
                genericModals.forEach(modal => modal.classList.remove('active'));
                document.body.style.overflow = '';
                console.log('[BackHandler] Closed detail modal(s)');
                return true;
            }

            // Check for modal-overlay class
            const modalOverlay = document.querySelector('.modal-overlay.active');
            if (modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
                console.log('[BackHandler] Closed modal overlay');
                return true;
            }

            return false;
        },

        /**
         * Close the mobile navigation menu if open
         * @returns {boolean} True if menu was closed
         */
        closeMobileMenu: function () {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navMenu = document.getElementById('navMenu');

            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                document.body.style.overflow = '';
                console.log('[BackHandler] Closed mobile menu');
                return true;
            }

            return false;
        },

        /**
         * Scroll to main content or page top
         */
        scrollToTop: function () {
            const mainContent = document.getElementById('main-content');
            const heroSection = document.getElementById('home');

            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log('[BackHandler] Scrolled to hero section');
            } else if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log('[BackHandler] Scrolled to main content');
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                console.log('[BackHandler] Scrolled to top');
            }
        },

        /**
         * Check if any UI overlay is currently open
         * @returns {boolean} True if any overlay is open
         */
        hasActiveOverlay: function () {
            // Check modals
            const activeModals = document.querySelectorAll(
                '.detail-modal.active, .modal-overlay.active, #bookingModal.active'
            );
            if (activeModals.length > 0) return true;

            // Check mobile menu
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) return true;

            // Check state stack
            if (this.stateStack.length > 0) return true;

            return false;
        }
    };

    /**
     * Initialize on DOM ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            BackHandler.init();
        });
    } else {
        // DOM is already ready
        BackHandler.init();
    }

    /**
     * Also initialize on page show (for bfcache scenarios)
     */
    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            // Page was restored from bfcache
            BackHandler.pushState();
            console.log('[BackHandler] Restored from bfcache');
        }
    });

    /**
     * Expose BackHandler globally for external use
     */
    window.BackHandler = BackHandler;

})();
