let message = document.getElementById('messageContainer');
const token = localStorage.getItem('authToken');

function getUserID(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Invalid JWT format');
        
        const payload = parts[1];
        const decodedString = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        const decoded = JSON.parse(decodedString); 

        // message.innerHTML = decoded.userId; 
        return decoded.userId;
    } catch (error) {
        console.error('JWT decoding failed:', error);
        return null;
    }
}

const userID = getUserID(token);
let fullName = '';
let email = '';
let role = '';
let phoneNumber = '';
let country = '';
let city = '';
let companyName = '';
let industry = '';  
async function getUserData() {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://for-developers.vercel.app/api/v1/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'token': token,
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        message.innerText = JSON.stringify(data.data, null, 2); // Pretty-printed
      }else{
        throw new Error(`HTTP Error: ${response}`);
      }
    } catch (error) {
      console.error('Error handle data: ', error.message);
      message.innerText = 'fail to get data';
    }
  }
  
getUserData();