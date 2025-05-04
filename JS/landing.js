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
        'postProject',
        'createProfile',
        'profileLink'
    ];

    function checkElements() {
        attempts++;
        const elements = {};
        let allFound = true;

        // Check for all required elements
        requiredElements.forEach(id => {
            elements[id] = document.getElementById(id);
            if (!elements[id] && id !== 'profileItem') { // Make profileItem optional
                console.warn(`Element with ID ${id} not found`);
                allFound = false;
            }
        });

        if (allFound || attempts >= MAX_INIT_ATTEMPTS) {
            // Proceed with initialization even if not all elements are found
            setupAuthLogic(elements);
            setupTimelineAnimation();
        } else {
            // Try again after delay
            setTimeout(checkElements, ATTEMPT_INTERVAL);
        }
    }

    function setupAuthLogic(elements) {
        const {
            profileIcon, 
            registerButton, 
            LogInButton, 
            postProject, 
            createProfile, 
            profileLink
        } = elements;

        function pathToProfile(role, ButtonClass){
            ButtonClass.addEventListener("click", (e)=>{
                if(role === 'client'){
                    window.location.href = 'clientProfile.html';
                }else{
                    window.location.href = 'freelancerProfile.html';
                }
            })
        }

        // Ensure elements exist before trying to modify them
        function safeDisplay(element, display) {
            if (element) element.style.display = display;
        }

        function updateUI() {
            const token = localStorage.getItem('authToken');
            const userData = token ? decodeJWT(token) : null;
            const status = localStorage.getItem('status');
            // let role = '';
            console.log(userData);
            console.log("Auth token:", token);
            console.log("Userdata:", userData);

            if (token && userData) {
                // User is logged in
                safeDisplay(registerButton, 'none');
                safeDisplay(LogInButton, 'none');
                safeDisplay(profileIcon, 'inline-block');
                
                // Show post project only for specific roles
                const shouldShowPostProject = userData.role && userData.role !== 'ServiceProvider';
                
                // Handle profile completion status
                if (status === true || status === 'true' || userData.profileCompleted == true) {
                    safeDisplay(createProfile, 'none');
                    safeDisplay(profileLink, 'flex');
                    safeDisplay(postProject, shouldShowPostProject ? 'flex' : 'none');
                    if(shouldShowPostProject){
                        pathToProfile('client', profileLink);
                    }else{
                        pathToProfile('freelancer', profileLink);
                    }
                } else {
                    safeDisplay(createProfile, 'flex');
                    safeDisplay(profileLink, 'none');
                    safeDisplay(postProject, 'none');
                }
            } else {
                // User is not logged in
                safeDisplay(registerButton, 'inline-block');
                safeDisplay(LogInButton, 'inline-block');
                safeDisplay(profileIcon, 'none');
                safeDisplay(postProject, 'none');
                safeDisplay(createProfile, 'none');
                safeDisplay(profileLink, 'none');
            }
        }

        // Add click handler for createProfile
        if (createProfile) {
            createProfile.addEventListener('click', function(e) {
                e.preventDefault();
                const token = localStorage.getItem('authToken');
                const userData = token ? decodeJWT(token) : null;
                // Show loading indicator
                document.body.classList.add('loading-active');
                
                // Redirect to profile creation page
                // You can change this path to whatever your profile creation page is
                setTimeout(() => {
                    if(userData.role === "client"){
                        window.location.href = 'createClientAccount.html';
                    }else{
                        window.location.href = 'createFreelancerAccount.html'; // Update this path
                    }
                }, 100);
            });
        }
        // Set up logout handler
        const logoutButton = document.getElementById('logout');
        if (logoutButton && !logoutButton.hasListener) {
            function handleLogout(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                // Clear authentication data
                localStorage.clear();
                
                // Show loading indicator
                document.body.classList.add('loading-active');
                
                // Redirect after a brief delay
                setTimeout(() => {
                    window.location.href = 'landingPage.html';
                }, 100);
            }
            
            logoutButton.addEventListener('click', handleLogout);
            logoutButton.hasListener = true; // Mark as having listener
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
            if (!token) return null;
            const parts = token.split('.');
            if (parts.length !== 3) return null;

            const payload = parts[1];
            const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(decoded);
        } catch (error) {
            console.error('JWT decoding failed:', error);
            return null;
        }
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
    // Don't duplicate logout handler here - it's handled in setupAuthLogic
    function toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdownContent.classList.toggle('show');
    }

    function closeDropdown(e) {
        if (!dropdown.contains(e.target)) {
            dropdownContent.classList.remove('show');
        }
    }

    profileIcon.addEventListener('click', toggleDropdown);
    
    dropdownContent.addEventListener('click', e => e.stopPropagation());
    window.addEventListener('click', closeDropdown);
}