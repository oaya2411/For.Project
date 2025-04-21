let mail = document.getElementById('email_1');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const form = document.getElementById('form');

form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    let errorMessage = document.getElementById('errorMessage_1');
    let isValid = true;
    const email = document.getElementById('email_1').value.trim();
    if (!email){
        errorMessage.innerHTML = `This field is required`;
        errorMessage.style.display = "block";
        setTimeout(() => errorMessage.style.display = 'none', 1600);
        isValid = false;

    }else if (!emailRegex.test(email)) {
        errorMessage.innerHTML = `Email must be as example@gmail.com`;
        errorMessage.style.display = "block";
        setTimeout(() => errorMessage.style.display = 'none', 1600);
        isValid = false;
    }

    if(isValid){

   let url = 'https://for-developers.vercel.app/api/v1/auth/sendOtp';
  
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
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          "email": email,
        })
      });
  
      const data = await response.json();
      console.log('Full API response:', data); 
  
      if (response.ok) { 
        alert('OTP Sent Succefully, check your mail please');
        localStorage.setItem("email", email);
        // window.location.href = "landingPage.html";
        window.location.href = "verifyOTP.html";
       }else{
            console.log('API error:', data.message || 'Unknown error');
            alert('Can not found the mail, ensre about it.');
      }
        // When loading is complete
        document.body.removeChild(loader);
        document.body.classList.remove('loading-active');
    } catch (error) {
      document.body.removeChild(loader);
      console.log('Fetch error:', error);
      alert('Something went wrong. Please try again!');
    }
  }

})
