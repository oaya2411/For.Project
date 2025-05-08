const form = document.getElementById('form');
const errorMessages = {
  name: document.getElementById('nameError'),
  overview: document.getElementById('overviewError'),
  description: document.getElementById('descError'),
  audience: document.getElementById('targetAudienceError'),
  problem: document.getElementById('problemError'),
  detaitls: document.getElementById('detailsError'),
  industry: document.getElementById('industryError'),
  // exp: document.getElementById('experError'),
  proType: document.getElementById('proType'),
  tech: document.getElementById('techStackError'),
};

// AI geenration
async function useAI(fieldID, question) {
  // get the field we want 
  let field = document.getElementById(fieldID);
  let description = field.value.trim();
  // get overview and its elements 
  let overview = document.getElementById('pass').value.trim();
  let errorContainer = document.getElementById('overview');
  let errorMessage = document.getElementById('overviewError');
  
  if (!overview || overview === '') {
    errorMessage.style.display = 'block'; // Show error
    errorMessage.textContent = 'This Field is required to use AI';
    
    // Optional: Add a stronger red background class
    errorContainer.classList.add('strong');
    
    // Hide after 3 seconds
    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorContainer.classList.remove('strong'); // Remove if added
    }, 3000);
    return false;
  }
  
  // AI generation logic here
  const url = `https://freelanz-questions-model.vercel.app/generate`;
  let loader = document.createElement('div');
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
        'Content-Type': 'application/json' ,
      },
      body: JSON.stringify({
          "description": overview,
          "question": question ,
      })
    });
    const data = await response.json();
    console.log('Full API response:', data); 

    if (response.ok) { 
      field.value = data.generated_text;
      field.style.height = 'auto';
      field.style.height = field.scrollHeight + 'px';
      console.log(data.generated_text);
    } else {
      console.log('API error:', data.message || 'Unknown error');
      alert('Ensure that you have completed your profile first please!');
    }
      
  } catch (error) {
    document.body.removeChild(loader);
    console.error('Fetch error:', error);
    alert('Something went wrong. Please try again!');
  }finally {
    // Cleanup: Ensure loader is removed even if success/error
    if (document.body.contains(loader)) {
      document.body.removeChild(loader);
    }
    document.body.classList.remove('loading-active');
  }
  
}

let descAI = document.getElementById('descAI');
descAI.addEventListener("click", (e)=>{
  useAI('desc', 'Give me an detailed description depending on this overview message, please do not ask me for more details give me all the data i may need in about only 3 line or least');
});

let audience = document.getElementById('audienceAI');
audience.addEventListener("click", (e)=>{
  useAI('audience', 'Give me target audience depending on this overview message, please do not ask me for more details give me all the data i may need in about only 2 line at most'); 
});

let problemStatement =document.getElementById('problemAI');
problemStatement.addEventListener("click", (e)=>{
  useAI('problem', 'Give me an detailed problem statement depending on this overview message, please do not ask me for more details give me all the data i may need in about only 3 line or least');
});

const textareas = document.querySelectorAll('textarea');

textareas.forEach(textarea => {
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto'; // ترجع الارتفاع للوضع الطبيعي
    textarea.style.height = textarea.scrollHeight + 'px'; // تعدّله حسب المحتوى
  });
});


// variables
const selectBtn = document.querySelector(".select_btn"),
      btnText = document.querySelector(".btn_text"),
      techStackContainer = document.querySelector(".list-items"); // Fixed selector (was .list_items)

let selectedTechs = [];

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

    if (li.classList.contains("checked")) {
        selectedTechs.push(techName);
    } else {
        selectedTechs = selectedTechs.filter(item => item !== techName);
    }

    updateButtonText();
}

function updateButtonText() {
    if (selectedTechs.length > 0) {
        btnText.innerText = `${selectedTechs.length} Selected`;
    } else {
        btnText.innerText = "Select Language";
    }
}

function loadTechStacks() {
    fetch('https://api.stackexchange.com/2.3/tags?site=stackoverflow&sort=popular&order=desc&pagesize=100&page=1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Clear existing items
            techStackContainer.innerHTML = '';
            
            // Add new items
            data.items.forEach(tag => {
                const tech = { name: tag.name }; // Format to match your createTechItem function
                const techItem = createTechItem(tech);
                techStackContainer.appendChild(techItem);
            });
        })
        .catch(error => {
            console.error('Error fetching tech stacks:', error);
            // Optionally show error message to user
            techStackContainer.innerHTML = '<li class="error">Failed to load tech stacks</li>';
        });


}

// Toggle dropdown
selectBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent immediate closing
    selectBtn.classList.toggle("open");
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
    selectBtn.classList.remove("open");
});

// Prevent dropdown from closing when clicking inside it
techStackContainer.addEventListener("click", (e) => {
    e.stopPropagation();
});

// Load tech stacks when page loads
loadTechStacks();

form.addEventListener("submit", async function(e) {
  e.preventDefault();
  let isValid = true;
  const experienceField = document.getElementById('experience').value;
  // Get form values
  const name = document.getElementById('email').value.trim();
  const overview = document.getElementById('pass').value;
  const description = document.getElementById('desc').value;
  const audience = document.getElementById('audience').value;
  const problem = document.getElementById('problem').value;
  const expected = document.getElementById('ex').value;
  const min = document.getElementById('min-budget').value;
  const max = document.getElementById('max-budget').value;
  const industry = document.getElementById('industry').value;
  const experience = experienceField !== "" ? experienceField : 'Not Selected any one';
  const projectType = document.getElementById('projectType').value;
  const techStacks = document.getElementsByClassName('item checked').value;

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
  if (!name) showError('name', 'name of the project is required');
  // else if (!nameRegex.test(name)) showError('name', 'Name must contain at least 5 letters', 5000);

  if (!overview) showError('overview', 'overview is required');
  // else if (!emailRegex.test(email)) showError('email', 'Email must be like: example@gmail.com', 5000);

  if (!description) showError('description', 'description is required');
  if (!audience) showError('audience', 'Target Audience is required');
  if (!problem) showError('problem', 'Challenge overview is required');
  if (!industry) showError('industry', 'Industry is required');
  if(!min || !max || !expected) showError('detaitls', 'Those 3 fields are required')
  // if (!min) showError('detaitls', 'Min budget is required');
  // if (!max) showError('detaitls', 'max budget is required');
  // if (!expected) showError('detaitls', 'Expected duration is required');
  // if (!experience) showError('audience', 'Audience is required');
  if (!projectType) showError('proType', 'Project Type is required');
  // if (!techStacks) showError('tech', 'TechStacks are required');

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
    let url = 'https://for-developers.vercel.app/api/v1/project';
    const token = localStorage.getItem("authToken");
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
            "name": name,
            "description": description,
            "duration": expected,
            "industry": industry,
            "minBudget": min,
            "maxBudget": max,
            "levelOfExperience": experience , // Optional, but included here
            "projectType": projectType,
            "techStack": selectedTechs,
            "targetAudience":audience,
            "problemStatement": problem,
        })
      });
  
      const data = await response.json();
      console.log('Full API response:', data); 
  
      if (response.ok) { 
          showSuccessMessage('Success process');
          const m = document.createElement('p');
          m.innerHTML = data.data;
          setTimeout(() => {
              window.location.href = "../landingPage.html";
          }, 2000);
      } else {
        console.log('API error:', data.message || 'Unknown error');
        alert('Ensure that you have completed your profile first please!');
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


