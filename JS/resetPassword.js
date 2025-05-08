const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[._%+-/!#@$^&*])[A-Za-z\d._%+-/!#@$^&*]{8,}$/;
const form = document.getElementById('form');
const errorMessages = {
    pass: document.getElementById('passError'),
    repass: document.getElementById('passError_2'),
};

// Password requirements message (used in multiple places)
const PASSWORD_REQUIREMENTS = `
    Password must contain at least 8 characters<br>
    Including Upper and lower case letters<br>
    Numbers and special characters,too
`;

// Utility functions
const showError = (field, message, duration = 5000) => {
    errorMessages[field].innerHTML = message;
    errorMessages[field].style.display = 'block';
    if (duration) {
        setTimeout(() => errorMessages[field].style.display = 'none', duration);
    }
};

const showLoader = () => {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="spinner"></div>
        <p class="loading-text">Loading...</p>
    `;
    document.body.appendChild(loader);
    document.body.classList.add('loading-active');
    return loader;
};

const hideLoader = (loader) => {
    if (loader && loader.parentNode) {
        document.body.removeChild(loader);
    }
    document.body.classList.remove('loading-active');
};

const showSuccessMessage = () => {
    const container = document.getElementById('messageContainer');
    const alertBox = document.createElement('div');
    alertBox.className = 'alert alert-success alert-dismissible fade show';
    alertBox.setAttribute('role', 'alert');
    alertBox.innerHTML = `
        <strong style="color: green; display:block; align-items:center; text-align: center;">
            Success Registration!
        </strong>
    `;
    container.appendChild(alertBox);

    setTimeout(() => {
        alertBox.classList.remove('show');
        alertBox.classList.add('hide');
        alertBox.addEventListener('transitionend', () => alertBox.remove());
    }, 5000);
};

const validatePasswords = (password, repassword) => {
    let isValid = true;
    
    // Reset all error messages
    Object.values(errorMessages).forEach(el => el.style.display = 'none');

    // Password validation
    if (!password) {
        showError('pass', 'Password is required');
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        showError('pass', PASSWORD_REQUIREMENTS);
        isValid = false;
    }

    // Confirm password validation
    if (!repassword) {
        showError('repass', 'Please confirm your password');
        isValid = false;
    } else if (password !== repassword) {
        showError('repass', 'Passwords do not match');
        isValid = false;
    } else if (!passwordRegex.test(repassword)) {
        showError('repass', PASSWORD_REQUIREMENTS);
        isValid = false;
    }

    return isValid;
};

const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const password = document.getElementById('pass').value;
    const repassword = document.getElementById('repass').value;
    
    if (!validatePasswords(password, repassword)) {
        return;
    }

    const loader = showLoader();
    const url = 'https://for-developers.vercel.app/api/v1/auth/resetPassword';
    const email = localStorage.getItem("email");
    
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {  
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                email: email,
                newPassword: password,
                rePassword: repassword,
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            let err = document.getElementById('message');
            err.innerHTML = data.message;
            throw new Error(data.message || 'Failed to update password');
        }else{
            alert("Password Updated Successfully");
            window.location.href = '../Authentication/login.html'
        }
    } catch (error) {
        console.error('Error:', error);
        // alert(`Error: ${error.message}`);
    } finally {
        hideLoader(loader);
    }
};

form.addEventListener("submit", handleFormSubmit);