const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");
const form = document.getElementById("form");

window.addEventListener("load", ()=>inputs[0].focus());

inputs.forEach((input, indx)=>{
    input.addEventListener("keyup", (e)=>{
        const currentInput = input,
        nextInput = input.nextElementSibling,
        prevInput = input.previousElementSibling;

        if(currentInput.value.length > 1){
            currentInput.value ="";
            return ;
        }

        if(nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== ""){
            nextInput.removeAttribute("disabled");
            nextInput.focus();
        }

        if(e.key === "Backspace"){
            inputs.forEach((input, indx2)=>{
                if(indx <= indx2 && prevInput){
                    input.setAttribute('disabled', true);
                    input.value = "";
                }
            });
            if(prevInput) {
                prevInput.focus();
            }
        }

        // Check if all OTP fields are filled
        const allFilled = Array.from(inputs).every(input => input.value.length === 1);
        button.disabled = !allFilled;
    });
});

form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const otp = Array.from(inputs).map(input => input.value).join('');

    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
                        <div class="spinner"></div>
                        <p class="loading-text">Loading...</p>
                        `;
    document.body.appendChild(loader);

// Add the loader class to body for overlay effect
document.body.classList.add('loading-active');
    // Here you would typically send the OTP to your server for verification
    try{
        const url = 'https://for-developers.vercel.app/api/v1/auth/verifyOTP';
        const response = await fetch(url, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                otp: otp
            })
        })
        const data = await response.json();
            
        if (response.ok) {
            // Successful verification
            alert("OTP verified successfully!");
            // Redirect or perform next action
            window.location.href = "../Authentication/resetPassword.html";
        } else {
            // Handle API errors
            alert('Wrong OTP, try again');
        }

    }catch(e){
        console.log("Error occured", e);
        alert(response.m)
    }
      // When loading is complete
      document.body.removeChild(loader);
      document.body.classList.remove('loading-active');

});
