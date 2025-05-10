document.addEventListener('DOMContentLoaded', function() {

    if(localStorage.getItem('role') === 'admin'){
        window.location.href= 'adminLanding.html';
    }
    
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
        'profileLink',
        'projectsLink',
    ];

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
            profileLink,
            projectsLink
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
            console.log(userData.role);
            console.log("Auth token:", token);
            console.log("Userdata:", userData);

            if (token || userData) {
                localStorage.setItem('role' ,userData.role);
                // User is logged in
                safeDisplay(registerButton, 'none');
                safeDisplay(LogInButton, 'none');
                safeDisplay(profileIcon, 'inline-block');
                
                // Show post project only for specific roles
                const shouldShowPostProject = userData.role && userData.role !== 'ServiceProvider';
                // projects page nav
                if(shouldShowPostProject){
                    safeDisplay(projectsLink, 'flex');
                }else{
                    safeDisplay(projectsLink, 'none');
                }
                // Handle profile completion status
                if (status === true || status === 'true' || userData.profileCompleted == true) {
                    safeDisplay(createProfile, 'none');
                    safeDisplay(profileLink, 'flex');
                    safeDisplay(profileIcon, 'flex');
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
                safeDisplay(projectsLink, 'none');
                document.getElementById('projectsLink').display = 'none';
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

        projectsLink.addEventListener("click", (e)=>{
            window.location.href = 'displayAllProjects.html';
        })

        // Initial UI update
        updateUI();
    }

    function setupTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        console.log(`Found ${timelineItems.length} timeline items`); // Debug
        
        if (timelineItems.length === 0) {
            console.error('No timeline items found!');
            return;
        }
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log(`Item ${entry.target.textContent.substring(0,20)}... is intersecting: ${entry.isIntersecting}`);
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
    
        timelineItems.forEach(item => {
            console.log('Observing item:', item);
            observer.observe(item);
        });
    }
    setupTimelineAnimation();
    

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

// Add at the top (or import)
function decodeJWT(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.error("Invalid token", e);
        return null;
    }
}

document.getElementById("menuToggle").addEventListener("click", (e) => {
    const elements = {
        registerButton: document.getElementById('registerButton1'),
        logInButton: document.getElementById('LogInButton1'),
        postProject: document.getElementById('postProject1'),
        projectsLink: document.getElementById('projectsLink1'),
        profileIcon: document.getElementById('profileIcon1'),
        createProfile: document.getElementById('createProfile1'),
        profileLink: document.getElementById('profileLink1'),
        logoutButton: document.getElementById('logout1') // Make sure this exists
    };

    const token = localStorage.getItem('authToken'); 
    const userData = token ? decodeJWT(token) : null;
    const status = localStorage.getItem('status');
    function pathToProfile(role, ButtonClass){
        ButtonClass.addEventListener("click", (e)=>{
            if(role === 'client'){
                window.location.href = 'clientProfile.html';
            }else{
                window.location.href = 'freelancerProfile.html';
            }
        })
    }
    
    if (token && userData) {
        localStorage.setItem('role', userData.role);
        
        elements.registerButton.style.display = 'none';
        elements.registerButton.style.color = 'black';
        elements.logInButton.style.display = 'none';
        elements.logInButton.style.color = 'black';
        
        const isServiceProvider = userData.role === 'ServiceProvider';
        const profileCompleted = status === 'true' || userData.profileCompleted === true;

        // Projects link visibility
        
        if (profileCompleted) {
            // create
            elements.createProfile.style.display = 'none';
            // elements.createProfile.style.color = 'black';
            // profile
            elements.profileIcon.style.display = 'flex';
            elements.profileIcon.style.color = 'black';
            // elements on it
            elements.profileLink.style.display = 'flex';
            elements.profileLink.style.color = 'black';
            
            
            // Ensure pathToProfile is defined
            if (typeof pathToProfile === 'function') {
                pathToProfile(isServiceProvider ? 'freelancer' : 'client', elements.profileLink);
            }
            if( isServiceProvider){
                    // elements on it
                elements.projectsLink.style.display = 'none';
                elements.postProject.style.display = 'none';
            }else{
                elements.projectsLink.style.display = 'flex';

                elements.postProject.style.display = 'flex';
                elements.postProject.style.color = 'black';
            }
        } else {
            // create
            elements.createProfile.style.display = 'flex';
            elements.createProfile.style.color = 'black';
            elements.profileIcon.style.display = 'flex';
            elements.profileIcon.style.color = 'black';
            // elements on it
            elements.profileLink.style.display = 'none';
            elements.postProject.style.display = 'none';
            
        }
    } else {
        // User is not logged in
        Object.values(elements).forEach(el => {
            if (el) el.style.display = 'none';
        });
        elements.logInButton.style.display = 'none';
        elements.registerButton.style.display = 'inline-block';
        elements.registerButton.style.color = 'black';
        elements.logInButton.style.display = 'inline-block';
        elements.logInButton.style.color = 'black';
    }

    // Event delegation might be better than adding listeners here
    if (elements.createProfile && !elements.createProfile.hasListener) {
        elements.createProfile.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.add('loading-active');
            setTimeout(() => {
                window.location.href = userData?.role === "client" 
                    ? 'createClientAccount.html' 
                    : 'createFreelancerAccount.html';
            }, 100);
        });
        elements.createProfile.hasListener = true;
    }

    const logoutButton = document.getElementById('logout1');
    if (logoutButton && !logoutButton.hasListener) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.clear();
            document.body.classList.add('loading-active');
            setTimeout(() => window.location.href = 'landingPage.html', 100);
        });
        logoutButton.hasListener = true;
    }

    if (elements.projectsLink && !elements.projectsLink.hasListener) {
        elements.projectsLink.addEventListener("click", (e) => {
            window.location.href = 'displayAllProjects.html';
        });
        elements.projectsLink.hasListener = true;
    }
});