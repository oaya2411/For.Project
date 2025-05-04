const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[._%+-/!#@$^&*])[A-Za-z\d._%+-/!#@$^&*]{8,}$/;

const form = document.getElementById('form');
const errorMessages = {
  email: document.getElementById('emailError'),
  pass: document.getElementById('passError'),
};


form.addEventListener("submit", async function(e) {
  e.preventDefault();
  let isValid = true;

  // Get form value
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('pass').value.trim();


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

  if (!email) showError('email', 'Email is required');
  else if (!emailRegex.test(email)) showError('email', 'Email must be like: example@gmail.com', 5000);

  if (!password) showError('pass', 'Password is required');
  else if (!passwordRegex.test(password)) {
    errorMessages.pass.innerHTML = 'Password must contain at least 8 characters <br> Including Upper and lower case letters <br>Numbers and special characters,too';
    errorMessages.pass.style.display = 'block';
    setTimeout(() => errorMessages.pass.style.display = 'none', 5000);
    isValid = false;
  }

  function showSuccessMessage(messageText) {
    const container = document.getElementById('messageContainer');

    const alertBox = document.createElement('div');
    alertBox.className = 'alert alert-success alert-dismissible fade show';
    alertBox.setAttribute('role', 'alert');
    alertBox.innerHTML = `
        <strong style="color: lightgreen; display:block; align-items:center; text-align: center;">You Have LoggedIn Succefully!</strong>
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
    let url = 'https://for-developers.vercel.app/api/v1/auth/login';
  
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
          "email": email,
          "password": password,
        })
      });
  
      const data = await response.json();
      console.log('Full API response:', data); 
      if (response.ok) { 
        if (data.data?.token) { // Check nested token
          localStorage.setItem('authToken', data.data.token);
          localStorage.setItem('email', email);
          // localStorage.setItem('status', data.data.profileCompleted);
          showSuccessMessage('You have Successfully LogIn!');
          setTimeout(() => {
              window.location.href = "../landingPage.html";
          }, 5000);
        } else {
          console.error('Token not found in response');
        }
      } else {
        console.error('API error:', data.message || 'Unknown error');
        alert('Incorrect mail or password, ensure about them please');
      }
       
    } catch (error) {
      document.body.removeChild(loader);
      document.body.classList.remove('loading-active');
      console.error('Fetch error:', error);
      alert('Something went wrong. Please try again!');
    }

     // When loading is complete
     document.body.removeChild(loader);
     document.body.classList.remove('loading-active');
  }
});


