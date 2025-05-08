// Get DOM elements
const messageContainer = document.getElementById('messageContainer');

// Function to safely decode JWT
function decodeJWT(token) {
    if (!token) {
        console.error('No token provided');
        return null;
    }

    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT format');
        }
        
        const payload = parts[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decodedString = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(decodedString);
    } catch (error) {
        console.error('JWT decoding failed:', error);
        return null;
    }
}

// Function to display messages to user
function displayMessage(type, text) {
    messageContainer.innerHTML = `<div class="alert alert-${type}">${text}</div>`;
}

// Function to fetch user data
async function getUserData() {
    // Show loading state
    displayMessage('info', 'Loading user data...');

    try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        // Verify token is valid before making request
        const decodedToken = decodeJWT(token);
        if (!decodedToken || !decodedToken.userId) {
            throw new Error('Invalid token format');
        }

        const response = await fetch(`https://for-developers.vercel.app/api/v1/user/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'token': `${token}`,
            }
        });
        console.log(response);
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Session expired. Please login again.');
            } else if (response.status === 403) {
                throw new Error('You are not authorized to access this resource.');
            } else {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        }

        const data = await response.json();
        console.log(data);
        // Store user data in variables
        
        // Accessing user information
const user = data.user;
console.log('User Information:');
console.log('Full Name:', user.fullName);
console.log('Email:', user.email);
console.log('Role:', user.role);
console.log('Profile Completed:', user.profileCompleted);
console.log('Created At:', user.createdAt);

// Accessing userData information
const userData = data.userData;
console.log('\nAdditional User Data:');
console.log('ID:', userData.id);
console.log('User ID:', userData.user);
console.log('Phone Number:', userData.phoneNumber);
console.log('Country:', userData.country);
console.log('City:', userData.city);
        // const { 
        //     fullName = '',
        //     email = '',
        //     role = '',
        //     phoneNumber = '',
        //     country = '',
        //     city = '',
        //     companyName = '',
        //     industry = ''
        // } = userData;

        // // Display formatted user data
        // const formattedData = `
        //     <h3>User Profile</h3>
        //     <p><strong>Name:</strong> ${fullName}</p>
        //     <p><strong>Email:</strong> ${email}</p>
        //     <p><strong>Role:</strong> ${role}</p>
        //     <p><strong>Phone:</strong> ${phoneNumber || 'N/A'}</p>
        //     <p><strong>Location:</strong> ${city}, ${country}</p>
        //     <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
        //     <p><strong>Industry:</strong> ${industry || 'N/A'}</p>
        // `;
        
        // displayMessage('success', formattedData);

        // return userData;

    } catch (error) {
        console.error('Error handling user data:', error.message);
        
        if (error.message.includes('Session expired') || error.message.includes('Invalid token')) {
            // Clear invalid token
            localStorage.removeItem('authToken');
            displayMessage('danger', `${error.message} Redirecting to login...`);
            // Redirect to login after delay
            setTimeout(() => window.location.href = '/login', 2000);
        } else {
            displayMessage('danger', `Failed to get data: ${error.message}`);
        }
        
        return null;
    }
}

// Initialize the app
async function initApp() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        displayMessage('warning', 'You are not logged in. Redirecting to login...');
        setTimeout(() => window.location.href = '../login', 2000);
        return;
    }

    await getUserData();
}

// Start the application
initApp();