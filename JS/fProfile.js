// Regex patterns
const phoneRegex = /^\d{11,14}$/;
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// DOM Elements
const form = document.getElementById('form');
const errorMessages = {
  phone: document.getElementById('phoneError'),
  title: document.getElementById('titleError'),
  portfolio: document.getElementById('portfolioError'),
  experience: document.getElementById('exError'),
  role: document.getElementById('roleError'),
  countries: document.getElementById('countriesError'),
  cities: document.getElementById('citiesError'),
  techStack: document.getElementById('techStackError'),
  payment: document.getElementById('paymentError'),
  primaryField: document.getElementById('primaryFieldError'),
  industry: document.getElementById('industryError'),
  projectTypePrefered: document.getElementById('projectsPreferedError'),
  projectSizePrefered: document.getElementById('projectSizeError'),
  
};

// Global variables
let techStackContainer;

// Dropdown functionality
function createTechItem(tech) {
  const li = document.createElement('li');
  li.className = 'item';

  li.innerHTML = `
    <span class="checkbox">
      <i class="fa-solid fa-check check-icon"></i>
    </span>
    <span class="item-text">${tech.name}</span>
  `;

  li.addEventListener("click", () => toggleTechSelection(li, tech.name));
  return li;
}

function toggleTechSelection(li, techName) {
  li.classList.toggle("checked");
  const techStack = dropdowns.techStack;
  
  if (li.classList.contains("checked")) {
    techStack.getSelectedItems().push(techName);
  } else {
    const index = techStack.getSelectedItems().indexOf(techName);
    if (index > -1) {
      techStack.getSelectedItems().splice(index, 1);
    }
  }
  
  techStack.updateButtonText();
}

function loadTechStacks() {
  techStackContainer = document.querySelector("#techStack .list-items"); 
  fetch('https://api.stackexchange.com/2.3/tags?site=stackoverflow&sort=popular&order=desc&pagesize=100&page=1&key=rl_mg7UQxhsVFGxhq7yU5X1447nL')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      techStackContainer.innerHTML = '';
      data.items.forEach(tag => {
        const tech = { name: tag.name };
        const techItem = createTechItem(tech);
        techStackContainer.appendChild(techItem);
      });
    })
    .catch(error => {
      console.error('Error fetching tech stacks:', error);
      techStackContainer.innerHTML = '<li class="error">Failed to load tech stacks. Please try again later.</li>';
      errorMessages.techStack.textContent = "Failed to load tech stack options";
      errorMessages.techStack.style.display = 'block';
    });
}

function setupDropdown(btnSelector, listSelector) {
  const selectBtn = document.querySelector(btnSelector);
  const btnText = selectBtn.querySelector(".btn_text");
  const listItems = document.querySelector(listSelector);
  let selectedItems = [];

  function updateButtonText() {
    if (selectedItems.length > 0) {
      btnText.innerText = `${selectedItems.length} Selected`;
    } else {
      btnText.innerText = btnText.dataset.defaultText || "Select Options";
    }
  }

  if (listItems && !listItems.dataset.initialized) {
    const items = listItems.querySelectorAll(".item");
    items.forEach(item => {
      item.addEventListener("click", () => {
        item.classList.toggle("checked");
        const itemText = item.textContent.trim();
        
        if (item.classList.contains("checked")) {
          selectedItems.push(itemText);
        } else {
          selectedItems = selectedItems.filter(i => i !== itemText);
        }
        
        updateButtonText();
      });
    });
    listItems.dataset.initialized = "true";
  }

  selectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".select_btn").forEach(btn => {
      if (btn !== selectBtn) btn.classList.remove("open");
    });
    selectBtn.classList.toggle("open");
  });

  return {
    getSelectedItems: () => selectedItems,
    clearSelection: () => {
      selectedItems = [];
      if (listItems) {
        listItems.querySelectorAll(".item").forEach(item => {
          item.classList.remove("checked");
        });
      }
      updateButtonText();
    },
    updateButtonText
  };
}

// Initialize all dropdowns
const dropdowns = {
  techStack: setupDropdown("#techStack .select_btn", "#techStack .list-items"),
  payment: setupDropdown("#Payment .select_btn", "#paymentList"),
  primaryField: setupDropdown("#primaryField .select_btn", "#primaryFieldList"),
  industry: setupDropdown("#Industry .select_btn", "#industryList"),
  projectsPrefered: setupDropdown("#projectsPrefered .select_btn", "#proTypeList"),
  projectSize: setupDropdown("#projectSizePrefered .select_btn", "#proSizeList")
};

// Event listeners
document.addEventListener("click", () => {
  document.querySelectorAll(".select_btn").forEach(btn => {
    btn.classList.remove("open");
  });
});

document.querySelectorAll(".list-items").forEach(list => {
  list.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

// Form validation and submission
form.addEventListener("submit", async function(e) {
  e.preventDefault();
  let isValid = true;

  let firstErrorElement = null;

  // Validation functions
  const showError = (field, message) => {
    const errorElement = errorMessages[field];
    const inputElement =
      document.getElementById(field) ||
      document.querySelector(`select[name="${field}"]`) ||
      document.querySelector(`input[name="${field}"]`) ||
      document.getElementById(field === 'projectTypePrefered' ? 'projectsPrefered' : field === 'projectSizePrefered' ? 'projectSize' : field);

    if (errorElement && inputElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      // Set the first error element if not already set
      if (!firstErrorElement) {
        firstErrorElement = inputElement;
      }
    }
    isValid = false;
  };
  // Reset all error messages
  Object.values(errorMessages).forEach(el => el.style.display = 'none');

  // Get form values
  const formData = {
    phone: document.getElementById('phonenumber')?.value,
    title: document.getElementById('title')?.value,
    portfolio: document.getElementById('portfolio')?.value,
    country: document.getElementById('countries')?.value,
    city: document.getElementById('cities')?.value,
    experience: document.getElementById('experience')?.value,
    selectedRole: document.querySelector('input[name="role"]:checked')?.value,
    techStack: dropdowns.techStack.getSelectedItems(),
    payment: dropdowns.payment.getSelectedItems(),
    primaryField: dropdowns.primaryField.getSelectedItems(),
    industry: dropdowns.industry.getSelectedItems(),
    projectsPrefered: dropdowns.projectsPrefered.getSelectedItems(),
    projectSize: dropdowns.projectSize.getSelectedItems()
  };

  console.log(formData);
  // Validation functions
  // const showError = (field, message) => {
  //   errorMessages[field].textContent = message;
  //   errorMessages[field].style.display = 'block';
  //   isValid = false;
  // };

  // Required field validation
  if (!formData.phone) showError('phone', 'Phone number is required');
  else if (!phoneRegex.test(formData.phone)) showError('phone', 'Phone number must be 11-14 digits');

  if (!formData.title) showError('title', 'Title is required');
  if (!formData.portfolio) showError('portfolio', 'portfolio is required');
  else if(!urlRegex.test(formData.portfolio)) showError('portfolio', 'portfolio url is not correct');
  
  if (!formData.country || formData.country === 'Select Your Country') 
    showError('countries', 'Country is required');
  
  if (!formData.city || formData.city === 'Select City') 
    showError('cities', 'City is required');
  
  if (!formData.experience) showError('experience', 'Experience is required');
  else if (isNaN(formData.experience) || formData.experience < 0) 
    showError('experience', 'Experience must be a positive number');

  if (!formData.selectedRole) showError('role', 'Please select your service provider role');
    

  // Dropdown validations
  if (formData.techStack.length === 0) 
    showError('techStack', 'Please select at least one tech stack');
  
  if (formData.payment.length === 0) 
    showError('payment', 'Please select at least one payment preference');
  
  if (formData.primaryField.length === 0) 
    showError('primaryField', 'Please select at least one primary field');
  
  if (formData.industry.length === 0) 
    showError('industry', 'Please select at least one industry');
  if (formData.projectsPrefered.length === 0) 
    showError('projectTypePrefered', 'Please select at least one choice');
  if (formData.projectSize.length === 0) 
    showError('projectSizePrefered', 'Please select at least one choice');


  if (firstErrorElement) {
    firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstErrorElement.focus(); // Optional: Focus the input for accessibility
  }

  // Form submission
  if (isValid) {
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
      const response = await fetch('https://for-developers.vercel.app/api/v1/ServiceProvider/create-profile', {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({
          phoneNumber: formData.phone,
          title: formData.title,
          portfolio: formData.portfolio,
          country: formData.country,
          city: formData.city,
          experience: parseInt(formData.experience),
          industry: formData.industry,
          paymentPreference: formData.payment,
          typeOfServiceProvider: document.querySelector('input[name="role"]:checked')?.value || "freelancer",
          keySkills: formData.techStack,
          primaryField: formData.primaryField,
          typesOfProjectsPreferred: formData.projectsPrefered,
          projectSizePreferred: formData.projectSize,
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.log(data);
        console.log(formData.primaryField[0]);
        throw new Error(data.message || 'Failed to submit profile');
      }

      // Success handling
      localStorage.setItem('status', true);
      // showSuccessMessage('Profile completed successfully!');
      alert('Profile completed successfully!')
      setTimeout(() => {
        window.location.href = "../landingPage.html";
      }, 4000);

    } catch (error) {
      console.error('Submission error:', error);
      showError('form', `Submission failed: ${error.message}`);
    } finally {
      document.body.removeChild(loader);
      document.body.classList.remove('loading-active');
    }
  }
});

// Helper functions
function showSuccessMessage(message) {
  const container = document.getElementById('messageContainer');
  container.innerHTML = `
    <div class="alert alert-success">
      <strong>${message}</strong>
    </div>
  `;
  setTimeout(() => {
    container.innerHTML = '';
  }, 5000);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  loadTechStacks();
  
  // Set default text for dropdown buttons
  document.querySelectorAll('.btn_text').forEach(btn => {
    if (!btn.dataset.defaultText) {
      btn.dataset.defaultText = btn.textContent;
    }
  });
});