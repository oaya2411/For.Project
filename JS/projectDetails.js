const params = new URLSearchParams(window.location.search);
const cardId = params.get("id");
const role = localStorage.getItem('role');
// console.log(role);

if(role === 'client' ){
    document.getElementById('clientContainer').style.display = 'none';
    document.querySelector('.freelancers').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('proposal').style.display = 'none';
    
}

function createBubble(text, container) {
    // Validate inputs
    if (!text || typeof text !== 'string') {
        console.error('Invalid text provided for bubble');
        return null;
    }

    // Handle both string ID and DOM element
    const targetContainer = typeof container === 'string' 
        ? document.getElementById(container)
        : container;

    if (!targetContainer) {
        console.error('Container not found');
        return null;
    }

    // Create and configure the bubble
    const span = document.createElement('span');
    span.className = 'bubble';
    span.textContent = text.trim(); // Using textContent is generally better than innerText

    // Append to container
    targetContainer.appendChild(span);
    
    return span; // Return the created element in case it's needed
}

function displayNumberOfSpan(container, arrayOfData){
    let length = arrayOfData.length;
    for (let i = 0; i < length; i++) {
        createBubble(arrayOfData[i], container);
    }
}


async function getProjectByID(cardID){
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
                        <div class="spinner"></div>
                        <p class="loading-text">Loading...</p>
                        `;
    document.body.appendChild(loader);
    document.body.classList.add('loading-active');
  
    try {
        const url = `https://for-developers.vercel.app/api/v1/project/${cardID}`;
        const token = localStorage.getItem('authToken');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json', 
            'token': token,
            }
        });
        const data = await response.json();
        let projectName = document.getElementById('name');
        let desc = document.getElementById('desc');
        let problem = document.getElementById('problem');
        let industry = document.getElementById('industry');
        let projectType = document.getElementById('projectType');
        let techStackContainer = document.getElementById('techStack');
        let audience = document.getElementById('targetAudience');
        let budget = document.getElementById('budget');
        let min = document.getElementById('min');
        let max = document.getElementById('max');
        let duration = document.getElementById('duration');
        let experience = document.getElementById('experience');
        let status = document.getElementById('status');
        let length;
        console.log(data);
        if(response.ok){
            projectName.textContent = data.data.project.name ?? ' ';
            desc.textContent = data.data.project.description ?? ' ';
            problem.textContent = data.data.project.problemStatement ?? ' ';
            industry.textContent = data.data.project.industry ?? ' ';
            projectType.textContent = data.data.project.projectType ?? ' ';
            audience.textContent = data.data.project.targetAudience ?? ' ';
            experience.textContent = data.data.project.levelOfExperience ?? ' ';
            status.textContent = data.data.project.status ?? ' ';
            duration.textContent = data.data.project.duration ?? ' ';
            min.textContent = ((data.data.project.minBudget ?? 0) + ' $');
            max.textContent = ((data.data.project.maxBudget ?? 0) +  ' $');
            let techList =  data.data.project.techStack || [];
            console.log(techList);
            if (!techStackContainer) {
                console.error('Tech stack container not found!');
            } else {
                let techList = data.data.project.techStack || []; // Fallback to empty array
                console.log('Tech list:', techList);
                displayNumberOfSpan(techStackContainer, techList);
            }
            console.log(data.data.project.status);
            if(data.data.project.status === 'Completed'){
                document.getElementById('freelancersContainer').style.display = 'none';
                document.getElementById('complete').style.display = 'none';
                document.getElementById('proposal').style.display = 'none';
                document.getElementById('edit').style.display = 'none';
            }else if(data.data.project.status === 'In Progress'){
                document.getElementById('freelancersContainer').style.display = 'none';
                document.getElementById('complete').style.display = 'inline-block';
                document.getElementById('proposal').style.display = 'inline-block';
                document.getElementById('edit').style.display = 'inline-block';
            }else{
                document.getElementById('freelancersContainer').style.display = 'inline-block';
                document.getElementById('complete').style.display = 'inline-block';
                document.getElementById('proposal').style.display = 'inline-block';
                document.getElementById('edit').style.display = 'inline-block';
            }
            // client data
            let cName = document.getElementById('cname');
            let cEmail = document.getElementById('cemail');
            let phoneNumber = document.getElementById('phoneNumber');
            let country =document.getElementById('Country');
            let city = document.getElementById('City');
            let companyName = document.getElementById('companyName');
            cName.textContent = (data.data.project.client.fullName) ?? ' ';
            console.log(data.data.project.client.fullName);
            cEmail.textContent = data.data.project.client.email ?? ' ';
            phoneNumber.textContent = data.data.clientData?.phoneNumber ?? ' '
            country.textContent = data.data.clientData?.country ?? ' ';
            city.textContent = data.data.clientData?.city ?? ' ';
            companyName.textContent = data.data.clientData?.companyName ?? ' ';
        }else{
            throw new Error(`HTTP Error: ${response}`);
          }
    } catch (error) {
        console.error('Error handle data: ', error.message);
        // alert('fail to get data, Try to Login Please');
    }

     // When loading is complete
     document.body.removeChild(loader);
     document.body.classList.remove('loading-active');
        
}

getProjectByID(cardId);
  
  function createFreelancerCard(data) {
    const container = document.querySelector('.freelancersContainer');

    // Create the main card container
    const card = document.createElement('div');
    card.className = 'freelancerCard';
    card.id = data._id;
    // Add type
    const type = document.createElement('div');
    type.id = 'type';
    type.textContent = data.type;
    card.appendChild(type);

    const name = document.createElement('div');
    name.id = 'name_1';
    name.textContent = data.name;
    card.appendChild(name);
    
    // Add title
    const title = document.createElement('div');
    title.id = 'title';
    title.textContent = data.title;
    card.appendChild(title);
    
    // Add phone
    const phone = document.createElement('div');
    phone.id = 'phone';
    phone.textContent = data.phone;
    card.appendChild(phone);
    
   
    

    // Create first data row (industry and experience)
    const dataRow1 = document.createElement('div');
    dataRow1.className = 'dataRow';
    
    // Industry item
    const industryItem = document.createElement('div');
    industryItem.className = 'rowItem';
    
    const industrySubTitle = document.createElement('span');
    industrySubTitle.className = 'subTitle';
    industrySubTitle.textContent = 'industry';
    
    const industryValue = document.createElement('span');
    industryValue.id = 'industry';
    industryValue.textContent = data.industry;
    
    industryItem.appendChild(industrySubTitle);
    industryItem.appendChild(industryValue);
    dataRow1.appendChild(industryItem);
    
    // Experience item
    const expItem = document.createElement('div');
    expItem.className = 'rowItem';
    
    const expSubTitle = document.createElement('span');
    expSubTitle.className = 'subTitle';
    expSubTitle.textContent = 'Exp';
    
    const expValue = document.createElement('span');
    expValue.id = 'experience';
    expValue.textContent = data.experience;
    
    expItem.appendChild(expSubTitle);
    expItem.appendChild(expValue);
    dataRow1.appendChild(expItem);
    
    card.appendChild(dataRow1);
    
    // Create tech stack section
    const techStack = document.createElement('div');
    techStack.className = 'techStack';
    
    // Add tech stack bubbles
    data.techStack.forEach(tech => {
      const bubble = document.createElement('span');
      bubble.className = 'bubble';
      bubble.textContent = tech;
      techStack.appendChild(bubble);
    });
    
    card.appendChild(techStack);
    
    // Create second data row (Assign Project button and matchingTech)
    const dataRow2 = document.createElement('div');
    dataRow2.className = 'dataRow';
    
    // Assign Project button item
    const assignItem = document.createElement('div');
    assignItem.className = 'rowItem';
    
    const assignBtn = document.createElement('span');
    assignBtn.className= 'assignBtn';
    assignBtn.textContent = 'Assign Project';
    
    assignItem.appendChild(assignBtn);
    dataRow2.appendChild(assignItem);
    
    // Matching tech item
    const matchingTechItem = document.createElement('div');
    matchingTechItem.className = 'rowItem';
    
    const matchingTechSubTitle = document.createElement('span');
    matchingTechSubTitle.className = 'subTitle';
    matchingTechSubTitle.textContent = 'matchingTect';
    
    const matchingTechValue = document.createElement('span');
    matchingTechValue.id = 'matchingTech';
    matchingTechValue.textContent = data.matchingTech;
    
    matchingTechItem.appendChild(matchingTechSubTitle);
    matchingTechItem.appendChild(matchingTechValue);
    dataRow2.appendChild(matchingTechItem);
    
    card.appendChild(dataRow2);
    container.appendChild(card);
    return card;
  }
  
  // Get the container where cards should be added
  
  // Create and append the card to the container
//   const card = createFreelancerCard(freelancerData);
//   const card2 = createFreelancerCard(freelancerData);
//   container.appendChild(card);
async function getMatchedFreelancers(projectID){
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
                        <div class="spinner"></div>
                        <p class="loading-text">Loading...</p>
                        `;
    document.body.appendChild(loader);
    document.body.classList.add('loading-active');
    try{
        const url = `https://for-developers.vercel.app/api/v1/project/match-service-provider/${projectID}`;
        const token = localStorage.getItem('authToken');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json', 
            'token': token,
            }
        });
        const data = await response.json();
        if(response.ok){
            let length = data.data.totalMatches;
            for(let i = 0; i< length; i++){
                let type = data.data.matchedServiceProviders[i].typeOfServiceProvider;
                let name = data.data.matchedServiceProviders[i].user.fullName;
                let title =data.data.matchedServiceProviders[i].title;
                let __id =data.data.matchedServiceProviders[i]._id;
                let phone = data.data.matchedServiceProviders[i].phoneNumber;
                let industryList = data.data.matchedServiceProviders[i].industry;
                let exp = data.data.matchedServiceProviders[i].experience;
                let techList = data.data.matchedServiceProviders[i].keySkills;
                let matchingTech = data.data.matchedServiceProviders[i].matchingTech;
                let freelancerData = {
                    type: type,
                    name: name,
                    title: title,
                    phone: phone,
                    industry:industryList,
                    experience: exp,
                    techStack: techList,
                    matchingTech: matchingTech,
                    _id:__id
                  };
                createFreelancerCard(freelancerData);
            }
        }else{
            throw new Error(`HTTP Error: ${response}`);
          }
        } catch (error) {
          console.error('Error handle data: ', error.message);
        }

         // When loading is complete
     document.body.removeChild(loader);
     document.body.classList.remove('loading-active');
}
getMatchedFreelancers(cardId);


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

// Function to load existing project data into edit form fields
function loadEditData() {
    // Get all the data from the display section
    const name = document.getElementById('name').textContent;
    const desc = document.getElementById('desc').innerHTML;
    const problem = document.getElementById('problem').innerHTML;
    const industry = document.getElementById('industry').textContent;
    const projectType = document.getElementById('projectType').textContent;
    const audience = document.getElementById('targetAudience').innerHTML;
    const duration = document.getElementById('duration').textContent;
    const experience = document.getElementById('experience').textContent;
    const minBudget = document.getElementById('min').textContent.replace(' $', '');
    const maxBudget = document.getElementById('max').textContent.replace(' $', '');
    
    // Get all tech stack bubbles
    const techBubbles = document.querySelectorAll('#techStack .bubble');
    const techStack = Array.from(techBubbles).map(bubble => bubble.textContent);
    
    // Reset all error messages
    Object.values(errorMessages).forEach(el => el.style.display = 'none');

    // Validation functions
    const showError = (field, message, duration = 20000) => {
        errorMessages[field].textContent = message;
        errorMessages[field].style.display = 'block';
        if (duration) setTimeout(() => errorMessages[field].style.display = 'none', duration);
        isValid = false;
    };
    // Populate the form fields
    document.getElementById('email').value = name; // Note: This should probably be 'name' not 'email'

    let problem1 = document.getElementById('problem1');
    problem1.value = problem;
    problem1.style.height = 'auto';
    problem1.style.height = problem1.scrollHeight + 'px';
    let aud = document.getElementById('audience1')
    aud.value = audience;
    aud.style.height = 'auto';
    aud.style.height = aud.scrollHeight + 'px';
    document.getElementById('ex').value = duration;
    document.getElementById('min-budget').value = minBudget;
    document.getElementById('max-budget').value = maxBudget;
    
    // Set dropdown values
    document.getElementById('industry1').value = industry;
    document.getElementById('projectType1').value = projectType;
    document.getElementById('experience1').value = experience;
    // Store selected tech stack for later use
    selectedTechs = techStack;
    updateButtonText();
    let desc1 = document.getElementById('desc1');
    desc1.value = desc;
    desc1.style.height = 'auto';
    desc1.style.height = desc1.scrollHeight + 'px';

    
}

// Function to update the tech stack button text
function updateButtonText() {
    const btnText = document.querySelector('.btn_text');
    if (selectedTechs.length > 0) {
        btnText.innerText = `${selectedTechs.length} Selected`;
    } else {
        btnText.innerText = "Select TechStacks you want";
    }
}

// Modify your existing edit button event listener
const editButton = document.getElementById('edit');
const infoSection = document.getElementById('project');
const editSection = document.getElementById('EditSecondaryInfo');
const cancelButton = document.getElementById('cancel');

editButton.addEventListener('click', (e) => {
    infoSection.style.display = 'none';
    editSection.style.display = 'block';
    loadTechStacks();
    loadEditData(); // Call the function to populate form fields
});

cancelButton.addEventListener('click', (e) => {
    infoSection.style.display = 'block';
    editSection.style.display = 'none';
});

// Update the tech stack selection functionality
function createTechItem(tech) {
    const li = document.createElement('li');
    li.className = 'item';

    // Check if this tech is already selected
    const isChecked = selectedTechs.includes(tech.name);

    li.innerHTML = `
        <span class="checkbox">
            <i class="fa-solid fa-check check-icon"></i>
        </span>
        <span class="item-text">${tech.name}</span>
    `;

    if (isChecked) {
        li.classList.add('checked');
    }

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
const errorMessages = {
    email: document.getElementById('nameError'),
    desc1: document.getElementById('descError'),
    audience: document.getElementById('targetAudienceError'),
    problem1: document.getElementById('problemError'),
    industry: document.getElementById('industryError'),
    experience: document.getElementById('experError'),
    projectType: document.getElementById('proType'),
    duration: document.getElementById('detailsError'),
    minBudget: document.getElementById('detailsError'),
    maxBudget: document.getElementById('detailsError'),
    techStack: document.getElementById('techStackError')
};

const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', async function (e) {
    e.preventDefault();
    let isValid = true;
    
  
    // Reset all error messages
    Object.values(errorMessages).forEach(el => el.style.display = 'none');

    const showError = (field, message, duration = 20000) => {
        errorMessages[field].textContent = message;
        errorMessages[field].style.display = 'block';
        if (duration) setTimeout(() => errorMessages[field].style.display = 'none', duration);
        isValid = false;
    };
    selectedTechs = [...new Set(selectedTechs)];
    console.log(selectedTechs);
    // Get form values
    const formData = {
        name: document.getElementById('email').value.trim(),
        description: document.getElementById('desc1').value.trim(),
        targetAudience: document.getElementById('audience1').value.trim(),
        problemStatement: document.getElementById('problem1').value.trim(),
        industry: document.getElementById('industry1').value.trim(),
        levelOfExperience: document.getElementById('experience1').value.trim(),
        projectType: document.getElementById('projectType1').value.trim(),
        duration: document.getElementById('ex').value.trim(),
        minBudget: document.getElementById('min-budget').value.trim(),
        maxBudget: document.getElementById('max-budget').value.trim(),
        techStack: selectedTechs
    };
    // Validation checks for each field
    if (!formData.name) {
        showError('email', 'Project name is required');
    } else if (formData.name.length < 3) {
        showError('email', 'Project name must be at least 3 characters');
    }

    if (!formData.description) {
        showError('desc1', 'Description is required');
    } else if (formData.description.length < 20) {
        showError('desc1', 'Description should be at least 20 characters');
    }

    if (!formData.targetAudience) {
        showError('audience', 'Target audience is required');
    } else if (formData.targetAudience.length < 5) {
        showError('audience', 'Please provide more details about your target audience');
    }

    if (!formData.problemStatement) {
        showError('problem1', 'Problem statement is required');
    } else if (formData.problemStatement.length < 20) {
        showError('problem1', 'Please provide a more detailed problem statement');
    }

    if (!formData.industry) {
        showError('industry', 'Industry is required');
    }

    if (!formData.levelOfExperience) {
        showError('experience', 'Experience level is required');
    }

    if (!formData.projectType) {
        showError('projectType', 'Project type is required');
    }

    if (!formData.duration) {
        showError('duration', 'Project duration is required');
    } else if (!/^\d+$/.test(formData.duration)) {
        showError('duration', 'Duration must be a number');
    }

    if (!formData.minBudget) {
        showError('minBudget', 'Minimum budget is required');
    } else if (!/^\d+$/.test(formData.minBudget)) {
        showError('minBudget', 'Minimum budget must be a number');
    }

    if (!formData.maxBudget) {
        showError('maxBudget', 'Maximum budget is required');
    } else if (!/^\d+$/.test(formData.maxBudget)) {
        showError('maxBudget', 'Maximum budget must be a number');
    }

    if (formData.minBudget && formData.maxBudget && parseInt(formData.minBudget) > parseInt(formData.maxBudget)) {
        showError('minBudget', 'Minimum budget cannot be greater than maximum budget');
        showError('maxBudget', 'Maximum budget cannot be less than minimum budget');
    }

    if (!formData.techStack || formData.techStack.length === 0) {
        showError('techStack', 'Please select at least one technology');
    }

    function scrollToFirstError() {
        // Get all error elements that are visible
        const visibleErrors = Array.from(document.querySelectorAll('.errormessage'))
            .filter(el => el.style.display === 'block' || getComputedStyle(el).display !== 'none');
        
        if (visibleErrors.length > 0) {
            const firstError = visibleErrors[0];
            
            // Scroll to the error with some padding
            firstError.scrollIntoView({
                behavior: 'smooth',
                block: 'center' // Centers the element in the view
            });
            
            // Try to focus the associated input
            const inputId = firstError.id.replace('Error', ''); // Adjust based on your ID pattern
            const inputField = document.getElementById(inputId);
            if (inputField) {
                inputField.focus();
            }
        }
    }

    if (!isValid) {
        scrollToFirstError();
        return;
    };

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
        const response = await fetch(`https://for-developers.vercel.app/api/v1/project/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update project');
        }

        // Success handling - refresh the displayed data
        // getProjectByID(cardId);
        // Switch back to view mode
        location.reload();
        infoSection.style.display = 'block';
        editSection.style.display = 'none';

    } catch (error) {
        console.error('Submission error:', error);
        alert(`Update failed: ${error.message}`);
    }
     // When loading is complete
     document.body.removeChild(loader);
     document.body.classList.remove('loading-active');
       
});


async function assignProject(cardID, freelancerID){
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`https://for-developers.vercel.app/api/v1/project/assign-service-provider/${cardID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify({
                 "serviceProviderId": freelancerID,
                },)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update project');
        }else{
            alert('Assigned Successfully');
        }

    } catch (error) {
        console.error('Submission error:', error);
        alert(`Update failed: ${error.message}`);
    }

}

  document.addEventListener("click", function (e) {
    const assignBtn = e.target.closest(".assignBtn");
    
    if (assignBtn) {
        const card = assignBtn.closest(".freelancerCard");
        if (card) {
            const freelancerID = card.id;
            const assignBtnID = assignBtn.id; 
            
            if(freelancerID){
                const specificAssignBtn = document.getElementById(assignBtnID);
                
                assignBtn.disabled = true;
                assignBtn.textContent  = 'Assigning...';
                
                assignProject(cardId, freelancerID)
                    .then(() => {
                        assignBtn.textContent = 'Assigned!';
                        assignBtn.style.color = 'black';
                        assignBtn.style.backgroundColor = 'white';
                        assignBtn.style.border = '1px solid lightgreen';
                    })
                    .catch(error => {
                        assignBtn.disabled = false;
                        assignBtn.textContent = 'Assign Project';
                    });
            }else{
                alert('This freelancer can not be assigned');
            }
        }
    }
});



const proposal = document.getElementById('proposal');

proposal.addEventListener("click", function (e) {
    window.location.href = `createProposal.html?id=${cardId}`;
});


async function completeProject(){
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
        const response = await fetch(`https://for-developers.vercel.app/api/v1/project/${cardId}/complete`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            // body: JSON.stringify({
            //      "serviceProviderId": freelancerID,
            //     },)
        });

        const data = await response.json();
        let assignBtn = document.getElementById('complete');
        assignBtn.disabled = true;
        assignBtn.textContent  = 'Marked! ...';
        
        if (!response.ok) {
            assignBtn.disabled = false;
            throw new Error(data.message || 'Something Went Wrong');
        }else{
            assignBtn.textContent = 'Completed !';
            assignBtn.style.color = 'black';
            assignBtn.style.backgroundColor = 'white';
            assignBtn.style.border = '1px solid lightgreen';
        }

    } catch (error) {
        console.error('Submission error:', error);
        alert(`Update failed: ${error.message}`);
    }
     // When loading is complete
     document.body.removeChild(loader);
     document.body.classList.remove('loading-active');
}



const complete = document.getElementById('complete');

complete.addEventListener("click", function (e) {
    completeProject();
})

