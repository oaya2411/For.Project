let message = document.getElementById('messageContainer');
const token = localStorage.getItem('authToken');

const phoneRegex = /^\d{11,14}$/;

const form = document.getElementById('form');

function load(){

}

async function getDashboardData(){
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
      let totalProjects = document.getElementById('totalProjects');
      let completed = document.getElementById('completed');
      let inprogress = document.getElementById('inProgress');
      let notstarted = document.getElementById('notstarted');
      const response = await fetch(`https://for-developers.vercel.app/api/v1/dashboard/client-stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'token': token,
        }
      });
      console.log('entered')
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        completed.textContent = data?.data?.stats[0]?.completed ?? 0;
        inprogress.textContent = data?.data?.stats[0]?.inProgress ?? 0;
        notstarted.textContent = data?.data?.stats[0]?.notStarted ?? 0;
        totalProjects.textContent = data?.data?.stats[0]?.totalProjects ?? 0;
        
      }else{
        throw new Error(`HTTP Error: ${response}`);
      }
    } catch (error) {
      console.error('Error handle data: ', error.message);
      alert('fail to get data, Try to Login Please');
    }
     // When loading is complete
     document.body.removeChild(loader);
     document.body.classList.remove('loading-active');
  }
getDashboardData();

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
      // let role = document.getElementById('fullName').value;
      let phoneNumber = document.getElementById('phoneNumber');
      let country =document.getElementById('Country');
      let city = document.getElementById('City');
      let companyName = document.getElementById('companyName');
      let industry = document.getElementById('IndusrtyField');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        fullName.textContent = data.data.user.fullName; 
        email.textContent = data.data.user.email;
        phoneNumber.textContent = data.data.userData.phoneNumber; 
        country.textContent = data.data.userData.country;
        city.textContent = data.data.userData.city;
        industry.textContent = data.data.userData.industry;
        companyName.textContent = data.data.userData.companyName;

      }else{
        throw new Error(`HTTP Error: ${response}`);
      }
    } catch (error) {
      console.error('Error handle data: ', error.message);
      alert('fail to get data, Try to Login Please');
    }
     // When loading is complete
     document.body.removeChild(loader);
     document.body.classList.remove('loading-active');
  }
  
getUserData();

// handle displaying Edit section
const editButton = document.getElementById('edit');
const infoSection = document.getElementById('secondaryInfo');
const editSection = document.getElementById('EditSecondaryInfo');
const cancelButton = document.getElementById('cancel');

// display edit form when click on edit button
editButton.addEventListener('click', (e)=>{
    infoSection.style.display = 'none';
    editSection.style.display = 'block';
});

//display info when click on cancel button
cancelButton.addEventListener('click', (e)=>{
    infoSection.style.display = 'block';
    editSection.style.display = 'none';
});

function loadCountries(){
    const apiKey = "RVVNT0ZmWDRJVXBKSDJVWnJiWnd6b3NOSVV0NnlhZ0lGS2ZLbEdOcQ==";
        
            var headers = new Headers();
            headers.append("X-CSCAPI-KEY", apiKey);
        
            var requestOptions = {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            };
        
            fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
                .then(response => response.json())
                .then(countries => {
                    const countrySelect = document.getElementById("countries");
                    countries.forEach(country => {
                        if(country.name !== 'Israel') {
                            const option = document.createElement("option");
                            option.value = country.iso2;
                            option.text = country.name;
                            countrySelect.appendChild(option);
                        }
                    });
                });
        
            document.getElementById("countries").addEventListener("change", function () {
                const selectedCountryCode = this.value;
                const citySelect = document.getElementById("cities");
        
                citySelect.innerHTML = '<option class="firstItem">Select City</option>';
        
                fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountryCode}/cities`, requestOptions)
                    .then(response => response.json())
                    .then(cities => {
                        cities.forEach(city => {
                            const option = document.createElement("option");
                            option.value = city.name;
                            option.text = city.name;
                            citySelect.appendChild(option);
                        });
                    });
            });
}

// load all countries
const SelectCountry = document.getElementById('countries');
SelectCountry.addEventListener("click", (e)=>{
    loadCountries();
})


const errorMessages = {
    phone: document.getElementById('phoneError'),
    company: document.getElementById('companyNameError'),
    countries: document.getElementById('countriesError'),
    cities: document.getElementById('citiesError'),
    industry: document.getElementById('industryError'),
  };

  function validateData(e) {
    e.preventDefault();
    let isValid = true;
    const DEFAULT_SELECT_VALUE = 'firstItem';

    // Get form values
    const phone = document.getElementById('phonenumber').value.trim();
    const company = document.getElementById('company').value.trim();
    const country = document.getElementById('countries').value;
    const city = document.getElementById('cities').value;
    const industry = document.getElementById('industry').value;

    // Reset all error messages
    Object.values(errorMessages).forEach(el => {
        if (el) el.style.display = 'none';
    });

    // Validation functions
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

    // Field validations
    if (!phone) {
        showError('phone', 'Phone number is required');
    } else if (!phoneRegex.test(phone)) {
        showError('phone', 'Phone number must contain exactly 14 digits', 6000);
    }

    if (!company) showError('company', 'Your company name is required');
    if (!country || country === DEFAULT_SELECT_VALUE) showError('countries', 'Country field is required');
    if (!city || city === DEFAULT_SELECT_VALUE) showError('cities', 'City is required');
    if (!industry || industry === DEFAULT_SELECT_VALUE) showError('industry', 'This field is required');
    
    // Submit if valid
    if (isValid) {
        return true; // or your form submission logic
    }
    return;
}

async function submitData(){
    let url = "https://for-developers.vercel.app/api/v1/client/edit-profile";
    // Get form values
    const phone = document.getElementById('phonenumber').value.trim();
    const company = document.getElementById('company').value.trim();
    const country = document.getElementById('countries').value;
    const city = document.getElementById('cities').value;
    const industry = document.getElementById('industry').value;
    // get token and loader
    const token = localStorage.getItem('authToken');
    const loader = document.createElement('div');
    console.log("phone", phone);
    console.log("compane", company);
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
          body: JSON.stringify({
            "phoneNumber": phone,
            "country": country,
            "city": city,
            "companyName": company, 
            "industry": industry,
          })
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

// const submitButton = document.getElementById('submit');
// submitButton.addEventListener("click", (e)=>{
//     if(validateData(e)){
//         submitData();
//     }
// })

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

initializeDropdown();