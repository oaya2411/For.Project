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
        const url = `https://for-developers.vercel.app/api/v1/dashboard/platform-stats`;

        // projectStats
        let inProgress = document.getElementById('inProgress');
        let notStarted = document.getElementById('notstarted');
        let completed = document.getElementById('completed');
        // client Stats
        let clientsNumber = document.getElementById('clients');
        // serviceProvider Updates
        let softwareHouses = document.getElementById('softwareHouses');
        let freelancers = document.getElementById('Freelancers');
        let available = document.getElementById('Avilable');
        let busy = document.getElementById('Busy');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'token': token,
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        clientsNumber.textContent = data.clients.total;
        softwareHouses.textContent = data.serviceProviders.softwareHouses;
        freelancers.textContent = data.serviceProviders.freelancers;
        available.textContent = data.serviceProviders.available;
        busy.textContent = data.serviceProviders.unavailable;
        notStarted.textContent = data?.projects?.byStatus['Not Started'] ?? 0;
        inProgress.textContent = data?.projects?.byStatus['In Progress'] ?? 0;
        completed.textContent = data?.projects?.byStatus['Completed'] ?? 0;
        
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
  

  document.getElementById('logout')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    document.body.classList.add('loading-active');
    setTimeout(() => window.location.href = 'landingPage.html', 100);
});


  document.getElementById('logout1')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    document.body.classList.add('loading-active');
    setTimeout(() => window.location.href = 'landingPage.html', 100);
});

// Client Section

function createClientCard(clientData) {
    // Create the card HTML
    const cardHTML = `
      <div id="${clientData._id}" class="container-clients">
        <div class="clientName">${clientData.name || ''}</div>
         <span class="companyName"> 
            ${clientData.company || ''} Company
          </span>
        <div class="clientDescContainer">
          <p class="email">${clientData.email || ''}</p>
          <br>
          <p class="phoneNumber">${clientData.phone || ''}</p>
        </div>
        <div class="additionalInfo">
            <p class="industry country">${clientData.industry || ''}</p>

        </div>
        <div class="location">
          <p class="country">${clientData.location}</p>
        </div>
      </div>
    `;
    
    // Convert HTML string to DOM element
    const template = document.createElement('template');
    template.innerHTML = cardHTML.trim();
    const cardElement = template.content.firstChild;
    
    // Find the main container and append the card
    const mainContainer = document.getElementById('mainContainer-clients');
    if (mainContainer) {
      mainContainer.appendChild(cardElement);
    } else {
      console.error('Main container not found');
      // Return the card anyway in case you want to handle it differently
      return cardElement;
    }
    
    // Return the created card element (optional)
    return cardElement;
  }
  
  async function getAllClients(){
    const url = `https://for-developers.vercel.app/api/v1/client/clients`;
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
          const clientsNumber = data.data.clients.length;
          for(let i = 0; i < clientsNumber; i++){
           // Safely extract client data with default values
        let _id = data?.data?.clients[i]?._id ?? 'no-id';
        let companyName = data?.data?.clients[i]?.companyName ?? 'No Company';
        let phone = data?.data?.clients[i]?.phoneNumber ?? 'No Phone';
        let name = data?.data?.clients[i]?.user?.fullName ?? 'No Name';
        let email = data?.data?.clients[i]?.user?.email ?? 'no-email@example.com';
        let industry = data?.data?.clients[i]?.industry ?? 'No Industry';
        let country = data?.data?.clients[i]?.country ?? '';
        let city = data?.data?.clients[i]?.city ?? '';
        let location = (country && city) 
                        ? `${country}, ${city}`
                        : country || city || 'No Location';
            let cardData = {
                _id: _id,
                name: name,
                email: email,
                phone: phone,
                company: companyName,
                industry: industry,
                location: location,
              };

              createClientCard(cardData);
          }
        console.log(data);
    }catch (error) {
        console.error('Error handle data: ', error.message);
        // alert('fail to get data, Try to Login Please');
      }
       // When loading is complete
       document.body.removeChild(loader);
       document.body.classList.remove('loading-active');
}

getAllClients();

// Service Providers Part
function serviceProviderCard(provider) {
    const container = document.getElementById('serviceProvidersSection');
    if (container) {
      container.insertAdjacentHTML('beforeend', `
        <div class="container-serviceProviders">
          <div class="ServiceProvider">${provider.title || 'Service'}</div>
          <div class="serviceProviderName">${provider.name || 'Anonymous'}</div>
          <div class="serviceProviderDescContainer">
            <p class="decSpan">${provider.email || 'no-email'}</p>
            <p class="decSpan">${provider.phone || 'No Phone'}</p>
          </div>
          <div class="additionalInfo">
            <span>${provider.industry || 'General'}</span>
          </div>
          <div class="location">
            <p>${provider.location || 'Remote'}</p>
            <p class="${provider.available ? 'available' : 'busy'}">
              ${provider.available ? 'Available' : 'Busy'}
            </p>
          </div>
        </div>
      `);
    }
  }
async function getServiceProviders(){
    const url = `https://for-developers.vercel.app/api/v1/ServiceProvider/ServiceProviders`;
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
          console.log(data);
          const serviceProvidersNumber = data.data.serviceProviders.length;
          console.log(serviceProvidersNumber);
          for(let i = 0; i < serviceProvidersNumber; i++){
           // Safely extract client data with default values
            let _id = data?.data?.serviceProviders[i]?._id ?? 'no-id';
            let title = data?.data?.serviceProviders[i]?.title ?? 'No Company';
            let phone = data?.data?.serviceProviders[i]?.phoneNumber ?? 'No Phone';
            let name = data?.data?.serviceProviders[i]?.user?.fullName ?? 'No Name';
            let email = data?.data?.serviceProviders[i]?.user?.email ?? 'no-email@example.com';
            let availableOrNot = data?.data?.serviceProviders[i]?.available ?? 'No availabel';
            let industry = data?.data?.serviceProviders[i]?.industry ?? 'No Industry';
            let country = data?.data?.serviceProviders[i]?.country ?? '';
            let city = data?.data?.serviceProviders[i]?.city ?? '';
        let location = (country && city) 
                        ? `${country}, ${city}`
                        : country || city || 'No Location';
            let cardData = {
                _id: _id,
                title: title,
                name: name,
                email: email,
                phone: phone,
                available: availableOrNot,
                industry: industry,
                location: location,
              };

              serviceProviderCard(cardData);
          }
        console.log(data);
    }catch (error) {
        console.error('Error handle data: ', error.message);
        // alert('fail to get data, Try to Login Please');
      }
       // When loading is complete
       document.body.removeChild(loader);
       document.body.classList.remove('loading-active');
}

getServiceProviders();

// document.getElementById("menuToggle").addEventListener("click", (e) => {
//   const elements = {
//       registerButton: document.getElementById('registerButton1'),
//       logInButton: document.getElementById('LogInButton1'),
//       postProject: document.getElementById('postProject1'),
//       projectsLink: document.getElementById('projectsLink1'),
//       profileIcon: document.getElementById('profileIcon1'),
//       createProfile: document.getElementById('createProfile1'),
//       profileLink: document.getElementById('profileLink1'),
//       logoutButton: document.getElementById('logout1') // Make sure this exists
//   };

//   const token = localStorage.getItem('authToken'); 
//   const userData = token ? decodeJWT(token) : null;
//   const status = localStorage.getItem('status');
//   function pathToProfile(role, ButtonClass){
//       ButtonClass.addEventListener("click", (e)=>{
//           if(role === 'client'){
//               window.location.href = 'clientProfile.html';
//           }else{
//               window.location.href = 'freelancerProfile.html';
//           }
//       })
//   }
  
//   if (token && userData) {
//       localStorage.setItem('role', userData.role);
      
//       elements.registerButton.style.display = 'none';
//       elements.registerButton.style.color = 'black';
//       elements.logInButton.style.display = 'none';
//       elements.logInButton.style.color = 'black';
      
//       const isServiceProvider = userData.role === 'ServiceProvider';
//       const profileCompleted = status === 'true' || userData.profileCompleted === true;

//       // Projects link visibility
      
//       if (profileCompleted) {
//           // create
//           elements.createProfile.style.display = 'none';
//           // elements.createProfile.style.color = 'black';
//           // profile
//           elements.profileIcon.style.display = 'flex';
//           elements.profileIcon.style.color = 'black';
//           // elements on it
//           elements.profileLink.style.display = 'flex';
//           elements.profileLink.style.color = 'black';
          
          
//           // Ensure pathToProfile is defined
//           if (typeof pathToProfile === 'function') {
//               pathToProfile(isServiceProvider ? 'freelancer' : 'client', elements.profileLink);
//           }
//           if( isServiceProvider){
//                   // elements on it
//               elements.projectsLink.style.display = 'none';
//               elements.postProject.style.display = 'none';
//           }else{
//               elements.projectsLink.style.display = 'flex';

//               elements.postProject.style.display = 'flex';
//               elements.postProject.style.color = 'black';
//           }
//       } else {
//           // create
//           elements.createProfile.style.display = 'flex';
//           elements.createProfile.style.color = 'black';
//           elements.profileIcon.style.display = 'flex';
//           elements.profileIcon.style.color = 'black';
//           // elements on it
//           elements.profileLink.style.display = 'none';
//           elements.postProject.style.display = 'none';
          
//       }
//   } else {
//       // User is not logged in
//       Object.values(elements).forEach(el => {
//           if (el) el.style.display = 'none';
//       });
//       elements.logInButton.style.display = 'none';
//       elements.registerButton.style.display = 'inline-block';
//       elements.registerButton.style.color = 'black';
//       elements.logInButton.style.display = 'inline-block';
//       elements.logInButton.style.color = 'black';
//   }

//   // Event delegation might be better than adding listeners here
//   if (elements.createProfile && !elements.createProfile.hasListener) {
//       elements.createProfile.addEventListener('click', function(e) {
//           e.preventDefault();
//           document.body.classList.add('loading-active');
//           setTimeout(() => {
//               window.location.href = userData?.role === "client" 
//                   ? 'createClientAccount.html' 
//                   : 'createFreelancerAccount.html';
//           }, 100);
//       });
//       elements.createProfile.hasListener = true;
//   }

//   const logoutButton = document.getElementById('logout1');
//   if (logoutButton && !logoutButton.hasListener) {
//       logoutButton.addEventListener('click', function(e) {
//           e.preventDefault();
//           localStorage.clear();
//           document.body.classList.add('loading-active');
//           setTimeout(() => window.location.href = 'landingPage.html', 100);
//       });
//       logoutButton.hasListener = true;
//   }

//   if (elements.projectsLink && !elements.projectsLink.hasListener) {
//       elements.projectsLink.addEventListener("click", (e) => {
//           window.location.href = 'displayAllProjects.html';
//       });
//       elements.projectsLink.hasListener = true;
//   }
// });