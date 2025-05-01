const form = document.getElementById('form');
const errorMessages = {
  title: document.getElementById('titleError'),
  portfolio: document.getElementById('portfolioError'),
  phonenumber: document.getElementById('phoneError'),
  experience: document.getElementById('experienceError'),
  role: document.getElementById('detailsError'),
  countries: document.getElementById('countriesError'),
  cities: document.getElementById('citiesError'),
  industry: document.getElementById('industryError'),
  paymentPreference: document.getElementById('paymentError'),
  primary_field: document.getElementById('projectTypeError'),
  techStack: document.getElementById('techStackError')
};

// Variables for tech stack dropdown
const techSelectBtn = document.querySelector(".select_btn"),
      techBtnText = document.querySelector(".btn_text"),
      techStackContainer = document.querySelector(".list-items");

let selectedTechs = [];

// Variables for payment preferences dropdown
const paymentSelectBtn = document.querySelector(".payment_select_btn"),
      paymentBtnText = document.querySelector(".payment_btn_text"),
      paymentContainer = document.querySelector(".payment_list-items");

let selectedPayments = [];

// Variables for primary field dropdown
const primaryFieldSelectBtn = document.querySelector(".primary_field_select_btn"),
      primaryFieldBtnText = document.querySelector(".primary_field_btn_text"),
      primaryFieldContainer = document.querySelector(".primary_field_list-items");

let selectedPrimaryFields = [];

// Variables for sector dropdown
const sectorSelectBtn = document.querySelector(".sector_select_btn"),
      sectorBtnText = document.querySelector(".sector_btn_text"),
      sectorContainer = document.querySelector(".sector_list-items");

let selectedSectors = [];

// Generic function to create dropdown items
function createDropdownItem(container, itemName, selectedItems) {
    const li = document.createElement('li');
    li.className = 'item';

    li.innerHTML = `
      <span class="checkbox">
        <i class="fa-solid fa-check check-icon"></i>
      </span>
      <span class="item-text">${itemName}</span>
    `;

    li.addEventListener("click", () => toggleItemSelection(li, itemName, selectedItems, container));
    return li;
}

function toggleItemSelection(li, itemName, selectedItems, btnTextElement) {
    li.classList.toggle("checked");

    if (li.classList.contains("checked")) {
        selectedItems.push(itemName);
    } else {
        const index = selectedItems.indexOf(itemName);
        if (index > -1) {
            selectedItems.splice(index, 1);
        }
    }

    updateDropdownButtonText(selectedItems, btnTextElement);
}

function updateDropdownButtonText(selectedItems, btnTextElement) {
    if (selectedItems.length > 0) {
        btnTextElement.innerText = `${selectedItems.length} Selected`;
    } else {
        btnTextElement.innerText = "Select Options";
    }
}

// Load tech stacks
function loadTechStacks() {
    fetch('https://api.stackexchange.com/2.3/tags?site=stackoverflow&sort=popular&order=desc&pagesize=100&page=1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            techStackContainer.innerHTML = '';
            data.items.forEach(tag => {
                const techItem = createDropdownItem(techStackContainer, tag.name, selectedTechs);
                techStackContainer.appendChild(techItem);
            });
        })
        .catch(error => {
            console.error('Error fetching tech stacks:', error);
            techStackContainer.innerHTML = '<li class="error">Failed to load tech stacks</li>';
        });
}

// Load payment preferences
function loadPaymentPreferences() {
    const paymentOptions = [
        "hourly payment",
        "milestone-based payment",
        "upon project delivery payment"
    ];
    
    paymentContainer.innerHTML = '';
    paymentOptions.forEach(option => {
        const paymentItem = createDropdownItem(paymentContainer, option, selectedPayments);
        paymentContainer.appendChild(paymentItem);
    });
}

// Load primary fields
function loadPrimaryFields() {
    const primaryFieldOptions = [
        "Web Development",
        "Mobile Development ios",
        "Mobile Development android",
        "Mobile Development flutter",
        "UI/UX Design"
    ];
    
    primaryFieldContainer.innerHTML = '';
    primaryFieldOptions.forEach(option => {
        const primaryFieldItem = createDropdownItem(primaryFieldContainer, option, selectedPrimaryFields);
        primaryFieldContainer.appendChild(primaryFieldItem);
    });
}

// Load sectors
function loadSectors() {
    const sectorOptions = [
        "FinTech",
        "HealthTech",
        "E-commerce",
        "Retail Tech",
        "AI & Machine Learning",
        "Cybersecurity Tech",
        "EdTech",
        "GamingTech",
        "CloudTech",
        "Blockchain & Web3",
        "Big Data & Analytics",
        "Mobility & Transport Tech",
        "Logistics & Supply Chain Tech",
        "Entertainment & Media Tech",
        "InsurTech",
        "PropTech",
        "AgriTech",
        "EnergyTech & CleanTech",
        "SportsTech",
        "Industry 4.0 & Manufacturing Tech",
        "GovTech"
    ];
    
    sectorContainer.innerHTML = '';
    sectorOptions.forEach(option => {
        const sectorItem = createDropdownItem(sectorContainer, option, selectedSectors);
        sectorContainer.appendChild(sectorItem);
    });
}

// Setup dropdown toggle functionality
function setupDropdown(selectBtn, container) {
    selectBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectBtn.classList.toggle("open");
    });

    document.addEventListener("click", () => {
        selectBtn.classList.remove("open");
    });

    container.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

// Initialize all dropdowns
function initializeDropdowns() {
    // Tech stack dropdown
    setupDropdown(techSelectBtn, techStackContainer);
    loadTechStacks();
    
    // Payment preferences dropdown
    setupDropdown(paymentSelectBtn, paymentContainer);
    loadPaymentPreferences();
    
    // Primary field dropdown
    setupDropdown(primaryFieldSelectBtn, primaryFieldContainer);
    loadPrimaryFields();
    
    // Sector dropdown
    setupDropdown(sectorSelectBtn, sectorContainer);
    loadSectors();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeDropdowns);

form.addEventListener("submit", async function(e) {
    e.preventDefault();
    let isValid = true;

    // Get form values
    const title = document.getElementById('title').value.trim();
    const portfolio = document.getElementById('portfolio').value.trim();
    const phonenumber = document.getElementById('phonenumber').value;
    const experience = document.getElementById('experience').value;
    const role = document.querySelector('input[name="role"]:checked')?.value;
    const country = document.getElementById('countries').value;
    const city = document.getElementById('cities').value;

    // Reset all error messages
    Object.values(errorMessages).forEach(el => el.style.display = 'none');

    // Validation functions
    const showError = (field, message, duration = 20000) => {
        errorMessages[field].textContent = message;
        errorMessages[field].style.display = 'block';
        if (duration) setTimeout(() => errorMessages[field].style.display = 'none', duration);
        isValid = false;
    };

    // Field validations
    if (!title) showError('title', 'Title is required');
    if (!phonenumber) showError('phonenumber', 'Phone number is required');
    if (!experience) showError('experience', 'Experience is required');
    if (!role) showError('role', 'Please select your role');
    if (!country || country === "Select Your Country") showError('countries', 'Please select your country');
    if (!city || city === "Select City") showError('cities', 'Please select your city');
    if (selectedSectors.length === 0) showError('industry', 'Please select at least one sector');
    if (selectedPayments.length === 0) showError('paymentPreference', 'Please select at least one payment preference');
    if (selectedPrimaryFields.length === 0) showError('primary_field', 'Please select at least one primary field');
    if (selectedTechs.length === 0) showError('techStack', 'Please select at least one tech stack');

    function showSuccessMessage(messageText) {
        const container = document.getElementById('messageContainer');

        const alertBox = document.createElement('div');
        alertBox.className = 'alert alert-success alert-dismissible fade show';
        alertBox.setAttribute('role', 'alert');
        alertBox.innerHTML = `
            <strong style="color: green; display:block;">Profile Created Successfully!</strong>
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
        let url = 'YOUR_API_ENDPOINT_HERE'; // Replace with your actual API endpoint
        const token = localStorage.getItem("authToken");
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
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json',
                    'token': token,
                },
                body: JSON.stringify({
                    "title": title,
                    "portfolio": portfolio,
                    "phoneNumber": phonenumber,
                    "experience": experience,
                    "typeOfServiceProvider": role,
                    "country": country,
                    "city": city,
                    "sector": selectedSectors,
                    "paymentPreferences": selectedPayments,
                    "primaryField": selectedPrimaryFields,
                    "keySkills": selectedTechs
                    
                })
            });

            const data = await response.json();
            console.log('Full API response:', data);

            if (response.ok) {
                showSuccessMessage('Profile created successfully!');
                // You can redirect or perform other actions here
            } else {
                console.log('API error:', data.message || 'Unknown error');
                alert('Profile creation failed: ' + (data.message || 'Unknown error'));
            }
            
            document.body.removeChild(loader);
            document.body.classList.remove('loading-active');
        } catch (error) {
            document.body.removeChild(loader);
            document.body.classList.remove('loading-active');
            console.error('Fetch error:', error);
            alert('Something went wrong. Please try again!');
        }
    }
});