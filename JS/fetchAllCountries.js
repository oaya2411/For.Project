
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
