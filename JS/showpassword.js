let eyeicons = document.getElementsByClassName("eyeicon");
let passes = document.getElementsByClassName("pass");

for (let i = 0; i < eyeicons.length; i++) {
  eyeicons[i].onclick = function() {
    if (passes[i].type === 'password') {
      passes[i].type = 'text';
      eyeicons[i].src = 'images/eye.png'
    } else {
      passes[i].type = 'password';
      eyeicons[i].src = 'images/visibility.png'

    }
  }
}


fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(countries => {
                const countrySelect = document.getElementById("countries");
                countries.forEach(country => {
                    const option = document.createElement("option");
                    if (country.name.common === "Israel") {
                      option.value = "Palestien";
                      option.text = "Palestien";
                  } else {
                      option.value = country.name.common;
                      option.text = country.name.common;
                  }
                    countrySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching countries:', error));
