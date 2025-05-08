const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[._%+-/!#@$^&*])[A-Za-z\d._%+-/!#@$^&*]{8,}$/;
const form = document.getElementById('form');

const errorMessages = {
    pass: document.getElementById('passError_1'),
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
            Account Deleted Successfully
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

    // New Password validation
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

const showConfirmationDialog = () => {
    return new Promise((resolve) => {
        // Create the dialog container
        const dialog = document.createElement('div');
        dialog.id = 'confirmation-dialog';
        dialog.style.position = 'fixed';
        dialog.style.top = '0';
        dialog.style.left = '0';
        dialog.style.width = '100%';
        dialog.style.height = '100%';
        dialog.style.backgroundColor = 'rgba(0,0,0,0.5)';
        dialog.style.display = 'flex';
        dialog.style.justifyContent = 'center';
        dialog.style.alignItems = 'center';
        dialog.style.zIndex = '1000';

        // Create the dialog content
        const content = document.createElement('div');
        content.style.backgroundColor = 'white';
        content.style.padding = '20px';
        content.style.borderRadius = '8px';
        content.style.maxWidth = '400px';
        content.style.width = '90%';
        content.style.textAlign = 'center';

        // Add title and message
        const title = document.createElement('h3');
        title.textContent = 'Confirm Account Deletion';
        title.style.marginBottom = '15px';
        title.style.color = '#d9534f'; // Bootstrap danger color

        const message = document.createElement('p');
        message.textContent = 'Are you sure you want to delete your account? This action cannot be undone.';
        message.style.marginBottom = '20px';

        // Add buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.gap = '10px';

        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Delete Account';
        confirmBtn.style.backgroundColor = '#f44336';
        confirmBtn.style.color = 'white';
        confirmBtn.style.border = 'none';
        confirmBtn.style.padding = '8px 16px';
        confirmBtn.style.borderRadius = '10px';
        confirmBtn.style.cursor = 'pointer';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.backgroundColor = '#777';
        cancelBtn.style.color = 'white';
        cancelBtn.style.border = 'none';
        cancelBtn.style.padding = '8px 16px';
        cancelBtn.style.borderRadius = '10px';
        cancelBtn.style.cursor = 'pointer';

        // Add event listeners
        confirmBtn.addEventListener('click', () => {
            document.body.removeChild(dialog);
            resolve(true);
        });

        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(dialog);
            resolve(false);
        });

        // Append elements
        buttonContainer.appendChild(cancelBtn);
        buttonContainer.appendChild(confirmBtn);
        
        content.appendChild(title);
        content.appendChild(message);
        content.appendChild(buttonContainer);
        
        dialog.appendChild(content);
        document.body.appendChild(dialog);
    });
};

const handleFormSubmit = async (e) => {
    e.preventDefault();

    const password = document.getElementById('pass').value;
    const repassword = document.getElementById('repass').value;
    
    if (!validatePasswords(password, repassword)) {
        return;
    }

    // Show confirmation dialog and wait for user response
    const confirmed = await showConfirmationDialog();
    if (!confirmed) {
        return; // User canceled the deletion
    }

    const loader = showLoader();
    const url = 'https://for-developers.vercel.app/api/v1/auth/deleteAccount';
    const token = localStorage.getItem('authToken');
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {  
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify({
                password: password,
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete account');
        }else{
            localStorage.clear();
            alert("Account Deleted Successfully");
            window.location.href = 'landingPage.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Error: Something went wrong .. try to login and then delete account`);
    } finally {
        hideLoader(loader);
    }
};

form.addEventListener("submit", handleFormSubmit);