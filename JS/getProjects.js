
function createProjectCard({
    _id,
    projectType,
    projectName,
    projectDesc,
    minBudget,
    maxBudget,
    status
  }) {
    // // Create main container div
    const mainContainer = document.getElementById('mainContainer');
    
    // Create container div
    const container = document.createElement('div');
    container.className = 'container';
    container.id = _id;
    
    // Create project type div
    const projectTypeDiv = document.createElement('div');
    projectTypeDiv.className = 'projectType';
    projectTypeDiv.textContent = projectType;
    
    // Create project name div
    const projectNameDiv = document.createElement('div');
    projectNameDiv.className = 'projectName';
    projectNameDiv.textContent = projectName;
    
    // Create project description container
    const projectDescContainer = document.createElement('div');
    projectDescContainer.className = 'projectDescContainer';
    
    const descSpan = document.createElement('span');
    descSpan.className = 'decSpan';
    descSpan.textContent = 'description';
    
    const projectDescSpan = document.createElement('span');
    projectDescSpan.className = 'projectDesc';
    projectDescSpan.textContent = projectDesc;
    
    projectDescContainer.appendChild(descSpan);
    projectDescContainer.appendChild(projectDescSpan);
    
    // Create salary container
    const salaryContainer = document.createElement('div');
    salaryContainer.className = 'salaryContainer';
    
    const minBudgetSpan = document.createElement('span');
    minBudgetSpan.className = 'min-budget';
    minBudgetSpan.textContent = `${minBudget}$`;
    
    const maxBudgetSpan = document.createElement('span');
    maxBudgetSpan.className = 'max-budget';
    maxBudgetSpan.textContent = `${maxBudget}$`;
    
    salaryContainer.appendChild(minBudgetSpan);
    salaryContainer.appendChild(maxBudgetSpan);
    
    // Create status container
    const statusContainer = document.createElement('div');
    statusContainer.className = 'statusContainer';
    
    const statusSpan = document.createElement('span');
    statusSpan.className = `status ${status.replace(/\s+/g, '')}`;
    statusSpan.textContent = status;
    
    statusContainer.appendChild(statusSpan);
    
    // Append all elements to container
    container.appendChild(projectTypeDiv);
    container.appendChild(projectNameDiv);
    container.appendChild(projectDescContainer);
    container.appendChild(salaryContainer);
    container.appendChild(statusContainer);
    
    // Append container to main container
    mainContainer.appendChild(container);
    
    return mainContainer;
  }
  
async function getAllProjects(){
    const url = `https://for-developers.vercel.app/api/v1/project`;
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
                        <div class="spinner"></div>
                        <p class="loading-text">Loading...</p>
                        `;
    document.body.appendChild(loader);
    document.body.classList.add('loading-active');
  
    try{
        const token = localStorage.getItem('authToken');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'token': token,
            }
          });
          const data = await response.json();
          const projectsNumber = data.data.projects.length;
          for(let i = 0; i < projectsNumber; i++){
            let _id = data.data.projects[i]._id;
            let name = data.data.projects[i].name;
            let desc = data.data.projects[i].description;
            let projectType = data.data.projects[i].projectType;
            let minBudget = data.data.projects[i].minBudget;
            let maxBudget = data.data.projects[i].maxBudget;
            let status = data.data.projects[i].status;

            if(status === 'Not Started'){
                status = 'notStarted'
            }else if(status === 'completed'){
                status = 'Completed';
            }else{
                status = 'onProgress';
            }

            let cardData = {
                _id: _id,
                projectType: projectType,
                projectName: name,
                projectDesc: desc,
                minBudget: minBudget,
                maxBudget: maxBudget,
                status: status,
              };

            createProjectCard(cardData);
          }
        console.log(data.data.projects.length);
    }catch (error) {
        console.error('Error handle data: ', error.message);
        // alert('fail to get data, Try to Login Please');
      }
       // When loading is complete
       document.body.removeChild(loader);
       document.body.classList.remove('loading-active');
}

getAllProjects();

const mainContainer = document.getElementById('mainContainer');

mainContainer.addEventListener("click", function (e) {
  console.log('enter');
  const clickedCard = e.target.closest(".container");
  if (clickedCard) {
    const cardId = clickedCard.id; 
    console.log(cardId);
    window.location.href = `projectDetails.html?id=${cardId}`;
  }
});

document.getElementById('logo')