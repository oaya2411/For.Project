document.addEventListener('DOMContentLoaded', function() {
    // Only run this code on landing page
    if (document.body.getAttribute('data-page') !== 'landing') return;

    const profileIcon = document.getElementById('profileIcon');
    const registerButton = document.getElementById('registerButton');
    
    if (!profileIcon || !registerButton) {
        console.error('Could not find required elements in DOM');
        return;
    }

    // Rest of your landing page auth code...
    function checkAuth() {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            registerButton.style.display = 'none';
            profileIcon.style.display = 'inline-block';
        } else {
            registerButton.style.display = 'inline-block';
            profileIcon.style.display = 'none';
        }
    }
    
    checkAuth();
});
function initAuthUI() {
    const maxAttempts = 10;
    let attempts = 0;
    
    function checkElements() {
        attempts++;
        const profileIcon = document.getElementById('profileIcon');
        const registerButton = document.getElementById('registerButton');
        
        if (profileIcon && registerButton) {
            // Elements found, proceed with logic
            function checkAuth() {
                const token = localStorage.getItem('authToken');
                
                if (token) {
                    registerButton.style.display = 'none';
                    profileIcon.style.display = 'inline-block';
                } else {
                    registerButton.style.display = 'inline-block';
                    profileIcon.style.display = 'none';
                }
            }
            
            checkAuth();
        } else if (attempts < maxAttempts) {
            // Elements not found yet, try again
            setTimeout(checkElements, 100);
        } else {
            console.error('Could not find required elements after maximum attempts');
        }
    }
    checkElements();
}

// Start the process when DOM is ready
if (document.body.getAttribute('data-page') === 'landing') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuthUI);
    } else {
        initAuthUI();
    }
}