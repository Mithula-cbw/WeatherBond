document.addEventListener("DOMContentLoaded", () => {
    initializeUser();

    // setTimeout(()=>{
    //     initializeSearch();
    // },3000);
});

let countryInput, cityInput, countryAutocompleteList, cityAutocompleteList;
let selectedCountryCode = '';

function createElement(tag, className = '', content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content;
    return element;
}

function initializeUser(){
    const content = document.getElementById('content');
    content.innerHTML = ''; 

    const userPanel = document.createElement('div');
    userPanel.className = 'search-panel';

    // User info
    const genderContainer = createElement('div', 'gender-container');

    // Female user 
    const female = createElement('div', 'gender-option female');
    const femaleSvg = createElement('div');
    femaleSvg.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-female" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/>
        </svg>`;
    female.appendChild(femaleSvg);

    // Male user
    const male = createElement('div', 'gender-option male');
    const maleSvg = createElement('div');
    maleSvg.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-male" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/>
        </svg>`;
    male.appendChild(maleSvg);

    genderContainer.appendChild(female);
    genderContainer.appendChild(male);

    // Name input with label
    const nameContainer = createElement('div', 'name-container');
    
    const nameLabel = createElement('label', 'name-label');
    nameLabel.setAttribute('for', 'name-input');
    nameLabel.innerText = 'What should we call you?';

    const nameInput = createElement('input', 'name-input');
    nameInput.type = 'text';
    nameInput.id = 'name-input';
    nameInput.placeholder = 'Enter your name...';

    nameInput.addEventListener('input', (event) => {
        let value = event.target.value;
        if (value) {
            event.target.value = value.charAt(0).toUpperCase() + value.slice(1);
        }
    });

    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameInput);

    // Append gender and name to the panel
    
    userPanel.appendChild(nameContainer);
    userPanel.appendChild(genderContainer);
 
    content.appendChild(userPanel);
    
}


function initializeSearch() {
    document.querySelectorAll('.location').forEach(element => {
        element.style.display = "block";
    });


    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous content

    // Country search panel
    const countryPanel = document.createElement('div');
    countryPanel.className = 'search-panel';

    countryInput = document.createElement('input');
    countryInput.className = 'my-input';
    countryInput.id = 'country-input';
    countryInput.type = 'text';
    countryInput.placeholder = 'Search for a country...';

    countryAutocompleteList = document.createElement('div');
    countryAutocompleteList.id = 'country-autocomplete-list';
    countryAutocompleteList.className = 'autocomplete-items';

    countryPanel.appendChild(countryInput);
    countryPanel.appendChild(countryAutocompleteList);
    content.appendChild(countryPanel);

    // City search panel
    const cityPanel = document.createElement('div');
    cityPanel.className = 'search-panel';
    cityPanel.style.display = 'none'; // Initially hidden

    cityInput = document.createElement('input');
    cityInput.className = 'my-input';
    cityInput.id = 'city-input';
    cityInput.type = 'text';
    cityInput.placeholder = 'Search for a city...';
    cityInput.disabled = true;

    cityAutocompleteList = document.createElement('div');
    cityAutocompleteList.id = 'city-autocomplete-list';
    cityAutocompleteList.className = 'autocomplete-items';

    countryPanel.appendChild(cityInput);
    countryPanel.appendChild(cityAutocompleteList);

    // cityPanel.appendChild(cityInput);
    // cityPanel.appendChild(cityAutocompleteList);
    // content.appendChild(cityPanel);

    // Event listeners
    countryInput.addEventListener('input', async (event) => {
        const query = event.target.value;

        if(countryInput.value === ''){
            cityInput.value = '';
            cityInput.disabled = true;
        }

        if (query.length > 0) { // Start searching after 3 characters
            const countries = await fetchCountries(query); // Fetch countries from API
            showCountryAutocomplete(countries);
        } else {
            countryAutocompleteList.innerHTML = ''; // Clear suggestions if query is too short
        }
    });

    cityInput.addEventListener('input', async (event) => {
        const query = event.target.value;
        if (query.length > 0 && selectedCountryCode) { // Check if country is selected
            const cities = await fetchCities(query, selectedCountryCode); // Fetch cities from API
            showCityAutocomplete(cities);
        } else {
            cityAutocompleteList.innerHTML = ''; // Clear suggestions if query is too short or no country is selected
        }
    });
}

const apiKey = 'f90944973222ee9a70511676c51fdb77'; // Replace with your OpenWeather API key

async function fetchCountries(query) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await response.json();
        const countries = data
            .filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
            .map(country => ({
                name: country.name.common,
                code: country.cca2.toLowerCase()
            }));
        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

async function fetchCities(query, countryCode) {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${apiKey}`);
        const data = await response.json();
        // console.log('API Response:', data); // Log response for debugging
        const cities = data
            .filter(location => location.country.toLowerCase() === countryCode)
            .map(location => ({
                name: location.name,
                country: location.country
            }));
        console.log('Filtered Cities:', cities); // Log filtered cities for debugging
        return cities;
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
}

function showCountryAutocomplete(countries) {
    countryAutocompleteList.innerHTML = ''; // Clear previous suggestions
    const maxResults = 5; // Maximum number of results to show

    // Loop through the countries, but only display up to 10 results
    countries.slice(0, maxResults).forEach(country => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerText = country.name;
        div.addEventListener('click', () => {
            selectedCountryCode = country.code; // Save selected country code
            countryInput.value = country.name;
            countryAutocompleteList.innerHTML = ''; // Clear suggestions
           // document.querySelector('.search-panel:nth-child(2)').style.display = 'block'; // Show city search panel
            cityInput.disabled = false;
            cityInput.focus(); 
            console.log(selectedCountryCode);
            
        });
        countryAutocompleteList.appendChild(div);
    });
}



function showCityAutocomplete(cities) {
    cityAutocompleteList.innerHTML = ''; // Clear previous suggestions
    cities.forEach(city => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerText = `${city.name}, ${city.country}`;
        div.addEventListener('click', () => {
            cityInput.value = `${city.name}, ${city.country}`;
            cityAutocompleteList.innerHTML = ''; 
        });
        cityAutocompleteList.appendChild(div);
    });
}
