const nameRegex = /^(?=(?:.*[a-zA-Z]){5,})[a-zA-Z0-9_ ]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[._%+-/!#@$^&*])[A-Za-z\d._%+-/!#@$^&*]{8,}$/;

const form = document.getElementById('form');
const errorMessages = {
  name: document.getElementById('nameError'),
  email: document.getElementById('emailError'),
  pass: document.getElementById('passError'),
  repass: document.getElementById('repassError')
};

form.addEventListener("submit", async function(e) {
  e.preventDefault();
  let isValid = true;

  // Get form values
  let role = document.getElementById('role').innerHTML;
  const fName = document.getElementById('fName').value.trim();
  const lName = document.getElementById('lName').value.trim();
  const name = `${fName} ${lName}`;
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('pass').value;
  const repassword = document.getElementById('repass').value;

  if(role.includes('hire')){
    role = 'client';
  }else{
    role = 'ServiceProvider';
  }

  // Reset all error messages
  Object.values(errorMessages).forEach(el => el.style.display = 'none');

  // Validation functions
  const showError = (field, message, duration = 5000) => {
    errorMessages[field].textContent = message;
    errorMessages[field].style.display = 'block';
    if (duration) setTimeout(() => errorMessages[field].style.display = 'none', duration);
    isValid = false;
  };

  // Field validations
  if (!fName || !lName) showError('name', 'Both first and last names are required');
  else if (!nameRegex.test(name)) showError('name', 'Name must contain at least 5 letters', 5000);

  if (!email) showError('email', 'Email is required');
  else if (!emailRegex.test(email)) showError('email', 'Email must be like: example@gmail.com', 5000);

  if (!password) showError('pass', 'Password is required');
  else if (!passwordRegex.test(password)) {
    errorMessages.pass.innerHTML = 'Password must contain at least 8 characters <br> Including Upper and lower case letters <br>Numbers and special characters,too';
    errorMessages.pass.style.display = 'block';
    setTimeout(() => errorMessages.pass.style.display = 'none', 5000);
    isValid = false;
  }

  if (!repassword) showError('repass', 'Please re-enter your password');
  else if (repassword !== password) showError('repass', "Passwords don't match", 5000);

  function showSuccessMessage(messageText) {
    const container = document.getElementById('messageContainer');

    const alertBox = document.createElement('div');
    alertBox.className = 'alert alert-success alert-dismissible fade show';
    alertBox.setAttribute('role', 'alert');
    alertBox.innerHTML = `
        <strong style="color: green; display:block;">Success Registration!</strong>
    `;

    container.appendChild(alertBox);

    setTimeout(() => {
        alertBox.classList.remove('show');
        alertBox.classList.add('hide');
        alertBox.addEventListener('transitionend', () => alertBox.remove());
    }, 5000);
  }

  // Form submission
  if (isValid) {
    let url = 'https://for-developers.vercel.app/api/v1/auth/signup';
  
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
                        <div class="spinner"></div>
                        <p class="loading-text">Loading...</p>
                        `;
    document.body.appendChild(loader);

// Add the loader class to body for overlay effect
document.body.classList.add('loading-active');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          "fullName": name,
          "email": email,
          "password": password,
          "rePassword": repassword,
          "role": role,
        })
      });
  
      const data = await response.json();
      console.log('Full API response:', data); 
  
      if (response.ok) { 
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('email', data.email);
          showSuccessMessage('Registration successful!');
          setTimeout(() => {
              window.location.href = "login.html";
          }, 2000);
          // perform next steps
        } else if (data.data?.token) { // Check nested token
          localStorage.setItem('authToken', data.data.token);
          showSuccessMessage('Registration successful!');

          setTimeout(() => {
              window.location.href = "../landingPage.html";
          }, 2000);
        } else {
          console.error('Token not found in response');
        }
      } else {
        console.error('API error:', data.message || 'Unknown error');
        alert('Registration failed as this mail used before try to log-in');
      }
        // When loading is complete
        document.body.removeChild(loader);
        document.body.classList.remove('loading-active');
    } catch (error) {
      document.body.removeChild(loader);
      console.error('Fetch error:', error);
      alert('Something went wrong. Please try again!');
    }
  }
});


