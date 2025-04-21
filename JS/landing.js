document.addEventListener('DOMContentLoaded', function() {
    // Only run on landing page if data-page attribute matches
    if (document.body.getAttribute('data-page') === 'landing') {
        initializeLandingPage();
    }

    // Initialize dropdown functionality everywhere it exists
    initializeDropdown();
});

function initializeLandingPage() {
    // Configuration
    const MAX_INIT_ATTEMPTS = 10;
    const ATTEMPT_INTERVAL = 100;
    
    let attempts = 0;
    const requiredElements = [
        'profileIcon', 
        'registerButton', 
        'LogInButton',
        'postProject'
    ];

    function checkElements() {
        attempts++;
        const elements = {};
        let allFound = true;

        // Check for all required elements
        requiredElements.forEach(id => {
            elements[id] = document.getElementById(id);
            if (!elements[id]) allFound = false;
        });

        if (allFound) {
            // All elements found, proceed with initialization
            setupAuthLogic(elements);
            setupTimelineAnimation();
        } else if (attempts < MAX_INIT_ATTEMPTS) {
            // Try again after delay
            setTimeout(checkElements, ATTEMPT_INTERVAL);
        } else {
            console.error('Could not find all required elements after maximum attempts');
        }
    }

    function setupAuthLogic(elements) {
        const { profileIcon, registerButton, LogInButton, postProject } = elements;

        function updateUI() {
            const token = localStorage.getItem('authToken');
            const userData = token ? decodeJWT(token) : null;

            if (token && userData) {
                // User is logged in
                registerButton.style.display = 'none';
                LogInButton.style.display = 'none';
                profileIcon.style.display = 'inline-block';
                
                // Show post project only for specific roles
                postProject.style.display = userData.role !== 'ServiceProvider' ? 'inline-block' : 'none';
            } else {
                // User is not logged in
                registerButton.style.display = 'inline-block';
                LogInButton.style.display = 'inline-block';
                profileIcon.style.display = 'none';
                postProject.style.display = 'none';
            }
        }

        // Set up logout handler
        const logoutButton = document.getElementById('logout');

        function handleLogout(e) {
            e.preventDefault();
            e.stopImmediatePropagation(); // Prevent other click handlers from interfering
            
            // Clear authentication data
            localStorage.clear();
            
            // Show loading indicator
            document.body.classList.add('loading-active');
            
            // Redirect after a brief delay to ensure UI updates
            setTimeout(() => {
                window.location.href = 'landingPage.html';
            }, 100);
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', handleLogout);
        }

        // Initial UI update
        updateUI();
    }

    function setupTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    function decodeJWT(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) throw new Error('Invalid JWT format');

            const payload = parts[1];
            const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(decoded);
        } catch (error) {
            console.error('JWT decoding failed:', error);
            return null;
        }
    }

    function showLoadingIndicator() {
        document.body.classList.add('loading-active');
        // Add your loader element logic here if needed
    }

    // Start the initialization process
    checkElements();
}

function initializeDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown) return;

    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const profileIcon = dropdown.querySelector('#profileIcon');

    if (!dropdownContent || !profileIcon) {
        console.error('Dropdown elements not found');
        return;
    }

    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'landingPage.html';
        });
    }

    function toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevents window click handler from firing
        dropdownContent.classList.toggle('show');
    }

    function closeDropdown(e) {
        if (!dropdown.contains(e.target)) {
            dropdownContent.classList.remove('show');
        }
    }

    profileIcon.addEventListener('click', toggleDropdown);
    
    // This ensures clicks inside the dropdown don't close it
    dropdownContent.addEventListener('click', e => e.stopPropagation());

    // Clicking anywhere outside the dropdown closes it
    window.addEventListener('click', closeDropdown);
}
