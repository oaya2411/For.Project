// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[._%+-/!#@$^&*])[A-Za-z\d._%+-/!#@$^&*]{8,}$/;
const phoneRegex = /^\d{11,14}$/;

const form = document.getElementById('form');
const errorMessages = {
  phone: document.getElementById('phoneError'),
  // company: document.getElementById('companyError'),
  countries: document.getElementById('countriesError'),
  cities: document.getElementById('citiesError'),
  industry: document.getElementById('industryError'),
};

function decodeJWT(token) {
  try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      
      const payload = parts[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      let data = document.getElementById('data');
      data.innerHTML = decoded('profileCompleted');
      localStorage.setItem('staues', data('profileCompleted'));
      return JSON.parse(decoded);
  } catch (error) {
      console.error('JWT decoding failed:', error);
      return null;
  }
}

form.addEventListener("submit", async function(e) {
  e.preventDefault();
  let isValid = true;

  // Get form value
  const phone = document.getElementById('phonenumber').value;
  // const company = document.getElementById('company').value;
  const country = document.getElementById('countries').value;
  const city = document.getElementById('cities').value;
  const industry = document.getElementById('industry').value;

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

  if (!phone) showError('phone', 'phone number is required');
  else if (!phoneRegex.test(phone)) showError('phone', 'Phone number must contain of 14 digit', 6000);

  // if (!company) showError('company', 'your company name is required');
  if (!country || country === 'firstItem') showError('countries', 'country field is required');
  if (!city || city === 'firstItem') showError('cities', 'City is required');
  if (!industry || industry==='firstItem') showError('industry', 'This field is required');

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
    let url = 'https://for-developers.vercel.app/api/v1/client/create-profile';
    const token = localStorage.getItem('authToken');
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
          'Content-Type': 'application/json' ,
          'token': token,
        },
        body: JSON.stringify({
            "phoneNumber": phone,
            "country": country,
            "city": city,
            "portfolio": "https://johndoeportfolio.com",
            "sector": ["FinTech", "E-commerce"],
            "primaryField": ["development", "design"],
            "keySkills": ["JavaScript", "React", "Node.js", "Figma"],
            "experience": 5,
            "title": "Senior Full-Stack Developer",
            "typeOfServiceProvider": "freelancer",
            "typesOfProjectsPreferred": ["Web Apps", "E-Commerce Platforms"],
            "projectSizePreferred": ["medium"],
            "paymentPreference": ["hourly payment"]
      })
      });
  
      const data = await response.json();
      console.log('Full API response:', data); 
      if (response.ok) { 
        localStorage.setItem('authToken', data.data.token);
          data = decodeJWT(token);
          localStorage.setItem('staues', data('CompletedProfile'));
          showSuccessMessage('Process Success ... your profile compeleted ^^');
          setTimeout(() => {
              window.location.href = "../landingPage.html";
          }, 5000);
          console.log('API response:', data || 'data not found');
      } else {
        console.error('API error:', data.message || 'Unknown error');
        // alert('Incorrect mail or password, ensure about them please');
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


