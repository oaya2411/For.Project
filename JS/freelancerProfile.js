// let message = document.getElementById('messageContainer');
// const token = localStorage.getItem('authToken');

// const phoneRegex = /^\d{11,14}$/;

// const form = document.getElementById('form');

// async function getDashboardData(){
//   const loader = document.createElement('div');
//   loader.id = 'loader';
//   loader.innerHTML = `
//                       <div class="spinner"></div>
//                       <p class="loading-text">Loading...</p>
//                       `;
//   document.body.appendChild(loader);
//   document.body.classList.add('loading-active');

//   try {
//     const token = localStorage.getItem('authToken');
//     let totalProjects = document.getElementById('totalProjects');
//     let completed = document.getElementById('completed');
//     let inprogress = document.getElementById('inProgress');
//     const response = await fetch(`https://for-developers.vercel.app/api/v1/ServiceProvider/stats`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json', 
//         'token': token,
//       }
//     });
//     console.log('entered')
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
      
//       completed.textContent = data?.data?.stats[0]?.completed ?? 0;
//       inprogress.textContent = data?.data?.stats[0]?.inProgress ?? 0;
//       totalProjects.textContent = data?.data?.stats[0]?.totalProjects ?? 0;
      
//     }else{
//       throw new Error(`HTTP Error: ${response}`);
//     }
//   } catch (error) {
//     console.error('Error handle data: ', error.message);
//     alert('fail to get data, Try to Login Please');
//   }
//    // When loading is complete
//    document.body.removeChild(loader);
//    document.body.classList.remove('loading-active');
// }
// getDashboardData();


// // initialize heaader Dropdown
// function initializeDropdown() {
//     const dropdown = document.querySelector('.dropdown');
//     if (!dropdown) return;

//     const dropdownContent = dropdown.querySelector('.dropdown-content');
//     const profileIcon = dropdown.querySelector('#profileIcon');

//     if (!dropdownContent || !profileIcon) {
//         console.error('Dropdown elements not found');
//         return;
//     }
//     // Don't duplicate logout handler here - it's handled in setupAuthLogic
//     function toggleDropdown(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         dropdownContent.classList.toggle('show');
//     }

//     function closeDropdown(e) {
//         if (!dropdown.contains(e.target)) {
//             dropdownContent.classList.remove('show');
//         }
//     }

//     profileIcon.addEventListener('click', toggleDropdown);
    
//     dropdownContent.addEventListener('click', e => e.stopPropagation());
//     window.addEventListener('click', closeDropdown);
// }

// initializeDropdown();

// // create bubble element to each list item 
// function createBubble(id, text, container) {
//     const span = document.createElement('span');
//     span.className = 'bubble';
//     span.id = id;
//     span.textContent = text;

//     document.getElementById(container).appendChild(span);
// }

// // display it depending on the length of the list
// function displayNumberOfSpan(id, container, arrayOfData){
//     let length = arrayOfData.length
//     for (let i = 0; i < length; i++) {
//         createBubble(id, arrayOfData[i], container);
//     }
// }

// // get User data and display it 
// async function getUserData() {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch(`https://for-developers.vercel.app/api/v1/user/profile`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json', 
//           'token': token,
//         }
//       });
//       let fullName = document.getElementById('fullName');
//       let email = document.getElementById('email');
//       let phoneNumber = document.getElementById('phoneNumber');
//       let country =document.getElementById('Country');
//       let city = document.getElementById('City');
//       let title = document.getElementById('title');
//       let portfolio = document.getElementById('portfolio');
//       let experience = document.getElementById('experience');
//       let role = document.getElementById('role');
//       let primaryField = document.getElementById('primaryField');
//       let industry = document.getElementById('IndusrtyField');
//       if (response.ok) {
//         const data = await response.json();
//         // primaryField
//         console.log(data);
//         fullName.textContent = data.data.user.fullName; 
//         email.textContent = data.data.user.email;
//         phoneNumber.textContent = data.data.userData.phoneNumber; 
//         country.textContent = data.data.userData.country;
//         city.textContent = data.data.userData.city;
//         title.textContent = data.data.userData.title;
//         portfolio.textContent = data.data.userData.portfolio;
//         experience.textContent = data.data.userData.experience;
//         role.textContent = data.data.userData.typeOfServiceProvider;
//         let IndustriesList = (data.data.userData.industry);
//         let primaryFieldList = data.data.userData.primaryField;  
//         let paymentFieldList = data.data.userData.paymentPreference;
//         let keySillsList = data.data.userData.keySkills;
//         let projectSizeList = data.data.userData.projectSizePreferred;
//         let projectsPreferedList = data.data.userData.typesOfProjectsPreferred;
//         displayNumberOfSpan(industry, 'I', IndustriesList);
//         displayNumberOfSpan(primaryField, 'PF', primaryFieldList);
//         displayNumberOfSpan(paymentFieldList, 'PP', paymentFieldList);
//         displayNumberOfSpan(keySillsList, 'KS', keySillsList);
//         displayNumberOfSpan(projectSizeList, 'PSP', projectSizeList);
//         displayNumberOfSpan(projectsPreferedList, 'TOPP', projectsPreferedList);
//       }else{
//         throw new Error(`HTTP Error: ${response}`);
//       }
//     } catch (error) {
//       console.error('Error handle data: ', error.message);
//       alert('fail to get data, Try to Login Please');
//     }
//   }
  
// getUserData();

// // handle displaying Edit section
// const editButton = document.getElementById('edit');
// const infoSection = document.getElementById('secondaryInfo');
// const editSection = document.getElementById('EditSecondaryInfo');
// const cancelButton = document.getElementById('cancel');

// // display edit form when click on edit button
// editButton.addEventListener('click', (e)=>{
//     infoSection.style.display = 'none';
//     editSection.style.display = 'block';
// });

// //display info when click on cancel button
// cancelButton.addEventListener('click', (e)=>{
//     infoSection.style.display = 'block';
//     editSection.style.display = 'none';
// });

// // load countries API
// function loadCountries(){
//     const apiKey = "RVVNT0ZmWDRJVXBKSDJVWnJiWnd6b3NOSVV0NnlhZ0lGS2ZLbEdOcQ==";
        
//             var headers = new Headers();
//             headers.append("X-CSCAPI-KEY", apiKey);
        
//             var requestOptions = {
//                 method: 'GET',
//                 headers: headers,
//                 redirect: 'follow'
//             };
        
//             fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
//                 .then(response => response.json())
//                 .then(countries => {
//                     const countrySelect = document.getElementById("countries");
//                     countries.forEach(country => {
//                         if(country.name !== 'Israel') {
//                             const option = document.createElement("option");
//                             option.value = country.iso2;
//                             option.text = country.name;
//                             countrySelect.appendChild(option);
//                         }
//                     });
//                 });
        
//             document.getElementById("countries").addEventListener("change", function () {
//                 const selectedCountryCode = this.value;
//                 const citySelect = document.getElementById("cities");
        
//                 citySelect.innerHTML = '<option class="firstItem">Select City</option>';
        
//                 fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountryCode}/cities`, requestOptions)
//                     .then(response => response.json())
//                     .then(cities => {
//                         cities.forEach(city => {
//                             const option = document.createElement("option");
//                             option.value = city.name;
//                             option.text = city.name;
//                             citySelect.appendChild(option);
//                         });
//                     });
//             });
// }

// // load all countries
// const SelectCountry = document.getElementById('countries');
// SelectCountry.addEventListener("click", (e)=>{
//     loadCountries();
// })


// // Regex patterns
// const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// // DOM Elements
// const errorMessages = {
//   phone: document.getElementById('phoneError'),
//   title: document.getElementById('titleError'),
//   portfolio: document.getElementById('portfolioError'),
//   experience: document.getElementById('exError'),
//   role: document.getElementById('roleError'),
//   countries: document.getElementById('countriesError'),
//   cities: document.getElementById('citiesError'),
//   techStack: document.getElementById('techStackError'),
//   payment: document.getElementById('paymentError'),
//   primaryField: document.getElementById('primaryFieldError'),
//   industry: document.getElementById('industryError'),
//   projectTypePrefered: document.getElementById('projectsPreferedError'),
//   projectSizePrefered: document.getElementById('projectSizeError'),
  
// };

// // Global variables
// let techStackContainer;

// // Dropdown functionality
// function createTechItem(tech) {
//   const li = document.createElement('li');
//   li.className = 'item';

//   li.innerHTML = `
//     <span class="checkbox">
//       <i class="fa-solid fa-check check-icon"></i>
//     </span>
//     <span class="item-text">${tech.name}</span>
//   `;

//   li.addEventListener("click", () => toggleTechSelection(li, tech.name));
//   return li;
// }

// function toggleTechSelection(li, techName) {
//   li.classList.toggle("checked");
//   const techStack = dropdowns.techStack;
  
//   if (li.classList.contains("checked")) {
//     techStack.getSelectedItems().push(techName);
//   } else {
//     const index = techStack.getSelectedItems().indexOf(techName);
//     if (index > -1) {
//       techStack.getSelectedItems().splice(index, 1);
//     }
//   }
  
//   techStack.updateButtonText();
// }

// // fetch Tech Stack API only once;
// function loadTechStacks() {
//   techStackContainer = document.querySelector("#techStack .list-items"); 
//   fetch('https://api.stackexchange.com/2.3/tags?site=stackoverflow&sort=popular&order=desc&pagesize=100&page=1&key=rl_mg7UQxhsVFGxhq7yU5X1447nL')
//     .then(response => {
//       if (!response.ok) throw new Error('Network response was not ok');
//       return response.json();
//     })
//     .then(data => {
//       techStackContainer.innerHTML = '';
//       data.items.forEach(tag => {
//         const tech = { name: tag.name };
//         const techItem = createTechItem(tech);
//         techStackContainer.appendChild(techItem);
//       });
//     })
//     .catch(error => {
//       console.error('Error fetching tech stacks:', error);
//       techStackContainer.innerHTML = '<li class="error">Failed to load tech stacks. Please try again later.</li>';
//       errorMessages.techStack.textContent = "Failed to load tech stack options";
//       errorMessages.techStack.style.display = 'block';
//     });
// }

// loadTechStacks();

// // handle drop down action
// function setupDropdown(btnSelector, listSelector) {
//   const selectBtn = document.querySelector(btnSelector);
//   const btnText = selectBtn.querySelector(".btn_text");
//   const listItems = document.querySelector(listSelector);
//   let selectedItems = [];

//   function updateButtonText() {
//     if (selectedItems.length > 0) {
//       btnText.innerText = `${selectedItems.length} Selected`;
//     } else {
//       btnText.innerText = btnText.dataset.defaultText || "Select Options";
//     }
//   }

//   if (listItems && !listItems.dataset.initialized) {
//     const items = listItems.querySelectorAll(".item");
//     items.forEach(item => {
//       item.addEventListener("click", () => {
//         item.classList.toggle("checked");
//         const itemText = item.textContent.trim();
        
//         if (item.classList.contains("checked")) {
//           selectedItems.push(itemText);
//         } else {
//           selectedItems = selectedItems.filter(i => i !== itemText);
//         }
        
//         updateButtonText();
//       });
//     });
//     listItems.dataset.initialized = "true";
//   }

//   selectBtn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     document.querySelectorAll(".select_btn").forEach(btn => {
//       if (btn !== selectBtn) btn.classList.remove("open");
//     });
//     selectBtn.classList.toggle("open");
//   });

//   return {
//     getSelectedItems: () => selectedItems,
//     clearSelection: () => {
//       selectedItems = [];
//       if (listItems) {
//         listItems.querySelectorAll(".item").forEach(item => {
//           item.classList.remove("checked");
//         });
//       }
//       updateButtonText();
//     },
//     updateButtonText
//   };
// }

// // Initialize all dropdowns
// const dropdowns = {
//   techStack: setupDropdown("#techStack .select_btn", "#techStack .list-items"),
//   payment: setupDropdown("#Payment .select_btn", "#paymentList"),
//   primaryField: setupDropdown("#primaryField .select_btn", "#primaryFieldList"),
//   industry: setupDropdown("#Industry .select_btn", "#industryList"),
//   projectsPrefered: setupDropdown("#projectsPrefered .select_btn", "#proTypeList"),
//   projectSize: setupDropdown("#projectSizePrefered .select_btn", "#proSizeList")
// };

// // Event listeners
// document.addEventListener("click", () => {
//   document.querySelectorAll(".select_btn").forEach(btn => {
//     btn.classList.remove("open");
//   });
// });

// document.querySelectorAll(".list-items").forEach(list => {
//   list.addEventListener("click", (e) => {
//     e.stopPropagation();
//   });
// });


// // Initialize on DOM load
// document.addEventListener('DOMContentLoaded', function() {
//   // Set default text for dropdown buttons
//   document.querySelectorAll('.btn_text').forEach(btn => {
//     if (!btn.dataset.defaultText) {
//       btn.dataset.defaultText = btn.textContent;
//     }
//   });
// });




// async function validateData(e) {
//   e.preventDefault();
//   let isValid = true;
//   const DEFAULT_SELECT_VALUE = 'firstItem';

//   // Get original values from display
//   const originalPhone = document.getElementById('phoneNumber').textContent.trim();
//   const originalTitle = document.getElementById('title').textContent.trim();
//   const originalPortfolio = document.getElementById('portfolio').textContent.trim();
//   const originalCountry = document.getElementById('Country').textContent.trim();
//   const originalCity = document.getElementById('City').textContent.trim();
//   const originalExperience = document.getElementById('experience').textContent.trim();
//   const originalRole = document.getElementById('role').textContent.trim();
  
//   // Get original dropdown values (these would need to be stored or retrieved differently)
//   // For simplicity, we'll assume they're stored in data attributes or similar
  
//   // Get form values
//   const phone = document.getElementById('phonenumber')?.value.trim();
//   const title = document.getElementById('titleInput')?.value.trim();
//   const portfolio = document.getElementById('portfolioInput')?.value.trim();
//   const country = document.getElementById('countries')?.value;
//   const city = document.getElementById('cities')?.value;
//   const experience = document.getElementById('experienceInput')?.value;
//   const selectedRole = document.querySelector('input[name="role"]:checked')?.value;
  
//   // Get dropdown selections
//   const techStack = dropdowns.techStack.getSelectedItems();
//   const payment = dropdowns.payment.getSelectedItems();
//   const primaryField = dropdowns.primaryField.getSelectedItems();
//   const industry = dropdowns.industry.getSelectedItems();
//   const projectsPrefered = dropdowns.projectsPrefered.getSelectedItems();
//   const projectSize = dropdowns.projectSize.getSelectedItems();

//   // Reset all error messages
//   Object.values(errorMessages).forEach(el => {
//       if (el) el.style.display = 'none';
//   });

//   // Create payload with only changed fields
//   const payload = {};

//   // Validation functions
//   const showError = (field, message, duration = 7000) => {
//       if (errorMessages[field]) {
//           errorMessages[field].textContent = message;
//           errorMessages[field].style.display = 'block';
//           if (duration) setTimeout(() => {
//               if (errorMessages[field]) errorMessages[field].style.display = 'none';
//           }, duration);
//       }
//       isValid = false;
//   };

//   // Phone validation (only if changed)
//   if (phone && phone !== originalPhone) {
//       if (!phoneRegex.test(phone)) {
//           showError('phone', 'Phone number must be 11-14 digits');
//       } else {
//           payload.phoneNumber = phone;
//       }
//   }

//   // Title validation (only if changed)
//   if (title && title !== originalTitle) {
//       if (!title) {
//           showError('title', 'Title is required');
//       } else {
//           payload.title = title;
//       }
//   }

//   // Portfolio validation (only if changed)
//   if (portfolio && portfolio !== originalPortfolio) {
//     console.log('entered')
//       if (!portfolio) {
//         console.log('entered 1')
//           showError('portfolio', 'portfolio is required');
//       } else if (!urlRegex.test(portfolio)) {
//         console.log('entered q');
//         console.log("Does errorMessages.portfolio exist?", !!errorMessages.portfolio);
//         console.log("Error element:", errorMessages.portfolio);
//           showError('portfolio', 'portfolio url is not correct');
//       } else {
//           payload.portfolio = portfolio;
//       }
//   }
//   // console.log(payload);

//   // Country validation (only if changed)
//   if (country && country !== 'firstItem' && country !== originalCountry) {
//       payload.country = country;
//   } else if (!country || country === 'firstItem') {
//       // Only validate if field was touched but not properly selected
//       if (document.getElementById('countries').classList.contains('touched')) {
//           showError('countries', 'Country is required');
//       }
//   }

//   // City validation (only if changed)
//   if (city && city !== 'firstItem' && city !== originalCity) {
//       payload.city = city;
//   } else if (!city || city === 'firstItem') {
//       // Only validate if field was touched but not properly selected
//       if (document.getElementById('cities').classList.contains('touched')) {
//           showError('cities', 'City is required');
//       }
//   }

//   // Experience validation (only if changed)
//   if (experience && experience !== originalExperience) {
//       if (!experience) {
//           showError('experience', 'Experience is required');
//       } else if (isNaN(experience) || experience < 0) {
//           showError('experience', 'Experience must be a positive number');
//       }else if (isNaN(experience) || experience >= 40) {
//         showError('experience', 'Experience is between 0 to 40');
//     } else {
//           payload.experience = parseInt(experience);
//       }
//   }

//   // Role validation (only if changed)
//   if (selectedRole && selectedRole !== originalRole) {
//       payload.typeOfServiceProvider = selectedRole;
//   }

//   // Dropdown validations (only validate if selections were made)
//   if (techStack.length > 0) {
//       payload.keySkills = techStack;
//   }
//   if (payment.length > 0) {
//       payload.paymentPreference = payment;
//   }
//   if (primaryField.length > 0) {
//       payload.primaryField = primaryField;
//   }
//   if (industry.length > 0) {
//       payload.industry = industry;
//   }
//   if (projectsPrefered.length > 0) {
//       payload.typesOfProjectsPreferred = projectsPrefered;
//   }
//   if (projectSize.length > 0) {
//       payload.projectSizePreferred = projectSize;
//   }

//   // Check if any fields were actually changed
//   if (Object.keys(payload).length === 0 && isValid) {
//       alert("No changes were made to update.");
//       infoSection.style.display = 'block';
//       editSection.style.display = 'none';
//       return;
//   }

//   // If validations passed, submit the data
//   if (isValid) {
//       const loader = document.createElement('div');
//       loader.id = 'loader';
//       loader.innerHTML = `
//           <div class="spinner"></div>
//           <p class="loading-text">Loading...</p>
//       `;
//       document.body.appendChild(loader);
//       document.body.classList.add('loading-active');

//       try {
//           const token = localStorage.getItem('authToken');
//           const response = await fetch("https://for-developers.vercel.app/api/v1/ServiceProvider/edit-profile", {
//               method: 'PUT',
//               headers: {  
//                   'Content-Type': 'application/json',
//                   'token': token,
//               },
//               body: JSON.stringify(payload)
//           });

//           const responseData = await response.json();
          
//           if (response.ok) { 
//               alert("Profile updated successfully!");
//               localStorage.setItem('status', true);
//               infoSection.style.display = 'block';
//               editSection.style.display = 'none';
//               setTimeout(() => {
//                   window.location.href = "../landingPage.html";
//               }, 3000);
//           } else {
//               console.error('API error:', responseData.message || 'Unknown error');
//               alert(responseData.message || 'Failed to update profile');
//           }
//       } catch (error) {
//           console.error('Fetch error:', error);
//           alert('Something went wrong. Please try again!');
//       } finally {
//           document.body.removeChild(loader);
//           document.body.classList.remove('loading-active');
//       }
//   }
// }

// // Add event listeners to track touched fields
// document.getElementById('countries').addEventListener('change', function() {
//   this.classList.add('touched');
// });
// document.getElementById('cities').addEventListener('change', function() {
//   this.classList.add('touched');
// });

// const submitButton = document.getElementById('submit');
// submitButton.addEventListener("click", validateData);

// // validate data function
// // async function validateData(e) {
// //     e.preventDefault();
// //     let isValid = true;
// //     const DEFAULT_SELECT_VALUE = 'firstItem';

// //     // Get data values with corrected IDs
// //     const title = document.getElementById('titleInput').value.trim();
// //     const portfolio = document.getElementById('portfolioInput').value.trim();
// //     const phone = document.getElementById('phonenumber').value.trim();
// //     const country = document.getElementById('countries').value;
// //     const city = document.getElementById('cities').value;
// //     const experience = document.getElementById('experienceInput')?.value;
// //     const selectedRole = document.querySelector('input[name="role"]:checked')?.value;
    
// //     // // Get dropdown selections
// //     const techStack = dropdowns.techStack.getSelectedItems();
// //     const payment = dropdowns.payment.getSelectedItems();
// //     const primaryField = dropdowns.primaryField.getSelectedItems();
// //     const industry = dropdowns.industry.getSelectedItems();
// //     const projectsPrefered = dropdowns.projectsPrefered.getSelectedItems();
// //     const projectSize = dropdowns.projectSize.getSelectedItems();

// //     // Reset all error messages
// //     Object.values(errorMessages).forEach(el => {
// //         if (el) el.style.display = 'none';
// //     });
// //     console.log(techStack);
// //     // Validation functions
// //     const showError = (field, message, duration = 5000) => {
// //         if (errorMessages[field]) {
// //             errorMessages[field].textContent = message;
// //             errorMessages[field].style.display = 'block';
// //             if (duration) setTimeout(() => {
// //                 if (errorMessages[field]) errorMessages[field].style.display = 'none';
// //             }, duration);
// //         }
// //         isValid = false;
// //     };

// //       // Required field validation
// //     if (!phone) showError('phone', 'Phone number is required');
// //     else if (!phoneRegex.test(phone)) showError('phone', 'Phone number must be 11-14 digits');

// //     if (!title) showError('title', 'Title is required');
// //     if (!portfolio) showError('portfolio', 'portfolio is required');
// //     else if(!urlRegex.test(portfolio)) showError('portfolio', 'portfolio url is not correct');
    
// //     if (!country || country === 'firstItem') 
// //       showError('countries', 'Country is required');
    
// //     if (!city || city === 'firstItem') 
// //       showError('cities', 'City is required');
    
// //     if (!experience) showError('experience', 'Experience is required');
// //     else if (isNaN(experience) || experience < 0) 
// //       showError('experience', 'Experience must be a positive number');

// //     if (!selectedRole) showError('role', 'Please select your service provider role');
      
// //     // Dropdown validations
// //     if (techStack.length === 0) 
// //       showError('techStack', 'Please select at least one tech stack');
    
// //     if (payment.length === 0) 
// //       showError('payment', 'Please select at least one payment preference');
    
// //     if (primaryField.length === 0) 
// //       showError('primaryField', 'Please select at least one primary field');
    
// //     if (industry.length === 0) 
// //       showError('industry', 'Please select at least one industry');
// //     if (projectsPrefered.length === 0) 
// //       showError('projectTypePrefered', 'Please select at least one choice');
// //     if (projectSize.length === 0) 
// //       showError('projectSizePrefered', 'Please select at least one choice');

// //     // Submit if valid
// //   if (isValid) {
      
// //   let url = "https://for-developers.vercel.app/api/v1/ServiceProvider/edit-profile";
  
  
// //   // get token and loader
// //   const token = localStorage.getItem('authToken');
// //   const loader = document.createElement('div');
// //   console.log("phone", phone);
// //   loader.id = 'loader';
// //   loader.innerHTML = `
// //       <div class="spinner"></div>
// //       <p class="loading-text">Loading...</p>
// //   `;
// //   document.body.appendChild(loader);
// //   document.body.classList.add('loading-active');

// //   try {
// //       const response = await fetch(url, {
// //         method: 'PUT',
// //         headers: {  
// //           'Content-Type': 'application/json',
// //           'token': token,
// //         },
// //         body: JSON.stringify({
// //           phoneNumber: phone,
// //           title: title,
// //           portfolio: portfolio,
// //           country: country,
// //           city: city,
// //           experience: parseInt(experience),
// //           industry: industry,
// //           paymentPreference: payment,
// //           typeOfServiceProvider: document.querySelector('input[name="role"]:checked')?.value || "freelancer",
// //           keySkills: techStack,
// //           primaryField: primaryField,
// //           typesOfProjectsPreferred: projectsPrefered,
// //           projectSizePreferred: projectSize,
// //         })
// //       });
  
// //       const responseData = await response.json();
// //       console.log('Full API response:', responseData); 
      
// //       if (response.ok) { 
// //           alert("Profile updated successfully!");
// //           localStorage.setItem('status', true);
// //           infoSection.style.display = 'block';
// //           editSection.style.display = 'none';
// //           setTimeout(() => {
// //               window.location.href = "../landingPage.html";
// //           }, 3000);

// //       } else {
// //         console.error('API error:', responseData.message || 'Unknown error');
// //         alert(responseData.message || 'Failed to update profile');
// //       }
// //     } catch (error) {
// //       console.error('Fetch error:', error);
// //       alert('Something went wrong. Please try again!');
// //     } finally {
// //       document.body.removeChild(loader);
// //       document.body.classList.remove('loading-active');
// //     }

// // }
// // }

// // const submitButton = document.getElementById('submit');
// // submitButton.addEventListener("click", (e)=>{
// //     if(validateData(e)){
// //         // submitData();
// //         console.log('validateSuccessfully');
// //     }
// // })

let message = document.getElementById('messageContainer');
const token = localStorage.getItem('authToken');
let ServiceProviderData; 
const phoneRegex = /^01[0125]\d{8}$/;
const form = document.getElementById('form');
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
    let totalProjects = document.getElementById('totalProjects');
    let completed = document.getElementById('completed');
    let inprogress = document.getElementById('inProgress');
    const response = await fetch(`https://for-developers.vercel.app/api/v1/ServiceProvider/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'token': token,
      }
    });
    console.log('entered')
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      
      completed.textContent = data?.data?.stats[0]?.completed ?? 0;
      inprogress.textContent = data?.data?.stats[0]?.inProgress ?? 0;
      totalProjects.textContent = data?.data?.stats[0]?.totalProjects ?? 0;
      
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


// initialize heaader Dropdown
function initializeDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (!dropdown) return;

    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const profileIcon = dropdown.querySelector('#profileIcon');

    if (!dropdownContent || !profileIcon) {
        console.error('Dropdown elements not found');
        return;
    }
    // Don't duplicate logout handler here - it's handled in setupAuthLogic
    function toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdownContent.classList.toggle('show');
    }

    function closeDropdown(e) {
        if (!dropdown.contains(e.target)) {
            dropdownContent.classList.remove('show');
        }
    }

    profileIcon.addEventListener('click', toggleDropdown);
    
    dropdownContent.addEventListener('click', e => e.stopPropagation());
    window.addEventListener('click', closeDropdown);
}

initializeDropdown();

// create bubble element to each list item 
function createBubble(id, text, container) {
    const span = document.createElement('span');
    span.className = 'bubble';
    span.id = id;
    span.textContent = text;

    document.getElementById(container).appendChild(span);
}

// display it depending on the length of the list
function displayNumberOfSpan(id, container, arrayOfData){
    let length = arrayOfData.length
    for (let i = 0; i < length; i++) {
        createBubble(id, arrayOfData[i], container);
    }
}

// get User data and display it 
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
      let fullName = document.getElementById('fullName');
      let email = document.getElementById('email');
      let phoneNumber = document.getElementById('phoneNumber');
      let country =document.getElementById('Country');
      let city = document.getElementById('City');
      let title = document.getElementById('title');
      let portfolio = document.getElementById('portfolio');
      let experience = document.getElementById('experience');
      let role = document.getElementById('role');
      let primaryField = document.getElementById('primaryField');
      let industry = document.getElementById('IndusrtyField');
      if (response.ok) {
        const data = await response.json();
        // primaryField
        ServiceProviderData = data.data;
        // console.log(ServiceProviderData.userData?.keySkills);
        
        fullName.textContent = data.data.user.fullName; 
        email.textContent = data.data.user.email;
        phoneNumber.textContent = data.data.userData.phoneNumber; 
        country.textContent = data.data.userData.country;
        city.textContent = data.data.userData.city;
        title.textContent = data.data.userData.title;
        portfolio.textContent = data.data.userData.portfolio;
        experience.textContent = data.data.userData.experience;
        role.textContent = data.data.userData.typeOfServiceProvider;
        let IndustriesList = (data.data.userData.industry);
        let primaryFieldList = data.data.userData.primaryField;  
        let paymentFieldList = data.data.userData.paymentPreference;
        let keySillsList = data.data.userData.keySkills;
        let projectSizeList = data.data.userData.projectSizePreferred;
        let projectsPreferedList = data.data.userData.typesOfProjectsPreferred;
        displayNumberOfSpan(industry, 'I', IndustriesList);
        displayNumberOfSpan(primaryField, 'PF', primaryFieldList);
        displayNumberOfSpan(paymentFieldList, 'PP', paymentFieldList);
        displayNumberOfSpan(keySillsList, 'KS', keySillsList);
        displayNumberOfSpan(projectSizeList, 'PSP', projectSizeList);
        displayNumberOfSpan(projectsPreferedList, 'TOPP', projectsPreferedList);
      }else{
        throw new Error(`HTTP Error: ${response}`);
      }
    } catch (error) {
      console.error('Error handle data: ', error.message);
      alert('fail to get data, Try to Login Please');
    }
  }
  
// get User data and display it
function loadEditData() {

  let phoneNumber = document.getElementById('phonenumber');
  let country = document.getElementById('selectedCountry');
  let city = document.getElementById('selectedCity');
  let title = document.getElementById('titleInput');
  let portfolio = document.getElementById('portfolioInput');
  let experience = document.getElementById('experienceInput');
  let role = document.getElementById('role');
  let primaryField = document.getElementById('primaryField');
  let industry = document.getElementById('IndusrtyField');

  phoneNumber.value = ServiceProviderData.userData.phoneNumber;
  country.textContent = ServiceProviderData.userData.country;
  city.textContent = ServiceProviderData.userData.city;
  title.value = ServiceProviderData.userData.title;
  portfolio.value = ServiceProviderData.userData.portfolio;
  experience.value = ServiceProviderData.userData.experience;
  role.value = ServiceProviderData.userData.typeOfServiceProvider;
}

// handle displaying Edit section
const editButton = document.getElementById('edit');
const infoSection = document.getElementById('secondaryInfo');
const editSection = document.getElementById('EditSecondaryInfo');
const cancelButton = document.getElementById('cancel');

// display edit form when click on edit button
editButton.addEventListener('click', (e)=>{
    infoSection.style.display = 'none';
    editSection.style.display = 'block';
    loadTechStacks();
    loadEditData();
});

//display info when click on cancel button
cancelButton.addEventListener('click', (e)=>{
    infoSection.style.display = 'block';
    editSection.style.display = 'none';
});

// load countries API
function loadCountries(){
    const apiKey = "RVVNT0ZmWDRJVXBKSDJVWnJiWnd6b3NOSVV0NnlhZ0lGS2ZLbEdOcQ==";
        
            var headers = new Headers();
            headers.append("X-CSCAPI-KEY", apiKey);
        
            var requestOptions = {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            };
        
            fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
                .then(response => response.json())
                .then(countries => {
                    const countrySelect = document.getElementById("countries");
                    countries.forEach(country => {
                        if(country.name !== 'Israel') {
                            const option = document.createElement("option");
                            option.value = country.iso2;
                            option.text = country.name;
                            countrySelect.appendChild(option);
                        }
                    });
                });
        
            document.getElementById("countries").addEventListener("change", function () {
                const selectedCountryCode = this.value;
                const citySelect = document.getElementById("cities");
        
                citySelect.innerHTML = '<option class="firstItem">Select City</option>';
        
                fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountryCode}/cities`, requestOptions)
                    .then(response => response.json())
                    .then(cities => {
                        cities.forEach(city => {
                            const option = document.createElement("option");
                            option.value = city.name;
                            option.text = city.name;
                            citySelect.appendChild(option);
                        });
                    });
            });
}



// load all countries
const SelectCountry = document.getElementById('countries');
SelectCountry.addEventListener("click", (e)=>{
    loadCountries();
})


// Regex patterns
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// DOM Elements
const errorMessages = {
  phone: document.getElementById('phoneError'),
  title: document.getElementById('titleError'),
  portfolio: document.getElementById('portfolioError'),
  experience: document.getElementById('exError'),
  role: document.getElementById('roleError'),
  countries: document.getElementById('countriesError'),
  cities: document.getElementById('citiesError'),
  techStack: document.getElementById('techStackError'),
  payment: document.getElementById('paymentError'),
  primaryField: document.getElementById('primaryFieldError'),
  industry: document.getElementById('industryError'),
  projectTypePrefered: document.getElementById('projectsPreferedError'),
  projectSizePrefered: document.getElementById('projectSizeError'),
  
};

// Global variables
let techStackContainer;

// Dropdown functionality
function createTechItem(tech) {
  const li = document.createElement('li');
  li.className = 'item';

  li.className = `item ${ServiceProviderData?.userData?.keySkills.includes(tech.name) ? 'checked' : ''}`;

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
  const techStack = dropdowns.techStack;
  
  if (li.classList.contains("checked")) {
    techStack.getSelectedItems().push(techName);
  } else {
    const index = techStack.getSelectedItems().indexOf(techName);
    if (index > -1) {
      techStack.getSelectedItems().splice(index, 1);
    }
  }
  
  techStack.updateButtonText();
}

// fetch Tech Stack API only once;
function loadTechStacks() {
  techStackContainer = document.querySelector("#techStack .list-items"); 
  fetch('https://api.stackexchange.com/2.3/tags?site=stackoverflow&sort=popular&order=desc&pagesize=100&page=1&key=rl_mg7UQxhsVFGxhq7yU5X1447nL')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      techStackContainer.innerHTML = '';
      data.items.forEach(tag => {
        const tech = { name: tag.name };
        const techItem = createTechItem(tech);
        techStackContainer.appendChild(techItem);
      });
    })
    .catch(error => {
      console.error('Error fetching tech stacks:', error);
      techStackContainer.innerHTML = '<li class="error">Failed to load tech stacks. Please try again later.</li>';
      errorMessages.techStack.textContent = "Failed to load tech stack options";
      errorMessages.techStack.style.display = 'block';
    });
}


// handle drop down action
function setupDropdown(btnSelector, listSelector, keyInDB) {
  const selectBtn = document.querySelector(btnSelector);
  const btnText = selectBtn.querySelector(".btn_text");
  const listItems = document.querySelector(listSelector);
  let selectedItems = ServiceProviderData?.userData?.[keyInDB] || [];
  

  function updateButtonText() {
    if (selectedItems.length > 0) {
      btnText.innerText = `${selectedItems.length} Selected`;
    } else {
      btnText.innerText = btnText.dataset.defaultText || "Select Options";
    }
  }

  if (listItems && !listItems.dataset.initialized) {
    const items = listItems.querySelectorAll(".item");
    for (let item of items) {
      const itemText = item.textContent.trim();
      if (selectedItems.includes(itemText)) {
        item.classList.add("checked");
      }
    }
    items.forEach(item => {
      item.addEventListener("click", () => {
        item.classList.toggle("checked");
        const itemText = item.textContent.trim();
        
        if (item.classList.contains("checked")) {
          selectedItems.push(itemText);
        } else {
          selectedItems = selectedItems.filter(i => i !== itemText);
        }
        
        updateButtonText();
      });
    });
    listItems.dataset.initialized = "true";
  }

  selectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".select_btn").forEach(btn => {
      if (btn !== selectBtn) btn.classList.remove("open");
    });
    selectBtn.classList.toggle("open");
  });

  return {
    getSelectedItems: () => selectedItems,
    clearSelection: () => {
      selectedItems = [];
      if (listItems) {
        listItems.querySelectorAll(".item").forEach(item => {
          item.classList.remove("checked");
        });
      }
      updateButtonText();
    },
    updateButtonText
  };
}

let dropdowns = {};
async function initializeApp() {
  await getUserData();
  dropdowns = {
    techStack: setupDropdown('#techStack .select_btn', '#techStack .list-items', 'keySkills'),
    payment: setupDropdown('#Payment .select_btn', '#paymentList', 'paymentPreference'),
    primaryField: setupDropdown('#primaryField .select_btn', '#primaryFieldList', 'primaryField'),
    industry: setupDropdown('#Industry .select_btn', '#industryList', 'industry'),
    projectsPrefered: setupDropdown('#projectsPrefered .select_btn', '#proTypeList', 'typesOfProjectsPreferred'),
    projectSize: setupDropdown('#projectSizePrefered .select_btn', '#proSizeList', 'projectSizePreferred'),
  };
}
initializeApp();

// Event listeners
document.addEventListener("click", () => {
  document.querySelectorAll(".select_btn").forEach(btn => {
    btn.classList.remove("open");
  });
});

document.querySelectorAll(".list-items").forEach(list => {
  list.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});


// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  // Set default text for dropdown buttons
  document.querySelectorAll('.btn_text').forEach(btn => {
    if (!btn.dataset.defaultText) {
      btn.dataset.defaultText = btn.textContent;
    }
  });
});




async function validateData(e) {
  e.preventDefault();
  let isValid = true;
  const DEFAULT_SELECT_VALUE = 'firstItem';

  // Get original values from display
  const originalPhone = document.getElementById('phoneNumber').textContent.trim();
  const originalTitle = document.getElementById('title').textContent.trim();
  const originalPortfolio = document.getElementById('portfolio').textContent.trim();
  const originalCountry = document.getElementById('Country').textContent.trim();
  const originalCity = document.getElementById('City').textContent.trim();
  const originalExperience = document.getElementById('experience').textContent.trim();
  const originalRole = document.getElementById('role').textContent.trim();
  
  // Get original dropdown values (these would need to be stored or retrieved differently)
  // For simplicity, we'll assume they're stored in data attributes or similar
  
  // Get form values
  const phone = document.getElementById('phonenumber')?.value.trim();
  const title = document.getElementById('titleInput')?.value.trim();
  const portfolio = document.getElementById('portfolioInput')?.value.trim();
  const country = document.getElementById('countries')?.value;
  const city = document.getElementById('cities')?.value;
  const experience = document.getElementById('experienceInput')?.value;
  const selectedRole = document.querySelector('input[name="role"]:checked')?.value;
  
  // Get dropdown selections
  const techStack = dropdowns.techStack.getSelectedItems();
  const payment = dropdowns.payment.getSelectedItems();
  const primaryField = dropdowns.primaryField.getSelectedItems();
  const industry = dropdowns.industry.getSelectedItems();
  const projectsPrefered = dropdowns.projectsPrefered.getSelectedItems();
  const projectSize = dropdowns.projectSize.getSelectedItems();

  // Reset all error messages
  Object.values(errorMessages).forEach(el => {
      if (el) el.style.display = 'none';
  });

  // Create payload with only changed fields
  const payload = {};

  // Validation functions
  const showError = (field, message, duration = 7000) => {
      if (errorMessages[field]) {
          errorMessages[field].textContent = message;
          errorMessages[field].style.display = 'block';
          if (duration) setTimeout(() => {
              if (errorMessages[field]) errorMessages[field].style.display = 'none';
          }, duration);
      }
      isValid = false;
  };

  
  // Phone validation (only if changed)
  if (phone && phone !== originalPhone) {
    
      if (!phoneRegex.test(phone)) {
          showError('phone', 'Phone number must be 11-14 digits');
      } else {
          payload.phoneNumber = phone;
      }
  }

  // Title validation (only if changed)
  if (title && title !== originalTitle) {
      if (!title) {
          showError('title', 'Title is required');
      } else {
          payload.title = title;
      }
  }

  // Portfolio validation (only if changed)
  if (portfolio && portfolio !== originalPortfolio) {
      if (!portfolio) {
          showError('portfolio', 'portfolio is required');
      } else if (!urlRegex.test(portfolio)) {
        console.log("Does errorMessages.portfolio exist?", !!errorMessages.portfolio);
        console.log("Error element:", errorMessages.portfolio);
          showError('portfolio', 'portfolio url is not correct');
      } else {
          payload.portfolio = portfolio;
      }
  }
  // console.log(payload);

  // Country validation (only if changed)
  if (country && country !== 'firstItem' && country !== originalCountry) {
      payload.country = country;
  } else if (!country || country === 'firstItem') {
      // Only validate if field was touched but not properly selected
      if (document.getElementById('countries').classList.contains('touched')) {
          showError('countries', 'Country is required');
      }
  }

  // City validation (only if changed)
  if (city && city !== 'firstItem' && city !== originalCity) {
      payload.city = city;
  } else if (!city || city === 'firstItem') {
      // Only validate if field was touched but not properly selected
      if (document.getElementById('cities').classList.contains('touched')) {
          showError('cities', 'City is required');
      }
  }

  // Experience validation (only if changed)
  if (experience && experience !== originalExperience) {
      if (!experience) {
          showError('experience', 'Experience is required');
      } else if (isNaN(experience) || experience < 0) {
          showError('experience', 'Experience must be a positive number');
      }else if (isNaN(experience) || experience >= 40) {
        showError('experience', 'Experience is between 0 to 40');
    } else {
          payload.experience = parseInt(experience);
      }
  }

  // Role validation (only if changed)
  if (selectedRole && selectedRole !== originalRole) {
      payload.typeOfServiceProvider = selectedRole;
  }

  // Dropdown validations (only validate if selections were made)
  if (techStack.length > 0) {
      payload.keySkills = techStack;
  }
  if (payment.length > 0) {
      payload.paymentPreference = payment;
  }
  if (primaryField.length > 0) {
      payload.primaryField = primaryField;
  }
  if (industry.length > 0) {
      payload.industry = industry;
  }
  if (projectsPrefered.length > 0) {
      payload.typesOfProjectsPreferred = projectsPrefered;
  }
  if (projectSize.length > 0) {
      payload.projectSizePreferred = projectSize;
  }

  // Check if any fields were actually changed
  if (Object.keys(payload).length === 0 && isValid) {
      alert("No changes were made to update.");
      infoSection.style.display = 'block';
      editSection.style.display = 'none';
      return;
  }

  console.log(payload);
  
  // If validations passed, submit the data
  if (isValid) {
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
          const response = await fetch("https://for-developers.vercel.app/api/v1/ServiceProvider/edit-profile", {
              method: 'PUT',
              headers: {  
                  'Content-Type': 'application/json',
                  'token': token,
              },
              body: JSON.stringify(payload)
          });

          const responseData = await response.json();
          
          if (response.ok) { 
              alert("Profile updated successfully!");
              localStorage.setItem('status', true);
              infoSection.style.display = 'block';
              editSection.style.display = 'none';
              setTimeout(() => {
                  window.location.href = "landingPage.html";
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
}

// Add event listeners to track touched fields
document.getElementById('countries').addEventListener('change', function() {
  this.classList.add('touched');
});
document.getElementById('cities').addEventListener('change', function() {
  this.classList.add('touched');
});

const submitButton = document.getElementById('submit');
submitButton.addEventListener("click", validateData);
