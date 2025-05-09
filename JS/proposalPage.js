const params = new URLSearchParams(window.location.search);
const clientId = params.get("id");
let proposalId;
// variables
const selectBtn = document.querySelector(".select_btn"),
      btnText = document.querySelector(".btn_text"),
      techStackContainer = document.querySelector(".list-items");

let selectedTechs = [];
let techList = []; // This will be populated from project data

function createTechItem(tech) {
    const li = document.createElement('li');
    li.className = 'item';

    // Check if this tech is in the project's techList
    const isSelected = techList.includes(tech.name);
    
    if (isSelected) {
        li.classList.add('checked');
        if (!selectedTechs.includes(tech.name)) {
            selectedTechs.push(tech.name);
        }
    }

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
        if (!selectedTechs.includes(techName)) {
            selectedTechs.push(techName);
        }
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
            techStackContainer.innerHTML = '';
            
            data.items.forEach(tag => {
                const tech = { name: tag.name };
                const techItem = createTechItem(tech);
                techStackContainer.appendChild(techItem);
            });
            
            // Update button text after loading
            updateButtonText();
        })
        .catch(error => {
            console.error('Error fetching tech stacks:', error);
            techStackContainer.innerHTML = '<li class="error">Failed to load tech stacks</li>';
        });
}

// Toggle dropdown
selectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    selectBtn.classList.toggle("open");
    
    // Load tech stacks when dropdown is opened for the first time
    if (selectBtn.classList.contains("open") && techStackContainer.children.length === 0) {
        loadTechStacks();
    }
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
    selectBtn.classList.remove("open");
});

// Prevent dropdown from closing when clicking inside it
techStackContainer.addEventListener("click", (e) => {
    e.stopPropagation();
});

async function getProjectData(cId) {
    try {
        const url = `https://for-developers.vercel.app/api/v1/project/${cId}`;
        const token = localStorage.getItem('authToken');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'token': token,
            }
        });
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('AdditionalInfo').textContent = data.data.project.name;
            let desc = document.getElementById('desc1');
            desc.textContent =  data.data.project.description;
            desc.style.height = 'auto';
            desc.style.height = desc.scrollHeight + 'px';

            let audience = document.getElementById('audience');
            audience.textContent = data.data.project.targetAudience;
            audience.style.height = 'auto';
            audience.style.height = audience.scrollHeight + 'px';

            let problem = document.getElementById('problem1');
            problem.textContent = data.data.project.problemStatement;
            problem.style.height = 'auto';
            problem.style.height = problem.scrollHeight + 'px';
            document.getElementById('ex').value = data.data.project.duration;
            document.getElementById('min-budget').value = data.data.project.minBudget;
            document.getElementById('max-budget').value = data.data.project.maxBudget;
            
            // Set the techList from project data
            techList = data.data.project.techStack || [];
            // Update button text immediately
            selectedTechs = [...techList];
            updateButtonText();
            
            console.log("Tech stack loaded from project:", techList);
        } else {
            console.error('Failed to get project data');
        }
    } catch (e) {
        console.error('Error handling data: ', e.message);
    }
}

async function getProposal(cId) {

    try {
        const url = `https://for-developers.vercel.app/api/v1/proposal/${cId}`;
        const token = localStorage.getItem('authToken');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'token': token,
            }
        });
        const data = await response.json();
        
        const create = document.getElementById('create');
        const update = document.getElementById('update');
        const download = document.getElementById('proposal');
        if (response.ok) {
            create.style.display = 'none';
            update.style.display = 'flex';
            download.style.display = 'flex';

            console.log(data);
            // document.getElementById('AdditionalInfo').textContent = data.data.project.name;
            let desc = document.getElementById('desc1');
            desc.textContent = data.data.proposal.description;
            desc.style.height = 'auto';
            desc.style.height = desc.scrollHeight + 'px';

            let audience = document.getElementById('audience');
            audience.textContent = data.data.proposal.targetAudience;
            audience.style.height = 'auto';
            audience.style.height = audience.scrollHeight + 'px';

            let problem = document.getElementById('problem1');
            problem.textContent = data.data.proposal.problemStatement;
            problem.style.height = 'auto';
            problem.style.height = problem.scrollHeight + 'px';

            document.getElementById('ex').value = data.data.proposal.duration;
            document.getElementById('min-budget').value = data.data.proposal.minBudget;
            document.getElementById('max-budget').value = data.data.proposal.maxBudget;
            techList = data.data.proposal.techStack || [];
            proposalId =  data.data.proposal._id;
            console.log(proposalId);
            // Update button text immediately
            selectedTechs = [...techList];
            updateButtonText();
        } else {
            create.style.display = 'flex';
            update.style.display = 'none';
            await getProjectData(cId);
        }


    } catch (e) {
        console.error('Error handling data: ', e.message);
    }
    
}

// Initialize
getProposal(clientId);


async function updateProposal(proposalId){

    try {
        const proposalData = {
            desc: document.getElementById('desc1')?.textContent || '',
            targetAudience: document.getElementById('audience')?.textContent || '',
            problemStatement: document.getElementById('problem1')?.textContent || '',
            duration: document.getElementById('ex')?.value || '',
            minBudget: document.getElementById('min-budget')?.value || '',
            maxBudget: document.getElementById('max-budget')?.value || '',
            techStack: selectedTechs || []
        };
        console.log(proposalData.techStack);
        // Validate required fields
        if (!proposalData.desc || !proposalData.problemStatement) {
            throw new Error('Description and problem statement are required');
        }

        const url = `https://for-developers.vercel.app/api/v1/proposal/${proposalId}`;
        const token = localStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token missing');
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
                'token': token,
            },
            body: JSON.stringify(proposalData) 
        });
        const data = await response.json();
        console.log('data', data);
        
        // Check if response has content before parsing
        if (response.ok) {
            alert('Proposal created successfully!');
            location.reload();

        }else {
            throw new Error(data.message || 'Failed to create proposal');
        }
    } catch (e) {
        console.error('Error creating proposal:', e);
        alert(`Error: ${e.message}`);
    }
}

document.getElementById('update').addEventListener("click", (e)=>{
    updateProposal(proposalId);
})

async function downloadProposal(proposalId){
    
    try {
        const url = `https://for-developers.vercel.app/api/v1/proposal/${proposalId}/download`;
        const token = localStorage.getItem('authToken');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                'token': token,
            }
        });
        const data = await response.blob();
        console.log(data);
        if (response.ok) {    

            const pdfUrl = URL.createObjectURL(data);
            window.open(pdfUrl, '_blank');
            setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
            alert('Done ^^');
        } else {
            throw new Error(data.message || 'Failed to dowload proposal');
        }
    } catch (e) {
        console.error('Error handling data: ', e.message);
    }
    
}

document.getElementById("proposal").addEventListener("click", (e)=>{
    downloadProposal(proposalId);
})




async function createProposal(cId) {
    try {
        // Get form values - including tech stack
        const proposalData = {
            desc: document.getElementById('desc1')?.textContent || '',
            targetAudience: document.getElementById('audience')?.textContent || '',
            problemStatement: document.getElementById('problem1')?.textContent || '',
            duration: document.getElementById('ex')?.value || '',
            minBudget: document.getElementById('min-budget')?.value || '',
            maxBudget: document.getElementById('max-budget')?.value || '',
            techStack: selectedTechs || []
        };
        console.log(proposalData.techStack);
        // Validate required fields
        if (!proposalData.desc || !proposalData.problemStatement) {
            throw new Error('Description and problem statement are required');
        }

        const url = `https://for-developers.vercel.app/api/v1/project/${cId}/proposal`;
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            throw new Error('Authentication token missing');
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'token': token,
            },
            body: JSON.stringify(proposalData) 
        });
        const data = await response.json();
        console.log('data', data);
        
        // Check if response has content before parsing
        if (response.ok) {
            alert('Proposal created successfully!');
            location.reload();

        }else {
            throw new Error(data.message || 'Failed to create proposal');
        }
    } catch (e) {
        console.error('Error creating proposal:', e);
        alert(`Error: ${e.message}`);
    } 
}

document.getElementById('create').addEventListener("click", (e)=>{
    createProposal(clientId);
})