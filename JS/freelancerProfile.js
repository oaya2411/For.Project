async function submitData() {
    let url = "https://for-developers.vercel.app/api/v1/ServiceProvider/edit-profile";
    
    // Create an empty object to build the request body
    const requestBody = {};
    
    // Get form values only if they exist and are not empty
    const phone = document.getElementById('phonenumber')?.value.trim();
    if (phone) requestBody.phoneNumber = phone;
    
    const title = document.getElementById('titleInput')?.value.trim();
    if (title) requestBody.title = title;
    
    const country = document.getElementById('countries')?.value;
    if (country && country !== 'firstItem') requestBody.country = country;
    
    const city = document.getElementById('cities')?.value;
    if (city && city !== 'firstItem') requestBody.city = city;
    
    const portfolio = document.getElementById('portfolioInput')?.value.trim();
    if (portfolio) requestBody.portfolio = portfolio;
    
    const experience = document.getElementById('experienceInput')?.value;
    if (experience) requestBody.experience = experience;
    
    const selectedRole = document.querySelector('input[name="role"]:checked')?.value;
    if (selectedRole) requestBody.typeOfServiceProvider = selectedRole;
    
    // Handle dropdown selections
    const techStack = dropdowns.techStack.getSelectedItems();
    if (techStack.length > 0) requestBody.keySkills = techStack;
    
    const payment = dropdowns.payment.getSelectedItems();
    if (payment.length > 0) requestBody.paymentPreference = payment;
    
    const primaryField = dropdowns.primaryField.getSelectedItems();
    if (primaryField.length > 0) requestBody.primaryField = primaryField;
    
    const industry = dropdowns.industry.getSelectedItems();
    if (industry.length > 0) requestBody.industry = industry;
    
    const projectsPrefered = dropdowns.projectsPrefered.getSelectedItems();
    if (projectsPrefered.length > 0) requestBody.typesOfProjectsPreferred = projectsPrefered;
    
    const projectSize = dropdowns.projectSize.getSelectedItems();
    if (projectSize.length > 0) requestBody.projectSizePreferred = projectSize;
  
    // Check if there's actually any data to send
    if (Object.keys(requestBody).length === 0) {
      alert("No changes detected to update");
      return;
    }
  
    // get token and loader
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
        body: JSON.stringify(requestBody)
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