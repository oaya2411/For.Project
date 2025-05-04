// === 1. Store initial data after fetching user info ===
let initialUserData = {};

async function getUserData() {
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.innerHTML = `
                      <div class="spinner"></div>
                      <p class="loading-text">Loading...</p>
                      `;
  document.body.appendChild(loader);
  document.body.classList.add('loading-active');

  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`https://for-developers.vercel.app/api/v1/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'token': token,
      }
    });

    let fullName = document.getElementById('fullName');
    let email = document.getElementById('email');
    let phoneNumber = document.getElementById('phoneNumber');
    let country = document.getElementById('Country');
    let city = document.getElementById('City');
    let companyName = document.getElementById('companyName');
    let industry = document.getElementById('IndusrtyField');

    if (response.ok) {
      const data = await response.json();
      const user = data.data.user;
      const userData = data.data.userData;

      fullName.textContent = user.fullName; 
      email.textContent = user.email;
      phoneNumber.textContent = userData.phoneNumber; 
      country.textContent = userData.country;
      city.textContent = userData.city;
      industry.textContent = userData.industry;
      companyName.textContent = userData.companyName;

      // Store initial values
      initialUserData = {
        phoneNumber: userData.phoneNumber,
        country: userData.country,
        city: userData.city,
        companyName: userData.companyName,
        industry: userData.industry
      };

    } else {
      throw new Error(`HTTP Error: ${response}`);
    }
  } catch (error) {
    console.error('Error handle data: ', error.message);
    alert('fail to get data, Try to Login Please');
  }

  document.body.removeChild(loader);
  document.body.classList.remove('loading-active');
}

// === 2. Modified validation to check only changed values ===
function validateData(e) {
  e.preventDefault();
  let isValid = true;
  const DEFAULT_SELECT_VALUE = 'firstItem';

  const phone = document.getElementById('phonenumber').value.trim();
  const company = document.getElementById('company').value.trim();
  const country = document.getElementById('countries').value;
  const city = document.getElementById('cities').value;
  const industry = document.getElementById('industry').value;

  Object.values(errorMessages).forEach(el => {
    if (el) el.style.display = 'none';
  });

  const showError = (field, message, duration = 5000) => {
    if (errorMessages[field]) {
      errorMessages[field].textContent = message;
      errorMessages[field].style.display = 'block';
      if (duration) setTimeout(() => {
        if (errorMessages[field]) errorMessages[field].style.display = 'none';
      }, duration);
    }
    isValid = false;
  };

  const changedFields = {};

  if (phone !== initialUserData.phoneNumber) {
    if (!phone) showError('phone', 'Phone number is required');
    else if (!phoneRegex.test(phone)) showError('phone', 'Phone number must contain exactly 14 digits', 6000);
    else changedFields.phoneNumber = phone;
  }

  if (company !== initialUserData.companyName) {
    if (!company) showError('company', 'Your company name is required');
    else changedFields.companyName = company;
  }

  if (country !== initialUserData.country) {
    if (!country || country === DEFAULT_SELECT_VALUE) showError('countries', 'Country field is required');
    else changedFields.country = country;
  }

  if (city !== initialUserData.city) {
    if (!city || city === DEFAULT_SELECT_VALUE) showError('cities', 'City is required');
    else changedFields.city = city;
  }

  if (industry !== initialUserData.industry) {
    if (!industry || industry === DEFAULT_SELECT_VALUE) showError('industry', 'This field is required');
    else changedFields.industry = industry;
  }

  if (isValid && Object.keys(changedFields).length > 0) {
    return changedFields;
  } else if (isValid) {
    alert("No changes were made.");
  }

  return false;
}

// === 3. Use changed fields only in submitData ===
async function submitData(changedFields) {
  const url = "https://for-developers.vercel.app/api/v1/client/edit-profile";
  const token = localStorage.getItem('authToken');
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.innerHTML = `
    <div class="spinner"></div>
    <p class="loading-text">Loading...</p>
  `;
  document.body.appendChild(loader);
  document.body.classList.add('loading-active');

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
      body: JSON.stringify(changedFields)
    });

    const responseData = await response.json();
    console.log('Full API response:', responseData); 

    if (response.ok) {
      alert("Profile updated successfully!");
      localStorage.setItem('status', true);
      infoSection.style.display = 'block';
      editSection.style.display = 'none';
      setTimeout(() => {
        window.location.href = "../landingPage.html";
      }, 3000);

    } else {
      console.error('API error:', responseData.message || 'Unknown error');
      alert(responseData.message || 'Failed to update profile');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    alert('Something went wrong. Please try again!');
  } finally {
    document.body.removeChild(loader);
    document.body.classList.remove('loading-active');
  }
}

let submitButton = document.getElementById('submit');

submitButton.addEventListener("click", (e) => {
  const changedData = validateData(e);
  if (changedData) {
    submitData(changedData);
  }
});